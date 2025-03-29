import '@testing-library/jest-dom';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RecipesList from './RecipesList';
import { http, HttpResponse } from 'msw';
import { server } from '../../mocks/server';
import { Provider } from 'react-redux';
import { store } from '../../app/store/store';
import { paths } from '../../routes/paths';
import { useInitApi } from '../../api/api';
import userEvent from '@testing-library/user-event';

interface Recipe {
  id: number;
  name: string;
  image: string;
  cuisine: string;
}

interface RecipesResponse {
  skip: number;
  limit: number;
  total: number;
  recipes: Recipe[];
}

type TagsResponse = string[];
describe('RecipesList (Integration Test)', () => {
  beforeEach(() => {
    server.use(
      http.get('*/recipes', () => {
        return HttpResponse.json<RecipesResponse>({
          skip: 0,
          limit: 10,
          total: 2,
          recipes: [
            {
              id: 1,
              name: 'Recipe 1',
              image: 'image1.jpg',
              cuisine: 'Cuisine 1',
            },
            {
              id: 2,
              name: 'Recipe 2',
              image: 'image2.jpg',
              cuisine: 'Cuisine 2',
            },
          ],
        });
      }),
      http.get('*/recipes/tags', () => {
        return HttpResponse.json<TagsResponse>(['Tag1', 'Tag2']);
      }),
      http.get('*/recipes/tag/:tag', (req) => {
        const { tag } = req.params;
        if (tag === 'Tag1') {
          return HttpResponse.json<RecipesResponse>({
            skip: 0,
            limit: 10,
            total: 1,
            recipes: [
              {
                id: 1,
                name: 'Recipe 1',
                image: 'image1.jpg',
                cuisine: 'Cuisine 1',
              },
            ],
          });
        }
        return HttpResponse.json<RecipesResponse>({
          skip: 0,
          limit: 10,
          total: 0,
          recipes: [],
        });
      }),
    );
  });

  const Sut = () => {
    useInitApi(paths.apiBaseUrl);
    return (
      <Provider store={store}>
        <BrowserRouter>
          <RecipesList />
        </BrowserRouter>
      </Provider>
    );
  };

  it('renders the list of recipes from the server', async () => {
    render(<Sut />);

    // Wait for recipes to load
    await waitFor(() =>
      expect(screen.getByText('Recipe 1')).toBeInTheDocument(),
    );
    expect(screen.getByText('Recipe 2')).toBeInTheDocument();
  });

  it('filters recipes based on search input', async () => {
    render(<Sut />);

    // Wait for recipes to load
    await waitFor(() =>
      expect(screen.getByText('Recipe 1')).toBeInTheDocument(),
    );

    // Search for a recipe
    const searchInput = screen.getByPlaceholderText(/wyszukaj przepis/i);
    await act(() => {
      userEvent.type(searchInput, 'Recipe 1');
    });

    // Verify filtered results
    await waitFor(() => {
      expect(screen.getAllByText('Recipe 1')).toBeTruthy();
      expect(screen.queryByText('Recipe 2')).not.toBeInTheDocument();
    });
  });

  it('renders no recipes message when no recipes match', async () => {
    render(<Sut />);

    // Wait for recipes to load
    await waitFor(() =>
      expect(screen.getByText('Recipe 1')).toBeInTheDocument(),
    );

    // Search for a non-existent recipe
    const searchInput = screen.getByPlaceholderText(/wyszukaj przepis/i);
    fireEvent.change(searchInput, { target: { value: 'Non-existent Recipe' } });

    // Verify no recipes message
    expect(
      screen.getByText(/brak przepisów spełniających kryteria wyszukiwania/i),
    ).toBeInTheDocument();
  });

  it('filters recipes based on selected tag', async () => {
    render(<Sut />);

    // Wait for recipes to load
    await waitFor(() =>
      expect(screen.getByText('Recipe 1')).toBeInTheDocument(),
    );

    // Select a tag
    const tagDropdown = screen.getByLabelText(/tagi/i);
    fireEvent.change(tagDropdown, { target: { value: 'Tag1' } });

    // Verify filtered results
    await waitFor(() =>
      expect(screen.getByText('Recipe 1')).toBeInTheDocument(),
    );
    expect(screen.queryByText('Recipe 2')).not.toBeInTheDocument();
  });
});

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { HomePage } from './HomePage';

vi.mock('../routes/paths', () => ({
  PRODUCTS_PATH: '/products',
  RECIPES_PATH: '/recipes',
}));

describe('HomePage', () => {
  it('renders the heading, paragraph, and links', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>,
    );

    // Check heading
    expect(
      screen.getByRole('heading', {
        name: /witamy w naszej aplikacji produktów i przepisów/i,
      }),
    ).toBeInTheDocument();

    // Check paragraph
    expect(
      screen.getByText(
        /zapraszamy do odkrywania szerokiej gamy produktów oraz inspirujących/i,
      ),
    ).toBeInTheDocument();

    // Check links
    const productsLink = screen.getByRole('link', {
      name: /przeglądaj produkty/i,
    });
    const recipesLink = screen.getByRole('link', {
      name: /przeglądaj przepisy/i,
    });

    expect(productsLink).toBeInTheDocument();
    expect(productsLink).toHaveAttribute('href', '/products');

    expect(recipesLink).toBeInTheDocument();
    expect(recipesLink).toHaveAttribute('href', '/recipes');
  });

  it('matches the snapshot', () => {
    const { container } = render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});

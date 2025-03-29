import { BrowserRouter as Router, Link } from 'react-router-dom';

import AppRoutes from './AppRoutes';
import { useInitApi } from './api/api';
import GlobalSearch from './components/GlobalSearch';
import { useGetRecipesQuery } from './api/recipesApi/recipes.api';
import { useMemo } from 'react';
import { paths } from './routes/paths';
import { useProductsList } from './hooks/useProductsList';

const App = () => {
  useInitApi(paths.apiBaseUrl);
  const { filteredProducts } = useProductsList();
  const { data: recipes } = useGetRecipesQuery(
    {},
    { refetchOnMountOrArgChange: false },
  );
  return (
    <Router>
      <div className="mx-auto p-4">
        <nav className="flex justify-center space-x-4 mb-6">
          <Link to={paths.home} className="text-blue-500 hover:underline">
            Strona główna
          </Link>
          <Link to={paths.products} className="text-blue-500 hover:underline">
            Produkty
          </Link>
          <Link to={paths.recipes} className="text-blue-500 hover:underline">
            Przepisy
          </Link>
        </nav>
        <div className="p-4 w-[500px] mx-auto">
          <GlobalSearch
            placeholder="Przeszukaj wszystkie zasoby..."
            suggestions={useMemo(
              () => [
                ...filteredProducts.map((product) => ({
                  label: product.title,
                  path: paths.productDetails(product.id),
                })),
                ...(recipes?.recipes
                  ? recipes.recipes.map((recipe) => ({
                      label: recipe.name,
                      path: paths.recipeDetails(recipe.id),
                    }))
                  : []),
              ],
              [filteredProducts, recipes],
            )}
          />
        </div>
        <AppRoutes />
      </div>
    </Router>
  );
};

export default App;

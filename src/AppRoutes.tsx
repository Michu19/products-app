import { Routes, Route } from 'react-router-dom';
import {
  PRODUCTS_PATH,
  RECIPES_PATH,
  RECIPE_DETAIL_PATH,
  PRODUCT_DETAIL_PATH,
  HOME_PATH,
} from './routes/paths';
import ProductsList from './pages/Products/ProductList';
import RecipeList from './pages/Recipes/RecipesList';
import RecipeDetail from './pages/Recipes/RecipeDetails';
import ProductDetail from './pages/Products/ProductDetail';
import { HomePage } from './pages/HomePage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={HOME_PATH} element={<HomePage />} />
      <Route path={PRODUCTS_PATH} element={<ProductsList />} />
      <Route path={RECIPES_PATH} element={<RecipeList />} />
      <Route path={RECIPE_DETAIL_PATH} element={<RecipeDetail />} />
      <Route path={PRODUCT_DETAIL_PATH} element={<ProductDetail />} />
    </Routes>
  );
};

export default AppRoutes;

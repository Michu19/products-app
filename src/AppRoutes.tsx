import { Routes, Route, Link } from "react-router-dom";
import ProductsList from "./pages/Products/ProductList";
import RecipeList from "./pages/Recipes/RecipesList";
import RecipeDetail from "./pages/Recipes/RecipeDetails";
import ProductDetail from "./pages/Products/ProductDetail";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/products" element={<ProductsList />} />
      <Route path="/recipes" element={<RecipeList />} />
      <Route path="/recipes/:id" element={<RecipeDetail />} />
      <Route path="/products/:id" element={<ProductDetail/>} />
      <Route path="/" element={<div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Witamy w naszych kolekcjach produktów i przepisów</h1>
          <p className="text-lg mb-4">Odkryj różnorodność produktów i pysznych przepisów!</p>
          <div className="flex justify-center space-x-6">
            <Link to="/products" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">Przeglądaj produkty</Link>
            <Link to="/recipes" className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600">Przeglądaj przepisy</Link>
          </div>
        </div>} />
    </Routes>
  );
};

export default AppRoutes;

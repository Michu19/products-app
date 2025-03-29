import ProductsList from "../Products/ProductList";
import RecipeList from "../Recipes/RecipesList";

const HomePage = () => {

  return (
    <div className="max-w-4xl mx-auto p-4">
      <ProductsList />
      <RecipeList />
    </div>
  );
};

export default HomePage;
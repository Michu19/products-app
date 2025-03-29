import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components/Loader";
import { Recipe } from "../../api/Recipes.types";


const RecipeList = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    fetch("https://dummyjson.com/recipes")
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data.recipes);
        setFilteredRecipes(data.recipes);
        setLoading(false);
      });
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilteredRecipes(
      recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };
  const navigate = useNavigate();
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lista przepisów</h1>
      <input
        type="text"
        placeholder="Wyszukaj przepis..."
        onChange={handleSearchChange}
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredRecipes.map((recipe) => (
          <motion.div
            key={recipe.id}
            whileHover={{ scale: 1.05 }}
            className="shadow-md rounded-lg overflow-hidden bg-white p-4 border border-gray-200 cursor-pointer"
            onClick={() => navigate(`/recipes/${recipe.id}`)}
          >
            <img
              src={recipe.image}
              alt={recipe.name}
              className="w-full h-40 object-cover rounded-lg"
            />
            <h2 className="text-lg font-semibold mt-2">{recipe.name}</h2>
            <p className="text-gray-600">{recipe.cuisine}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import { Recipe } from '../../api/recipesApi/Recipes.types';

const RecipeDetail = () => {
  const params = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://dummyjson.com/recipes/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setRecipe(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching recipe:', error);
        setLoading(false);
      });
  }, [params.id]);

  if (loading) {
    return <Loader />;
  }

  if (!recipe) {
    return <div>Przepis nie został znaleziony.</div>;
  }

  return (
    <div className="max-w-4xl h-full p-4 flex flex-col">
      <Link
        to="/recipes"
        className="bg-blue-500 w-24 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
      >
        Powrót
      </Link>
      <h1 className="text-2xl font-bold mb-4">{recipe.name}</h1>
      <img
        src={recipe.image}
        alt={recipe.name}
        className="w-full h-64 object-contain rounded-lg mb-4"
      />
      <p className="text-lg mb-2">
        <strong>Kuchnia:</strong> {recipe.cuisine}
      </p>
      <p className="text-lg mb-2">
        <strong>Trudność:</strong> {recipe.difficulty}
      </p>
      <p className="text-lg mb-2">
        <strong>Czas przygotowania:</strong> {recipe.prepTimeMinutes} minut
      </p>
      <p className="text-lg mb-2">
        <strong>Czas gotowania:</strong> {recipe.cookTimeMinutes} minut
      </p>
      <p className="text-lg mb-2">
        <strong>Porcje:</strong> {recipe.servings}
      </p>
      <p className="text-lg mb-2">
        <strong>Kalorie na porcję:</strong> {recipe.caloriesPerServing}
      </p>
      <div>
        <strong>Składniki:</strong>
        <ul className="list-disc pl-6">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <strong>Instrukcje:</strong>
        <ol className="list-decimal pl-6">
          {recipe.instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
      </div>
      <div className="mt-4">
        <strong>Tagi:</strong>
        <p>{recipe.tags.join(', ')}</p>
      </div>
      <div className="mt-4">
        <strong>Typ posiłku:</strong>
        <p>{recipe.mealType.join(', ')}</p>
      </div>
    </div>
  );
};

export default RecipeDetail;

import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import ComboBox from '../../components/Combobox';
import Dropdown from '../../components/Dropdown';
import {
  useGetRecipesByTagQuery,
  useGetAllRecipeTagsQuery,
  useGetRecipesQuery,
} from '../../api/recipesApi/recipes.api';
import { useState } from 'react';
import { Recipe } from '../../api/recipesApi/Recipes.types';

const RecipesList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('name-asc');
  const [tagFilter, setTagFilter] = useState('');
  const navigate = useNavigate();

  const { data: tags, isLoading: isTagsLoading } = useGetAllRecipeTagsQuery({});
  const { data: recipes } = useGetRecipesQuery({
    order: sortOption.split('-')[1] as 'asc' | 'desc',
    sortBy: sortOption.split('-')[0],
  });
  const { data: recipesByTag, isLoading: isRecipesLoading } =
    useGetRecipesByTagQuery(
      {
        tag: tagFilter,
      },
      { skip: !tagFilter },
    );
  const filteredRecipes = tagFilter
    ? Array.isArray(recipesByTag?.recipes)
      ? recipesByTag.recipes
      : []
    : Array.isArray(recipes?.recipes)
      ? recipes.recipes.filter((recipe: Recipe) =>
          recipe.name.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      : [];

  return (
    <div className="mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lista przepisów</h1>
      <div className="mb-4 flex flex-col sm:flex-row md:items-center gap-4">
        <ComboBox
          id="search"
          label="Wyszukaj"
          placeholder="Wyszukaj przepis..."
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchTerm(e.target.value)
          }
          suggestions={
            filteredRecipes?.map((recipe: Recipe) => recipe.name) ?? []
          }
          onSelect={(value: string) => setSearchTerm(value)}
        />
        <Dropdown
          id="sort"
          label="Sortowanie"
          value={sortOption}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setSortOption(e.target.value)
          }
          options={[
            { value: 'name-asc', label: 'Nazwa: A-Z' },
            { value: 'name-desc', label: 'Nazwa: Z-A' },
            { value: 'rating-desc', label: 'Ocena: malejąco' },
            { value: 'rating-asc', label: 'Ocena: rosnąco' },
          ]}
        />
        <Dropdown
          id="tags"
          label="Tagi"
          value={tagFilter}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setTagFilter(e.target.value);
          }}
          options={[
            { value: '', label: 'Wszystkie tagi' },
            ...(tags ?? []).map((tag: string) => ({ value: tag, label: tag })),
          ]}
        />
      </div>
      {isRecipesLoading || isTagsLoading ? (
        <Loader />
      ) : filteredRecipes?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredRecipes?.map((recipe: Recipe) => (
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
      ) : (
        <p className="text-center text-gray-500">
          Brak przepisów spełniających kryteria wyszukiwania.
        </p>
      )}
    </div>
  );
};

export default RecipesList;

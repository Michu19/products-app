import { api } from '../api';
import { PaginatedRecipesResponse, Recipe } from './Recipes.types';

export const recipesApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getRecipes: build.query<
      PaginatedRecipesResponse<Recipe>,
      { sortBy?: string; order?: 'asc' | 'desc'; skip?: number; limit?: number }
    >({
      query: ({ sortBy, order, skip = 0, limit = 0 }) => {
        const params = new URLSearchParams();
        if (sortBy) params.append('sortBy', sortBy);
        if (order) params.append('order', order);
        if (skip !== undefined) params.append('skip', skip.toString());
        if (limit !== undefined) params.append('limit', limit.toString());
        return { url: `recipes?${params.toString()}` };
      },
    }),
    getRecipeById: build.query<Recipe, number>({
      query: (id) => ({ url: `recipes/${id}` }),
    }),
    getAllRecipeTags: build.query<string[], { skip?: number; limit?: number }>({
      query: ({ skip = 0, limit = 0 } = {}) => {
        const params = new URLSearchParams();
        if (skip !== undefined) params.append('skip', skip.toString());
        if (limit !== undefined) params.append('limit', limit.toString());
        return { url: `recipes/tags?${params.toString()}` };
      },
    }),
    getRecipesByTag: build.query<
      PaginatedRecipesResponse<Recipe>,
      { tag: string }
    >({
      query: ({ tag }) => {
        const params = new URLSearchParams();
        params.append('tag', tag);
        return { url: `recipes/tag/${tag}` };
      },
    }),
  }),
});

export const {
  useGetRecipesQuery,
  useGetRecipeByIdQuery,
  useGetAllRecipeTagsQuery,
  useGetRecipesByTagQuery,
} = recipesApi;

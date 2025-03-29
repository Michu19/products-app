export const PRODUCTS_PATH = '/products';
export const RECIPES_PATH = '/recipes';
export const RECIPE_DETAIL_PATH = '/recipes/:id';
export const PRODUCT_DETAIL_PATH = '/products/:id';
export const HOME_PATH = '/';

export const paths = {
  home: HOME_PATH,
  products: PRODUCTS_PATH,
  productDetails: (id: number | string) => `/products/${id}`,
  recipes: RECIPES_PATH,
  recipeDetails: (id: number | string) => `/recipes/${id}`,
  apiBaseUrl: 'https://dummyjson.com/',
};

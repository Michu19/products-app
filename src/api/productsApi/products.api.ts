import { api } from '../api';
import {
  Category,
  GetProductsByCategoryQuery,
  GetProductsQuery,
  PaginatedResponse,
  Product,
} from './Products.types';

export const productsApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getProducts: build.query<
      PaginatedResponse<Product>,
      Partial<GetProductsQuery>
    >({
      query: (arg = {}) => {
        const { limit = 0, skip = 0, sortBy, order } = arg;
        return {
          url: `products?limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}`,
        };
      },
    }),
    getAllProductsCategories: build.query<Category[], string>({
      query: () => ({ url: 'products/categories' }),
    }),
    getProductsByCategory: build.query<
      PaginatedResponse<Product>,
      Partial<GetProductsByCategoryQuery>
    >({
      query: (data) => {
        const { limit = 0, skip = 0, category, sortBy, order } = data;
        return {
          url: `products/category/${category}?limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}`,
        };
      },
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetAllProductsCategoriesQuery,
  useGetProductsByCategoryQuery,
} = productsApi;

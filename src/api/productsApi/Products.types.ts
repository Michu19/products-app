export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  thumbnail: string;
}
export type PaginatedResponse<T> = {
  limit: number;
  skip: number;
  total: number;
  products: T[];
};

export type GetProductsQuery = {
  limit: number;
  skip: number;
  sortBy: string;
  order: 'asc' | 'desc';
};

export type GetProductsByCategoryQuery = GetProductsQuery & {
  category: string;
};

export type Category = {
  name: string;
  slug: string;
  url: string;
};

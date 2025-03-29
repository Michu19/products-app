import { useMemo, useState } from 'react';
import {
  useGetProductsByCategoryQuery,
  useGetProductsQuery,
} from '../api/productsApi/products.api';

export const useProductLogic = (
  selectedCategory: string,
  itemsPerPage: number,
  sortOption: string,
  searchTerm: string,
) => {
  const [currentPage, setCurrentPage] = useState(1);
  const skip = (currentPage - 1) * itemsPerPage;
  const splitSortOption = sortOption.split('-');

  const { data: products, isLoading } = useGetProductsByCategoryQuery(
    {
      category: selectedCategory || '',
      skip,
      limit: itemsPerPage,
      sortBy: splitSortOption[0],
      order: splitSortOption[1] as 'asc' | 'desc',
    },
    {
      refetchOnMountOrArgChange: false,
      skip: !selectedCategory,
    },
  );

  const { data: allProducts } = useGetProductsQuery(
    {
      skip: searchTerm ? 0 : skip,
      limit: searchTerm ? 0 : itemsPerPage,
      sortBy: splitSortOption[0],
      order: splitSortOption[1] as 'asc' | 'desc',
    },
    {
      skip: !!selectedCategory && !searchTerm,
      refetchOnMountOrArgChange: false,
    },
  );

  const filteredProducts = useMemo(() => {
    const currentProducts = searchTerm
      ? allProducts?.products
      : selectedCategory
        ? products?.products
        : allProducts?.products;

    if (!currentProducts) return [];
    return currentProducts.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [products, allProducts, selectedCategory, searchTerm]);

  const totalPages = Math.ceil(
    (searchTerm
      ? (filteredProducts.length ?? 0) / itemsPerPage
      : selectedCategory
        ? (products?.total ?? 0)
        : (allProducts?.total ?? 0)) / itemsPerPage,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
    products: filteredProducts,
    isLoading,
    currentPage,
    totalPages,
    handlePageChange,
  };
};

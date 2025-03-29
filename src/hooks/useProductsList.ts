import { useState } from 'react';
import useCategoryLogic from './useCategoryLogic';
import { useProductLogic } from './useProductLogic';

export const useProductsList = () => {
  const { categories, selectedCategory, handleCategoryChange } =
    useCategoryLogic();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('price-asc');
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const {
    products: filteredProducts,
    isLoading,
    currentPage,
    totalPages,
    handlePageChange,
  } = useProductLogic(selectedCategory, itemsPerPage, sortOption, searchTerm);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (option: string) => {
    setSortOption(option);
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
  };

  return {
    categories,
    filteredProducts,
    isLoading,
    currentPage,
    totalPages,
    searchTerm,
    selectedCategory,
    sortOption,
    itemsPerPage,
    handleSearchChange,
    handleCategoryChange,
    handlePageChange,
    handleSortChange,
    handleItemsPerPageChange,
  };
};

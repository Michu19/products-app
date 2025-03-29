import { useState } from 'react';
import { useGetAllProductsCategoriesQuery } from '../api/productsApi/products.api';

const useCategoryLogic = () => {
  const { data: categories } = useGetAllProductsCategoriesQuery('', {
    refetchOnMountOrArgChange: false,
  });
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return {
    categories,
    selectedCategory,
    handleCategoryChange,
  };
};

export default useCategoryLogic;

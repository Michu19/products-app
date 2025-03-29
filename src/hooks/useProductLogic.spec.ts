import { renderHook } from '@testing-library/react';
import { vi } from 'vitest';
import { useProductLogic } from './useProductLogic';

vi.mock('../api/productsApi/products.api', () => {
  return {
    useGetProductsByCategoryQuery: vi.fn().mockReturnValue({
      data: { products: Array(20).fill({ title: 'Product' }), total: 20 },
      isLoading: false,
    }),
    useGetProductsQuery: vi.fn().mockReturnValue({
      data: { products: Array(50).fill({ title: 'Product' }), total: 50 },
    }),
  };
});

describe('useProductLogic', () => {
  test('should calculate total pages correctly', () => {
    const selectedCategory = 'electronics';
    const itemsPerPage = 10;
    const sortOption = 'name-asc';
    const searchTerm = '';

    const { result } = renderHook(() =>
      useProductLogic(selectedCategory, itemsPerPage, sortOption, searchTerm),
    );

    // Assertions
    expect(result.current.products.length).toBe(20);
    expect(result.current.totalPages).toBe(2);
  });
});

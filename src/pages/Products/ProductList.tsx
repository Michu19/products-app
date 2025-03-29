import { motion } from 'framer-motion';
import { Loader } from '../../components/Loader';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../components/Pagination/Pagination';
import ComboBox from '../../components/Combobox';
import Dropdown from '../../components/Dropdown';
import { useProductsList } from '../../hooks/useProductsList';

const ProductsList = () => {
  const {
    categories,
    filteredProducts,
    isLoading,
    currentPage,
    totalPages,
    searchTerm,
    selectedCategory,
    handleSearchChange,
    handleCategoryChange,
    handlePageChange,
    sortOption,
    handleSortChange,
    itemsPerPage,
    handleItemsPerPageChange,
  } = useProductsList();

  const navigate = useNavigate();

  return (
    <div className="mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lista produktów</h1>
      <div className="mb-4 flex flex-col sm:flex-row md:items-center gap-4 flex-wrap">
        <ComboBox
          id="search"
          label="Wyszukaj"
          placeholder="Wyszukaj produkt..."
          value={searchTerm}
          onChange={handleSearchChange}
          suggestions={filteredProducts.map((product) => product.title)}
          onSelect={(value) =>
            handleSearchChange({
              target: { value },
            } as React.ChangeEvent<HTMLInputElement>)
          }
        />
        <Dropdown
          id="category"
          label="Kategoria"
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
          options={[
            { value: '', label: 'Wszystkie' },
            ...(categories || []).map((category) => ({
              value: category.slug,
              label: category.name,
            })),
          ]}
        />
        <Dropdown
          id="sort"
          label="Sortowanie"
          value={sortOption}
          onChange={(e) => handleSortChange(e.target.value)}
          options={[
            { value: 'price-asc', label: 'Cena: rosnąco' },
            { value: 'price-desc', label: 'Cena: malejąco' },
            { value: 'title-asc', label: 'Nazwa: A-Z' },
            { value: 'title-desc', label: 'Nazwa: Z-A' },
          ]}
        />
        <Dropdown
          id="itemsPerPage"
          label="Ilość elementów na stronę"
          value={itemsPerPage}
          onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
          options={[
            { value: 10, label: '10' },
            { value: 20, label: '20' },
            { value: 50, label: '50' },
            { value: 100, label: '100' },
          ]}
        />
      </div>
      {isLoading ? (
        <div className="min-h-[552px] items-center flex justify-center">
          <Loader />
        </div>
      ) : filteredProducts?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 min-h-[552px]">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.05 }}
              className="shadow-md rounded-lg overflow-hidden h-[268px] bg-white p-4 border border-gray-200 cursor-pointer"
              onClick={() => navigate(`/products/${product.id}`)}
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-40 object-contain rounded-lg"
              />
              <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
              <p className="text-gray-600">${product.price}</p>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 col-span-full">
          Brak produktów spełniających kryteria wyszukiwania.
        </p>
      )}
      {totalPages > 0 && (
        <Pagination
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          totalPages={totalPages}
        />
      )}
    </div>
  );
};

export default ProductsList;

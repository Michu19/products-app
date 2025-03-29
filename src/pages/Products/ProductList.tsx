import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader } from "../../components/Loader";
import { Product } from "../../api/Products.types";
import { useNavigate } from "react-router-dom";

const ProductsList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setFilteredProducts(data.products);
        setLoading(false);
      });
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilteredProducts(
      products.filter((product) =>
        product.title.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lista produktów</h1>
      <input
        type="text"
        placeholder="Wyszukaj produkt..."
        onChange={handleSearchChange}
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredProducts.map((product) => (
          <motion.div
            key={product.id}
            whileHover={{ scale: 1.05 }}
            className="shadow-md rounded-lg overflow-hidden bg-white p-4 border border-gray-200 cursor-pointer"
            onClick={() => navigate(`/products/${product.id}`)}
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-40 object-cover rounded-lg"
            />
            <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
            <p className="text-gray-600">${product.price}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
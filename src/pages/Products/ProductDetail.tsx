import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Loader } from '../../components/Loader';

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  images: string[];
  thumbnail: string;
}

const ProductDetail = () => {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
        setLoading(false);
      });
  }, [params.id]);

  if (loading) {
    return <Loader />;
  }

  if (!product) {
    return <div>Produkt nie został znaleziony.</div>;
  }

  return (
    <div className="max-w-4xl h-full p-4 flex flex-col">
      <Link
        to="/products"
        className="bg-blue-500 w-24 text-white px-6 py-3 rounded-lg hover:bg-blue-600 mb-4"
      >
        Powrót
      </Link>
      <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-64 object-contain rounded-lg mb-4"
      />
      <p className="text-lg mb-2">
        <strong>Kategoria:</strong> {product.category}
      </p>
      <p className="text-lg mb-2">
        <strong>Marka:</strong> {product.brand}
      </p>
      <p className="text-lg mb-2">
        <strong>Cena:</strong> ${product.price}
      </p>
      <p className="text-lg mb-2">
        <strong>Rabat:</strong> {product.discountPercentage}%
      </p>
      <p className="text-lg mb-2">
        <strong>Ocena:</strong> {product.rating} / 5
      </p>
      <p className="text-lg mb-2">
        <strong>Stan magazynowy:</strong> {product.stock} sztuk
      </p>
      <p className="text-lg mb-2">
        <strong>Dostępność:</strong> {product.availabilityStatus}
      </p>
      <div>
        <strong>Opis:</strong>
        <p>{product.description}</p>
      </div>
      <div className="mt-4">
        <strong>Tagi:</strong>
        <p>{product.tags.join(', ')}</p>
      </div>
      <div className="mt-4">
        <strong>Informacje o gwarancji:</strong>
        <p>{product.warrantyInformation}</p>
      </div>
      <div className="mt-4">
        <strong>Informacje o wysyłce:</strong>
        <p>{product.shippingInformation}</p>
      </div>
      <div className="mt-4">
        <strong>Opinie:</strong>
        <ul className="list-disc pl-6">
          {product.reviews.map((review, index) => (
            <li key={index}>
              <strong>{review.reviewerName}</strong> ({review.rating} gwiazdek):{' '}
              {review.comment}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductDetail;

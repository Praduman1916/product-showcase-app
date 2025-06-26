import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../api/productApi';
import { toast, ToastContainer } from 'react-toastify';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const [hasCartItems, setHasCartItems] = useState(false);

  useEffect(() => {
    setLoading(true);
    getProductById(id).then((data) => {
      setProduct(data);
      setLoading(false);
    });
  }, [id]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    setHasCartItems(cart.length > 0);
  }, []);

  const handleAddToCart = () => {
    setAddingToCart(true);

    setTimeout(() => {
      const stored = localStorage.getItem('cartItems');
      const cart = stored ? JSON.parse(stored) : [];

      const index = cart.findIndex((item) => item.id === product.id);
      if (index >= 0) {
        cart[index].quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }

      localStorage.setItem('cartItems', JSON.stringify(cart));
      setHasCartItems(true);
      toast.success('Product added to cart!', {
        position: 'top-right',
        autoClose: 2000,
      });

      setAddingToCart(false);
    }, 700);
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="h-[400px] bg-gray-200 animate-pulse rounded"></div>
        <div className="space-y-4">
          <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
          <div className="h-24 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-40 bg-gray-300 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return <p className="text-center mt-10 text-red-500">Product not found.</p>;
  }

  return (
    <>
      <ToastContainer />
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow-md rounded-xl">
        {/* Image */}
        <div className="flex items-center justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-[400px] w-auto object-contain"
          />
        </div>

        {/* Info */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-gray-800">{product.title}</h1>
          <p className="text-xl font-semibold text-blue-600">
            ${product.price.toFixed(2)}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 text-yellow-500 text-sm">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < Math.round(product.rating?.rate)
                    ? 'fill-yellow-400'
                    : 'fill-gray-300'
                  }`}
                viewBox="0 0 24 24"
              >
                <path d="M12 .587l3.668 7.431 8.332 1.735-6 5.848 1.335 8.148L12 20.125 4.665 24 6 15.601 0 9.753l8.332-1.735z" />
              </svg>
            ))}
            <span className="text-gray-500 ml-1">
              ({product.rating?.count || 0} reviews)
            </span>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-1">Description</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleAddToCart}
              disabled={addingToCart}
              className={`px-5 py-2 rounded-md text-sm font-medium transition ${addingToCart
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
            >
              {addingToCart ? (
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4" />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                  Adding...
                </span>
              ) : (
                'Add to Cart'
              )}
            </button>

            {hasCartItems && (
              <a
                href="/cart"
                className="px-4 py-2 text-sm rounded-md bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 transition font-medium"
              >
                View Cart
              </a>
            )}
          </div>

          <div className="pt-6 border-t">
            <h3 className="text-md font-semibold text-gray-700 mb-3">Customer Reviews</h3>
            <ul className="space-y-3 text-sm text-gray-700">
              {Array.from({ length: Math.min(product.rating?.count || 0, 3) }).map((_, idx) => (
                <li key={idx} className="bg-gray-100 p-3 rounded-md">
                  <p className="mb-1">⭐️⭐️⭐️⭐️☆</p>
                  <p>“This product is amazing! Highly recommend.”</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;

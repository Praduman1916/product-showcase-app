import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const fullStars = Math.floor(product.rating?.rate || 0);
  const hasHalfStar = product.rating?.rate % 1 >= 0.5;
  const totalStars = 5;

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow hover:shadow-md transition duration-300 p-3 hover:scale-[1.02]">
      <Link to={`/product/${product.id}`} className="block space-y-3">
        <div className="w-full h-48 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full object-contain rounded"
          />
        </div>

        <div>
          <h2
            className="text-sm font-semibold text-gray-800 min-h-[3rem]"
            title={product.title}
          >
            {product.title.length > 70 ? product.title.slice(0, 70) + '...' : product.title}
          </h2>

          <p className="mt-1 text-lg font-bold text-blue-600">
            ${product.price.toFixed(2)}
          </p>

          <div className="flex items-center gap-1 mt-1">
            {[...Array(totalStars)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < fullStars
                    ? 'text-yellow-400'
                    : hasHalfStar && i === fullStars
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.179c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 00-.364 1.118l1.286 3.974c.3.921-.755 1.688-1.538 1.118l-3.388-2.46a1 1 0 00-1.176 0l-3.388 2.46c-.783.57-1.838-.197-1.538-1.118l1.286-3.974a1 1 0 00-.364-1.118L2.046 9.401c-.783-.57-.38-1.81.588-1.81h4.179a1 1 0 00.95-.69l1.286-3.974z" />
              </svg>
            ))}
            <span className="text-sm text-gray-400 ml-1">({product.rating?.count || 0})</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;

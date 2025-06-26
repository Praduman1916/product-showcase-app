import React from 'react';

const FilterSidebar = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  minPrice,
  maxPrice,
  setPriceRange,
}) => {
  const [localMax, setLocalMax] = React.useState(maxPrice);

  const handlePriceChange = (e) => {
    const value = Number(e.target.value);
    setLocalMax(value);
    setPriceRange([minPrice, value]);
  };

  return (
    <aside className="bg-white shadow-md rounded-xl p-5 w-full md:w-64 mb-6 md:mb-0">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Filters</h2>

      <div className="mb-6">
        <label htmlFor="category" className="block text-sm font-medium text-gray-600 mb-1">
          Category
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All</option>
          {categories.map((category) => (
            <option value={category} key={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="priceRange" className="block text-sm font-medium text-gray-600 mb-1">
          Price Range
        </label>
        <input
          type="range"
          id="priceRange"
          min={minPrice}
          max={maxPrice}
          value={localMax}
          onChange={handlePriceChange}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>${minPrice}</span>
          <span>${localMax}</span>
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;

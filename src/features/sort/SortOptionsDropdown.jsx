import React from 'react';

const SortOptionsDropdown = ({ sortOption, setSortOption }) => {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort" className="text-sm font-medium text-gray-600">
        Sort By:
      </label>
      <select
        id="sort"
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        className="border border-gray-300 text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Default</option>
        <option value="price-asc">Price: Low → High</option>
        <option value="price-desc">Price: High → Low</option>
        <option value="name-asc">Name: A → Z</option>
        <option value="name-desc">Name: Z → A</option>
        <option value="popularity">Popularity</option>
      </select>
    </div>
  );
};

export default SortOptionsDropdown;

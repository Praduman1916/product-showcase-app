import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../api/productApi';
import ProductCard from '../components/product/ProductCard';
import FilterSidebar from '../features/filter/FilterSidebar';
import SortOptionsDropdown from '../features/sort/SortOptionsDropdown';
import Pagination from '../components/common/Pagination';

const PRODUCTS_PER_PAGE = 10;

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortOption, setSortOption] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getAllProducts().then((data) => {
      setProducts(data);
      setFiltered(data);
      setCategories([...new Set(data.map((p) => p.category))]);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    let result = [...products];

    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    if (sortOption === 'price-asc') result.sort((a, b) => a.price - b.price);
    if (sortOption === 'price-desc') result.sort((a, b) => b.price - a.price);
    if (sortOption === 'name-asc') result.sort((a, b) => a.title.localeCompare(b.title));
    if (sortOption === 'name-desc') result.sort((a, b) => b.title.localeCompare(a.title));

    setCurrentPage(1);
    setFiltered(result);
  }, [selectedCategory, priceRange, sortOption, products]);

  const indexOfLast = currentPage * PRODUCTS_PER_PAGE;
  const indexOfFirst = indexOfLast - PRODUCTS_PER_PAGE;
  const currentItems = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / PRODUCTS_PER_PAGE);

  return (
    <section className="md:flex gap-6 px-4 py-6 md:px-8 lg:px-12">
      <FilterSidebar
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        minPrice={0}
        maxPrice={1000}
        setPriceRange={setPriceRange}
      />

      <div className="flex-1">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-gray-800">All Products</h1>
          <SortOptionsDropdown sortOption={sortOption} setSortOption={setSortOption} />
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: PRODUCTS_PER_PAGE }).map((_, i) => (
              <div key={i} className="p-4 border rounded shadow-sm animate-pulse bg-white">
                <div className="h-40 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : currentItems.length === 0 ? (
          <div className="text-center text-gray-400 mt-20">No products found.</div>
        ) : (
          <>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {currentItems.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
    </section>
  );
};

export default Home;

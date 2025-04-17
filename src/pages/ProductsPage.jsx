import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, fetchCategories, setFilters, setPage } from '../store/slices/productSlice';
import ProductGrid from '../components/products/ProductGrid';
import CategoryFilter from '../components/products/CategoryFilter';
import PriceRangeFilter from '../components/products/PriceRangeFilter';
import SortDropdown from '../components/products/SortDropdown';
import Pagination from '../components/products/Pagination';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { 
    products, 
    categories, 
    status, 
    filters, 
    pagination 
  } = useSelector((state) => state.products);
  
  useEffect(() => {
    // Fetch categories on component mount
    dispatch(fetchCategories());
  }, [dispatch]);
  
  useEffect(() => {
    // Fetch products when filters or pagination change
    dispatch(fetchProducts({
      page: pagination?.page,
      limit: pagination?.limit,
      sort: filters?.sort,
      category: filters?.category,
      minPrice: filters?.minPrice,
      maxPrice: filters?.maxPrice
    }));
  }, [dispatch, pagination.page, filters]);
  
  const handleFilterChange = (newFilters) => {
    dispatch(setFilters(newFilters));
  };
  
  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
  };
  
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Sidebar Filters */}
      <div className="md:col-span-1 space-y-6">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        
        <CategoryFilter 
          categories={categories}
          selectedCategories={filters.category}
          onChange={(category) => handleFilterChange({ 
            category: filters?.category?.includes(category) 
              ? filters.category.filter(c => c !== category)
              : [...filters.category, category]
          })}
        />
        
        <PriceRangeFilter
          minPrice={filters.minPrice}
          maxPrice={filters.maxPrice}
          onChange={(min, max) => handleFilterChange({ minPrice: min, maxPrice: max })}
        />
        
        <button
          className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded"
          onClick={() => handleFilterChange({
            category: [],
            minPrice: 0,
            maxPrice: 1000,
            sort: 'latest'
          })}
        >
          Reset Filters
        </button>
      </div>
      
      {/* Product Listing */}
      <div className="md:col-span-3">
        {/* Sort Controls */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Showing {products.length} of {pagination.total} products
          </p>
          
          <SortDropdown
            value={filters.sort}
            onChange={(sort) => handleFilterChange({ sort })}
          />
        </div>
        
        {/* Products */}
        {status === 'loading' ? (
          <LoadingSpinner />
        ) : status === 'failed' ? (
          <div className="text-center py-10">
            <p className="text-red-500">Failed to load products.
            </p>
            <button 
              onClick={() => dispatch(fetchProducts())}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            <ProductGrid products={products} />
            
            {/* Pagination */}
            <div className="mt-8">
              <Pagination 
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
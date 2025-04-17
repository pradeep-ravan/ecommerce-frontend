import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products }) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No products found matching your criteria.</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;

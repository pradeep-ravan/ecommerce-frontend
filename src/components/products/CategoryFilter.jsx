import React from 'react';

const CategoryFilter = ({ categories=[], selectedCategories, onChange }) => {
  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-medium text-gray-800 mb-2">Product Categories</h3>
      <div className="space-y-2">
        {categories &&categories?.map((category) => (
          <div key={category.slug} className="flex items-center">
            <input
              type="checkbox"
              id={`category-${category.slug}`}
              checked={selectedCategories.includes(category.slug)}
              onChange={() => onChange(category.slug)}
              className="h-4 w-4 text-blue-600 rounded"
            />
            <label 
              htmlFor={`category-${category.slug}`}
              className="ml-2 text-gray-700"
            >
              {category.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;

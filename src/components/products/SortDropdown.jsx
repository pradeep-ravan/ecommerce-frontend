import React from 'react';

const SortDropdown = ({ value, onChange }) => {
  return (
    <div className="flex items-center">
      <label htmlFor="sort" className="mr-2 text-gray-600">Sort by:</label>
      <select
        id="sort"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded py-1 px-2"
      >
        <option value="latest">Latest</option>
        <option value="price-low-high">Price: Low to High</option>
        <option value="price-high-low">Price: High to Low</option>
      </select>
    </div>
  );
};

export default SortDropdown;

import React, { useState, useEffect } from 'react';

const PriceRangeFilter = ({ minPrice, maxPrice, onChange }) => {
  const [localMin, setLocalMin] = useState(minPrice);
  const [localMax, setLocalMax] = useState(maxPrice);
  
  useEffect(() => {
    setLocalMin(minPrice);
    setLocalMax(maxPrice);
  }, [minPrice, maxPrice]);
  
  const handleApply = () => {
    onChange(Number(localMin), Number(localMax));
  };
  
  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-medium text-gray-800 mb-4">Filter by Price</h3>
      
      <div className="mb-4">
        <input
          type="range"
          min="0"
          max="1000"
          value={localMax}
          onChange={(e) => setLocalMax(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <label className="block text-sm text-gray-600">Min</label>
          <input
            type="number"
            min="0"
            max={localMax}
            value={localMin}
            onChange={(e) => setLocalMin(Number(e.target.value))}
            className="w-24 border rounded px-2 py-1"
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-600">Max</label>
          <input
            type="number"
            min={localMin}
            max="1000"
            value={localMax}
            onChange={(e) => setLocalMax(Number(e.target.value))}
            className="w-24 border rounded px-2 py-1"
          />
        </div>
      </div>
      
      <button
        onClick={handleApply}
        className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded text-sm"
      >
        Apply
      </button>
    </div>
  );
};

export default PriceRangeFilter;

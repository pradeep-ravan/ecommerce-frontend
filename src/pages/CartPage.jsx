import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCart, removeFromCart } from '../store/slices/cartSlice';
import LoadingSpinner from '../components/common/LoadingSpinner';

const CartPage = () => {
  const dispatch = useDispatch();
  const { items, totalItems, totalPrice, status } = useSelector((state) => state.cart);
  
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);
  
  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };
  
  if (status === 'loading') {
    return <LoadingSpinner />;
  }
  
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600 mb-8">Add some products to your cart to see them here.</p>
        <Link 
          to="/" 
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg font-medium"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Your Cart ({totalItems} items)</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="grid grid-cols-5 bg-gray-100 p-4 text-gray-600 font-medium">
          <div className="col-span-2">Product</div>
          <div className="text-center">Price</div>
          <div className="text-center">Quantity</div>
          <div className="text-right">Total</div>
        </div>
        
        {items?.map((item) => (
          <div 
            key={item.productId} 
            className="grid grid-cols-5 p-4 border-t border-gray-200 items-center"
          >
            <div className="col-span-2 flex items-center space-x-4">
              <img 
                src={item.productDetails.image} 
                alt={item.productDetails.title}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h3 className="font-medium">{item.productDetails.title}</h3>
                <button
                  onClick={() => handleRemoveItem(item.productId)}
                  className="text-red-500 text-sm mt-1 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
            <div className="text-center">${item.productDetails.price.toFixed(2)}</div>
            <div className="text-center">{item.quantity}</div>
            <div className="text-right font-medium">
              ${(item.productDetails.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
        
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center font-bold text-lg">
            <span>Grand Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="mt-6 text-right">
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg font-medium">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
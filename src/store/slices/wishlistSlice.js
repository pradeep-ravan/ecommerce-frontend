import { createSlice } from '@reduxjs/toolkit';

// For simplicity, we'll implement wishlist just in Redux without API calls
const initialState = {
  items: JSON.parse(localStorage.getItem('wishlist') || '[]')
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlistItem: (state, action) => {
      const productId = action.payload;
      const index = state.items.indexOf(productId);
      
      if (index === -1) {
        // Add to wishlist
        state.items.push(productId);
      } else {
        // Remove from wishlist
        state.items.splice(index, 1);
      }
      
      // Save to localStorage
      localStorage.setItem('wishlist', JSON.stringify(state.items));
    }
  }
});

export const { toggleWishlistItem } = wishlistSlice.actions;
export default wishlistSlice.reducer;

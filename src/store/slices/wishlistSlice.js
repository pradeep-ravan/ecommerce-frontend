import { createSlice } from '@reduxjs/toolkit';

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
        state.items.push(productId);
      } else {
        state.items.splice(index, 1);
      }
      
      localStorage.setItem('wishlist', JSON.stringify(state.items));
    }
  }
});

export const { toggleWishlistItem } = wishlistSlice.actions;
export default wishlistSlice.reducer;

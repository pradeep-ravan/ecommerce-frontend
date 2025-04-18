import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_APP_API_URL;

const getSessionId = () => {
  let sessionId = localStorage.getItem('session_id');
  if (!sessionId) {
    sessionId = 'session_' + Date.now();
    localStorage.setItem('session_id', sessionId);
  }
  return sessionId;
};

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/cart`, {
        headers: { 'session-id': getSessionId() }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ productId, quantity = 1 }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/cart/add`,
        { productId, quantity },
        { headers: { 'session-id': getSessionId() } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/cart/remove/${productId}`, {
        headers: { 'session-id': getSessionId() }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  status: 'idle', 
  error: null
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.items;
        state.totalItems = action.payload.totalItems;
        state.totalPrice = action.payload.totalPrice;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch cart';
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload.cart;
        state.totalItems = action.payload.cart.reduce(
          (total, item) => total + item.quantity, 0
        );
        state.totalPrice = action.payload.cart.reduce(
          (total, item) => total + (item.productDetails.price * item.quantity), 0
        );
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = action.payload.cart;
        state.totalItems = action.payload.cart.reduce(
          (total, item) => total + item.quantity, 0
        );
        state.totalPrice = action.payload.cart.reduce(
          (total, item) => total + (item.productDetails.price * item.quantity), 0
        );
      });
  }
});

export default cartSlice.reducer;
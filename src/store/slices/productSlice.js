import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Async thunks
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ page = 1, limit = 9, sort = 'latest', category = [], minPrice, maxPrice } = {}, { rejectWithValue }) => {
    try {
      // Build query parameters
      const params = new URLSearchParams();
      params.append('page', page);
      params.append('limit', limit);
      params.append('sort', sort);
      
      if (category && category.length > 0) {
        category.forEach(cat => params.append('category', cat));
      }
      
      if (minPrice !== undefined) params.append('minPrice', minPrice);
      if (maxPrice !== undefined) params.append('maxPrice', maxPrice);
      
      const response = await axios.get(`${API_URL}/products?${params.toString()}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/categories`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  products: [],
  categories: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  filters: {
    category: [],
    minPrice: 0,
    maxPrice: 1000,
    sort: 'latest'
  },
  pagination: {
    page: 1,
    limit: 9,
    totalPages: 0,
    total: 0
  }
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      // Reset to page 1 when filters change
      state.pagination.page = 1;
    },
    setPage: (state, action) => {
      state.pagination.page = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchProducts
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload.data;
        state.pagination = {
          ...state.pagination,
          ...action.payload.meta
        };
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch products';
      })
      // Handle fetchCategories
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  }
});

export const { setFilters, setPage } = productSlice.actions;
export default productSlice.reducer;
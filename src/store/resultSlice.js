import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunk for fetching the result
export const fetchResult = createAsyncThunk(
  'result/fetchResult',
  async ({ examId, rollNumber }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/results/search`, 
        {
          examId,
          rollNumber,
        },
        {
          headers: {
            'ngrok-skip-browser-warning': 'true'
          }
        }
      );
      return response.data.data; // The scorecard object from the backend
    } catch (error) {
      // Return the error message from our backend's ErrorHandler
      return rejectWithValue(
        error.response?.data?.message || 'Something went wrong while fetching the result'
      );
    }
  }
);

const resultSlice = createSlice({
  name: 'result',
  initialState: {
    scorecard: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearResult: (state) => {
      state.scorecard = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchResult.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.scorecard = null;
      })
      .addCase(fetchResult.fulfilled, (state, action) => {
        state.loading = false;
        state.scorecard = action.payload;
      })
      .addCase(fetchResult.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearResult } = resultSlice.actions;
export default resultSlice.reducer;
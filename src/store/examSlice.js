import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchExams = createAsyncThunk(
  'exams/fetchExams',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:5000/api/exams');
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch exams'
      );
    }
  }
);

const examSlice = createSlice({
  name: 'exams',
  initialState: {
    examList: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExams.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchExams.fulfilled, (state, action) => {
        state.loading = false;
        state.examList = action.payload;
      })
      .addCase(fetchExams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default examSlice.reducer;
import { configureStore } from '@reduxjs/toolkit';
import resultReducer from './resultSlice';
import examReducer from './examSlice';

const store = configureStore({
  reducer: {
    result: resultReducer,
    exams :examReducer
  },
});

export default store;
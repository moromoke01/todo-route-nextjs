// store.js
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '@/lib/features/todos/todoSlice';

const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
});

export default store;

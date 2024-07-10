import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../contexts/auth-reducer/auth';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

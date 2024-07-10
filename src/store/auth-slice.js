import { createSlice } from '@reduxjs/toolkit';
import { LOGIN, LOGOUT, REGISTER } from '../contexts/auth-reducer/actions';

const initialState = {
  isLoggedIn: false,
  isInitialized: false,
  user: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    [LOGIN]: (state, action) => {
      state.isLoggedIn = true;
      state.isInitialized = true;
      state.user = action.payload.user;
    },
    [LOGOUT]: (state) => {
      state.isLoggedIn = false;
      state.isInitialized = true;
      state.user = null;
    },
    [REGISTER]: (state, action) => {
      state.user = action.payload.user;
    },
  },
});

export const { actions: authActions, reducer: authReducer } = authSlice;

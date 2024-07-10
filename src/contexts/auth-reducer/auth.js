import { authActions } from '../../store/auth-slice';

// initial state
export const initialState = {
  isLoggedIn: false,
  isInitialized: false,
  user: null
};

// ==============================|| AUTH REDUCER ||============================== //

const auth = (state = initialState, action) => {
  return authActions[action.type]?.(state, action) ?? state;
};

export default auth;

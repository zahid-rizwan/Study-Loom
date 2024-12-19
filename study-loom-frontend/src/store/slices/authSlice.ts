import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.error = null; // Clear any existing errors
    },
    loginSuccess: (state) => {
      state.isLoggedIn = true;
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoggedIn = false;
      state.loading = false;
      state.error = action.payload;
    },
    logoutSuccess: (state) => {
      state.isLoggedIn = false;
      state.loading = false;
      state.error = null;
    },
    setAuthenticationStatus: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutSuccess,
  setAuthenticationStatus,
} = authSlice.actions;

export default authSlice.reducer;

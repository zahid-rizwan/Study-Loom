import { configureStore } from '@reduxjs/toolkit';
import courseReducer from './slices/courseSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    courses: courseReducer,
    auth:authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
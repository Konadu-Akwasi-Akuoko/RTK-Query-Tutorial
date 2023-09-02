import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import textBoxReducer from "./textboxSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    textBox: textBoxReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
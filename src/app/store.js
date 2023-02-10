import { configureStore } from "@reduxjs/toolkit";
import tradingPageReducer from "./slices/tradingPageSlice";
import tickerPageReducer from "./slices/tickerPageSlice";
import { api } from "./api/api";

export const store = configureStore({
  reducer: {
    tradingPage: tradingPageReducer,
    tickerPage: tickerPageReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

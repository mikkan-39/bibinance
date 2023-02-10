import { configureStore } from "@reduxjs/toolkit";
import tradingPageReducer from "./slices/tradingPageSlice";
import tickerPageReducer from "./slices/tickerPageSlice";

export const store = configureStore({
  reducer: {
    tradingPage: tradingPageReducer,
    tickerPage: tickerPageReducer,
  },
});

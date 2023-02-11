import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const host = "https://dev.exnode.ru";
const tradingPort = "/-trading-";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: host }),
  endpoints: (builder) => ({
    getTradingPageIcons: builder.query({
      query: () => `${tradingPort}/api/coins_imgs`,
      transformResponse: (response, meta, arg) => response.content,
    }),
    getTradingCoins: builder.query({
      query: () => `${tradingPort}/api/trading`,
      transformResponse: (response, meta, arg) => response.content,
    }),
    getPopularCoins: builder.query({
      query: () => `${tradingPort}/api/trading_popular_courses`,
      transformResponse: (response, meta, arg) => response.content,
    }),
    getIconLinks: builder.query({
      query: () => `${tradingPort}/api/coins_imgs`,
      transformResponse: (response, meta, arg) => response.content,
    }),
  }),
});

export const {
  useGetTradingPageIconsQuery,
  useGetTradingCoinsQuery,
  useGetPopularCoinsQuery,
  useGetIconLinksQuery,
} = api;

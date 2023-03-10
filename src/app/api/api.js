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
    getChartData: builder.query({
      query: ({ starttime, endtime, ticker }) => ({
        url: `-clicks-/api/ticker`,
        params: {
          starttime,
          endtime,
          ticker,
          period: "1h",
          context: "USD",
        },
      }),
      transformResponse: (response, meta, arg) => response.data,
    }),
  }),
});

export const {
  useGetTradingPageIconsQuery,
  useGetTradingCoinsQuery,
  useGetPopularCoinsQuery,
  useGetIconLinksQuery,
  useGetChartDataQuery,
} = api;

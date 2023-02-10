import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dev.exnode.ru" }),
  endpoints: (builder) => ({
    getTradingPageIcons: builder.query({
      query: () => `/-trading-/api/coins_imgs`,
      transformResponse: (response, meta, arg) => response.content,
    }),
    getTradingCoins: builder.query({
      query: () => `/-trading-/api/trading`,
      transformResponse: (response, meta, arg) => {
        const keys = Object.keys(response.content);
        var res = [];
        for (const key of keys) {
          res.push({
            id: key,
            ...response.content[key],
          });
        }
        return res;
      },
    }),
    getPopularCoins: builder.query({
      query: () => `/-trading-/api/trading_popular_courses`,
      transformResponse: (response, meta, arg) => response.content,
    }),
  }),
});

export const {
  useGetTradingPageIconsQuery,
  useGetTradingCoinsQuery,
  useGetPopularCoinsQuery,
} = api;

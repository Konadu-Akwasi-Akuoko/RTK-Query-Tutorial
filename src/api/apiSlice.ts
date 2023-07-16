import { ToDo } from "@/types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5050" }),
  endpoints: (builder) => ({
    getToDos: builder.query({
      query: () => ({ url: "/todos" }),
    }),
  }),
});

export const { useGetToDosQuery } = apiSlice;

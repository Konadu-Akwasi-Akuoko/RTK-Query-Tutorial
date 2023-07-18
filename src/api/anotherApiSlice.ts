// If you have another base query with its own queries and mutations, you 
// can add it to the `apiSlice.ts` file by creating a new  API slice 
// using the `createApi` function and specifying the new base query, 
// queries, and mutations. Here is an example of how you can do this:


import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Create a new API slice with a different base query.
export const anotherApiSlice = createApi({
  reducerPath: "anotherApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:6060" }),
  tagTypes: ["AnotherType"],
  endpoints: (builder) => ({
    // Define your queries and mutations here.
    getAnotherType: builder.query({
      query: () => ({ url: "/anotherType" }),
      providesTags: ["AnotherType"],
    }),
    addAnotherType: builder.mutation({
      query: (data) => ({
        url: "/anotherType",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AnotherType"],
    }),
  }),
});

// Export hooks for using the new API slice's endpoints.
export const {
  useGetAnotherTypeQuery,
  useAddAnotherTypeMutation,
} = anotherApiSlice;


// In this example, we are creating a new API slice called `anotherApiSlice` 
// using the `createApi` function. We specify a different `reducerPath` and 
// `baseQuery` for the new API slice, as  well as its own set of queries and
//  mutations. We can then export hooks for using the new API slice's endpoints,
//  just like we did with the original `apiSlice`.

// You can then use both `apiSlice` and `anotherApiSlice` in your application to
//  access data from two different APIs with different base queries.

// I hope this helps you understand how to add another base query with 
// its own queries and mutations to the `apiSlice.ts` file.
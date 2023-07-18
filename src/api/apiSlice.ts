import { ToDo } from "@/types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// `apiSlice` is an RTK Query API slice created using the `createApi` function.
export const apiSlice = createApi({
  // `reducerPath` specifies the key in the Redux store where the API slice's data will be stored.
  reducerPath: "api",
  // `baseQuery` specifies the base query function to use for fetching data from the server.
  // In this case, we are using `fetchBaseQuery` with the `baseUrl` set to `"http://localhost:5050"`.
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5050" }),
  // `tagTypes` specifies the tag types that can be used for cache invalidation.
  tagTypes: ["Todos"],
  // `endpoints` defines the endpoints for the API slice.
  endpoints: (builder) => ({
    // `getToDos` is a query endpoint that fetches a list of ToDos from the server.
    getToDos: builder.query<ToDo[], void>({
      // The query function specifies how to construct the request to fetch data from the server.
      query: () => ({ url: "/todos" }),
      // The `transformResponse` function allows you to transform the response data before it is stored in the cache.
      // In this case, we are sorting the ToDos by their `id` in descending order.
      transformResponse: (response: ToDo[], meta, args) =>
        response.sort((a, b) => b.id - a.id),
      // The `providesTags` function specifies which tags are provided by this query endpoint.
      providesTags: ["Todos"],
    }),
    // `getToDosTitle` is a query endpoint that fetches a list of ToDo titles from the server.
    getToDosTitle: builder.query<string[], void>({
      query: () => ({ url: "/todos" }),
      // The `transformResponse` function transforms the response data into an array of ToDo titles.
      transformResponse: (response: ToDo[], meta, args) => {
        return response.map((item) => item.title);
      },
      // The `transformErrorResponse` function allows you to transform error responses before they are returned to the caller.
      transformErrorResponse: (
        response: { status: string | number },
        meta,
        args
      ) => {
        return response.status;
      },
    }),
    // `addToDo` is a mutation endpoint that adds a new ToDo to the server.
    addToDo: builder.mutation<any, Partial<ToDo> & Pick<ToDo, "title">>({
      // The query function specifies how to construct the request to add a new ToDo to the server.
      query: (todo) => ({
        url: "/todos",
        method: "POST",
        body: todo,
      }),
      // The `invalidatesTags` function specifies which tags should be invalidated by this mutation endpoint.
      invalidatesTags: ["Todos"],
    }),
    // `updateToDo` is a mutation endpoint that updates an existing ToDo on the server.
    updateToDo: builder.mutation<ToDo, ToDo>({
      // The query function specifies how to construct the request to update an existing ToDo on the server.
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: "PATCH",
        body: todo,
      }),
      invalidatesTags: ["Todos"],
    }),
    // `deleteToDo` is a mutation endpoint that deletes an existing ToDo from the server.
    deleteToDo: builder.mutation<ToDo, Pick<ToDo, "id">>({
      // The query function specifies how to construct the request to delete an existing ToDo from the server.
      query: (todoId) => ({
        url: `/todos/${todoId.id}`,
        method: "DELETE",
        body: todoId,
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

// Export hooks for using each of the endpoints defined above.
export const {
  useGetToDosQuery,
  useGetToDosTitleQuery,
  useAddToDoMutation,
  useUpdateToDoMutation,
  useDeleteToDoMutation,
} = apiSlice;

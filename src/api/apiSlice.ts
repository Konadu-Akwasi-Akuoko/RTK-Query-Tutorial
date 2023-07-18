import { ToDo } from "@/types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5050" }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getToDos: builder.query<ToDo[], void>({
      query: () => ({ url: "/todos" }),
      transformResponse: (response: ToDo[], meta, args) =>
        response.sort((a, b) => b.id - a.id),
      providesTags: ["Todos"],
    }),
    getToDosTitle: builder.query<string[], void>({
      query: () => ({ url: "/todos" }),
      transformResponse: (response: ToDo[], meta, args) => {
        return response.map((item) => item.title);
      },
      transformErrorResponse: (
        response: { status: string | number },
        meta,
        args
      ) => {
        return response.status;
      },
    }),
    // The first type parameter, `ToDo`, specifies the type of data that will be returned by the mutation.
    // The second type parameter, `Partial<ToDo> & Pick<ToDo, "title">`, specifies the type of the argument that will be passed to the mutation.
    // `Partial<ToDo>` makes all properties of the `ToDo` type optional.
    // `Pick<ToDo, "title">` picks only the `"title"` property from the `ToDo` type.
    // The `&` symbol combines these two types using an intersection type.
    // This means that the argument passed to the `addToDo` mutation must be an object with an optional subset of properties from the `ToDo` type, as well as a required `"title"` property.
    addToDo: builder.mutation<any, Partial<ToDo> & Pick<ToDo, "title">>({
      query: (todo) => ({
        url: "/todos",
        method: "POST",
        body: todo,
      }),
      invalidatesTags: ["Todos"],
    }),
    updateToDo: builder.mutation<ToDo, ToDo>({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: "PATCH",
        body: todo,
      }),
      invalidatesTags: ["Todos"],
    }),
    deleteToDo: builder.mutation<ToDo, Pick<ToDo, "id">>({
      query: (todoId) => ({
        url: `/todos/${todoId.id}`,
        method: "DELETE",
        body: todoId,
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

export const {
  useGetToDosQuery,
  useGetToDosTitleQuery,
  useAddToDoMutation,
  useUpdateToDoMutation,
  useDeleteToDoMutation,
} = apiSlice;

"use client";
import {
  useGetToDosQuery,
  useGetToDosTitleQuery,
  useAddToDoMutation,
  useUpdateToDoMutation,
  useDeleteToDoMutation,
} from "@/api/apiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import { SyntheticEvent, useState } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { useSelector } from "react-redux";
import { selectTextBox, setTextBox } from "@/api/textboxSlice";
import { store } from "@/api/store";

const TodoList = () => {
  const newTodo = useSelector(selectTextBox);

  const {
    data: todos,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetToDosQuery();

  // Mutation queries
  const [
    addToDo, // The first element of the array returned by useAddToDoMutation is the addToDo function, which can be used to trigger the mutation.
    {
      // The second element of the array is an object containing information about the current state of the mutation.
      isError: isAddToDoError, // The isError property indicates whether an error occurred while executing the mutation.
      isLoading: isAddToDoLoading, // The isLoading property indicates whether the mutation is currently in progress.
      isSuccess: isAddToDoSuccess, // The isSuccess property indicates whether the mutation completed successfully.
      data: isAddToDoData, // The data property contains the data returned by the mutation, if it completed successfully.
      error: isAddToDoErrorData, // The error property contains information about any error that occurred while executing the mutation.
    },
  ] = useAddToDoMutation();

  const [updateToDo] = useUpdateToDoMutation();
  const [deleteToDo] = useDeleteToDoMutation();

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();
    //addTodo
    addToDo({ userId: 45, title: newTodo, completed: false });
    store.dispatch(setTextBox(""));
  };

  const newItemSection = (
    <form onSubmit={handleSubmit}>
      <label htmlFor="new-todo">Enter a new todo item</label>
      <div className="new-todo">
        <input
          type="text"
          id="new-todo"
          value={newTodo}
          onChange={(e) => store.dispatch(setTextBox(e.target.value))}
          placeholder="Enter new todo"
        />
      </div>
      <button className="submit">
        <FontAwesomeIcon icon={faUpload} />
      </button>
    </form>
  );

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    // content = JSON.stringify(todos);
    content = todos.map((todo) => {
      //JSON.stringify(todos)
      return (
        <article key={todo.id}>
          <div className="todo">
            <input
              type="checkbox"
              checked={todo.completed}
              id={String(todo.id)}
              onChange={() =>
                updateToDo({ ...todo, completed: !todo.completed })
              }
            />
            <label htmlFor={String(todo.id)}>{todo.title}</label>
          </div>
          <button className="trash" onClick={() => deleteToDo({ id: todo.id })}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </article>
      );
    });
  } else if (isError) {
    console.log(error);
    content = <p>{"Error: " + error}</p>;
  }

  return (
    <main>
      <h1>Todo List</h1>
      {newItemSection}
      {content}
    </main>
  );
};
export default TodoList;

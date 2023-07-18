"use client";
import { apiSlice } from "@/api/apiSlice";
import { store } from "@/api/store";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import React from "react";
import { Provider } from "react-redux";

export default function ApiProviderClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}

// <ApiProvider api={apiSlice}>{children}</ApiProvider>;

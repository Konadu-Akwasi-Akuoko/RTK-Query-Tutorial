"use client";
import { apiSlice } from "@/api/apiSlice";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import React from "react";

export default function ApiProviderClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ApiProvider api={apiSlice}>{children}</ApiProvider>;
}

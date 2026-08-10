import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const libraryApi = createApi({
  reducerPath: "libraryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080",

    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    studentLogin: builder.mutation({
      query: ({ email, password }) => ({
        url: "/api/student/auth/login",

        method: "POST",

        body: { email, password },
      }),
    }),

    getBooks: builder.query({
      query: () => ({
        url: "/api/student/books",
      }),
    }),
  }),
});

export const { useGetBooksQuery, useStudentLoginMutation } = libraryApi;

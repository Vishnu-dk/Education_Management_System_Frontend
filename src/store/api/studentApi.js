import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const studentApi = createApi({
  reducerPath: "studentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/student",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/books",
    }),
    requestBook: builder.mutation({
      query: ({ bookId }) => ({
        url: `/book-requests`,
        method: "POST",
        body: {
          bookId,
        },
      }),
    }),
    getMyBooks: builder.query({
      query: () => ({
        url: "/book-requests/my-books",
      }),
    }),
    getStudentProfile: builder.query({
      query: ( studentId ) => ({
        url: `/profile/${studentId}`,
      }),
    }),
        getProfile: builder.query({
      query: ( studentId ) => ({
        url: `/profile/${studentId}`,
      }),
    }),
  }),
});

export const { useGetBooksQuery, useRequestBookMutation, useGetMyBooksQuery, useGetStudentProfileQuery, useGetProfileQuery } =
  studentApi;

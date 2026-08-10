import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const librarianApi = createApi({
  reducerPath: "librarianApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/librarian",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => {
    return {
      allRequest: builder.query({
        query: () => ({
          url: "/book-requests",
        }),
      }),
      acceptBookRequest: builder.mutation({
        query: ({ requestId }) => ({
          url: `/book-requests/${requestId}/approve`,
          method: "PATCH",
        }),
      }),
      rejectBookRequest: builder.mutation({
        query: ({ requestId }) => ({
          url: `/book-requests/${requestId}/reject`,
          method: "PATCH",
        }),
      }),
      returnBook: builder.mutation({
        query: (issueId) => ({
          url: `/book-requests/${issueId}/return`,
          method: "PATCH",
        }),
      }),
      getAllBooks: builder.query({
        query: () => ({
          url: "/books",
        }),
        providesTags: ["Books"],
      }),
      addBook: builder.mutation({
        query: (bookData) => ({
          url: "/books",
          method: "POST",
          body: bookData,
        }),
        invalidatesTags: ["Books"],
      }),
      updateBook: builder.mutation({
        query: ({ bookId, data }) => ({
          url: `/books/${bookId}`,

          method: "PUT",

          body: data,
        }),

        invalidatesTags: ["Books"],
      }),

      deactivateBook: builder.mutation({
        query: (bookId) => ({
          url: `/books/${bookId}/deactivate`,

          method: "PATCH",
        }),

        invalidatesTags: ["Books"],
      }),

      activateBook: builder.mutation({
        query: (bookId) => ({
          url: `/books/${bookId}/activate`,

          method: "PATCH",
        }),

        invalidatesTags: ["Books"],
      }),

      markFinePaid: builder.mutation({
        query: (issueId) => ({
          url: `/book-requests/${issueId}/fine-paid`,

          method: "PATCH",
        }),

        invalidatesTags: ["Requests"],
      }),
      getLibrarianProfile: builder.query({
        query: (librarianId) => ({
          url: `//${librarianId}`,
        }),
      }),

      tagTypes: ["Books"],
    };
  },
});
export const {
  useAllRequestQuery,
  useAcceptBookRequestMutation,
  useRejectBookRequestMutation,
  useReturnBookMutation,
  useGetAllBooksQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeactivateBookMutation,
  useActivateBookMutation,
  useMarkFinePaidMutation,
  useGetLibrarianProfileQuery
} = librarianApi;

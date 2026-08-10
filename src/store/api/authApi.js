import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080",
  }),

  endpoints: (builder) => ({
    studentLogin: builder.mutation({
      query: ({ email, password }) => ({
        url: "/api/student/auth/login",

        method: "POST",

        body: {
          email,
          password,
        },
      }),
    }),

    adminLogin: builder.mutation({
      query: ({ email, password }) => ({
        url: "/api/admin/auth/login",

        method: "POST",

        body: {
          email,
          password,
        },
      }),
    }),

    studentRegister: builder.mutation({
      query: (studentData) => ({
        url: "/api/student/auth/register",

        method: "POST",

        body: studentData,
      }),
    }),

    adminRegister: builder.mutation({
      query: (adminData) => ({
        url: "/api/admin/auth/register",

        method: "POST",

        body: adminData,
      }),
    }),
  }),
});

export const {
  useStudentLoginMutation,

  useAdminLoginMutation,

  useStudentRegisterMutation,

  useAdminRegisterMutation,
} = authApi;

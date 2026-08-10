import { configureStore } from "@reduxjs/toolkit";
import { libraryApi } from "./api/libraryApi";
import { studentApi } from "./api/studentApi";
import { authApi } from "./api/authApi";
import { librarianApi } from "./api/librarianApi";

export const store = configureStore({
  reducer: {
    [libraryApi.reducerPath]: libraryApi.reducer,
    [studentApi.reducerPath]: studentApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [librarianApi.reducerPath]: librarianApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      libraryApi.middleware,
      studentApi.middleware,
      authApi.middleware,
      librarianApi.middleware,
    ),
});

import axiosInstance from "./axiosInstance";

export const getAllBooks = async () => {
  const response = await axiosInstance.get("/api/student/books");
  return response.data;
};

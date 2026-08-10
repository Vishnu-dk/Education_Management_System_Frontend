import axiosInstance from "./axiosInstance";

export const studentLogin = async (email, password) => {
  const response = await axiosInstance.post("/api/student/auth/login", {
    email,
    password,
  });
  console.log("LOGIN RESPONSE", response.data);
  15;

  return response.data;
};

export const adminLogin = async (email, password) => {
  const response = await axiosInstance.post("/api/admin/auth/login", {
    email,
    password,
  });
  return response.data;
};

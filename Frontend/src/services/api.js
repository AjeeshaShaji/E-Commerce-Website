import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api/auth",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const getUser = (id) => API.get(`/user/${id}`);
export const updateUser = (id, data) => API.put(`/user/${id}`, data);
export const getOrders = (id) => API.get(`/user/${id}/orders`);

import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

const http = axios.create({
  baseURL,
  withCredentials: true,
});

export async function loginUser(data) {
  const res = await http.post("/auth/login", data);
  return res.data;
}

export async function getMe() {
  const res = await http.get("/auth/me");
  return res.data;
}

export async function logoutUser() {
  const res = await http.post("/auth/logout");
  return res.data;
}

export default http;

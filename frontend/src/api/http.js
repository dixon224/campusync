import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const http = axios.create({
  baseURL,
  withCredentials: true,
});

export async function loginUser(data) {
  const res = await http.post("/auth/login", data);
  return res.data;
}

export async function RegisterUser(data) {
  const res = await http.post("/auth/register", data);
  return res.data;
}

export async function AddTeachers(data) {
  const res = await http.post("/auth/teachers", data);
  return res.data;
}

export async function AddStudents(data) {
  const res = await http.post("/auth/students", data);
  return res.data;
}

export async function GetSchedules(data) {
  const res = await http.get("/auth/my_schedules", data);
  return res.data;
}

export async function addClass(data) {
  const res = await http.post("/classes/", data);
  return res.data;
}

export async function GetClasses(data) {
  const res = await http.get("classes/AllClasses", data);
  return res.data;
}

export async function JoinClass(data) {
  const res = await http.post("classes/join", data);
  return res.data;
}

export async function addSchedule(data) {
  const res = await http.post("/schedules/", data);
  return res.data;
}

// export async function getMe() {
//   const res = await http.get("/api/auth/me");
//   return res.data;
// }

// export async function logoutUser() {
//   const res = await http.post("/auth/logout");
//   return res.data;
// }

export default http;

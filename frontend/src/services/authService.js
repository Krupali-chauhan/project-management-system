import axios from "axios";

// const API = "http://localhost:5000/api/auth";

// // 🔹 LOGIN
// export const loginUser = async (userData) => {
//   const response = await axios.post(`${API}/login`, userData);
//   return response.data;
// };

// // 🔹 SIGNUP
// export const registerUser = async (userData) => {
//   const response = await axios.post(`${API}/signup`, userData);
//   return response.data;
// };
const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

export const signupUser = (data) => {
  return API.post("/auth/signup", data);
};

export const loginUser = (data) => {
  return API.post("/auth/login", data);
};
import axios from "axios";

const API = axios.create({
  baseURL: "https://smart-blood-donation-assistance-management-563z9f8vq.vercel.app/api/auth",
});

export const registerUser = (userData) => {
  return API.post("/register", userData);
};

export const loginUser = (userData) => {
  return API.post("/login", userData);
};
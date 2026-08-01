import axios from "axios";

const API = "http://localhost:5000/api/chat";

// Get chats of a user
export const getChats = (userId) => {
  return axios.get(`${API}/${userId}`);
};
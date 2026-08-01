import axios from "axios";

const API = "http://localhost:5000/api/messages";

// Send Message
export const sendMessage = (messageData) => {
  return axios.post(`${API}/send`, messageData);
};

// Get Messages of a Chat
export const getMessages = (chatId) => {
  return axios.get(`${API}/${chatId}`);
};
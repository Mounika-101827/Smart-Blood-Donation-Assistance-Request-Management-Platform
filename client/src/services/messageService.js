import axios from "axios";

const API =
  "https://smart-blood-donation-assistance-management-563z9f8vq.vercel.app/api/messages";

// Send Message
export const sendMessage = (messageData) => {
  return axios.post(`${API}/send`, messageData);
};

// Get Messages of a Chat
export const getMessages = (chatId) => {
  return axios.get(`${API}/${chatId}`);
};
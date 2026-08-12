import axios from "axios";

const API =
  "https://smart-blood-donation-assistance-management-563z9f8vq.vercel.app/api/chat";

// Get chats of a user
export const getChats = (userId) => {
  return axios.get(`${API}/${userId}`);
};
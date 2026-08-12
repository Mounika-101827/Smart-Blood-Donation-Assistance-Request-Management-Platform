import axios from "axios";

const API =
  "https://smart-blood-donation-assistance-management-563z9f8vq.vercel.app/api/notifications";

export const getNotifications = (userId) => {
  return axios.get(`${API}/${userId}`);
};
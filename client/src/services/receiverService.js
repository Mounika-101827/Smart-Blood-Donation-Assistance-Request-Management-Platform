import axios from "axios";

const API_URL =
  "https://smart-blood-donation-assistance-management-563z9f8vq.vercel.app/api/receiver";

export const registerReceiver = (receiverData) => {
  return axios.post(`${API_URL}/register`, receiverData);
};
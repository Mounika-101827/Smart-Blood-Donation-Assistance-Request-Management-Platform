import axios from "axios";

const API =
  "https://smart-blood-donation-assistance-management-563z9f8vq.vercel.app/api/donor";

export const getDonorByUserId = (userId) => {
  return axios.get(`${API}/user/${userId}`);
};
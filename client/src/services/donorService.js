import axios from "axios";

const API = "http://localhost:5000/api/donor";

export const getDonorByUserId = (userId) => {
  return axios.get(`${API}/user/${userId}`);
};
import axios from "axios";

const API_URL = "http://localhost:5000/api/receiver";

export const registerReceiver = (receiverData) => {
  return axios.post(`${API_URL}/register`, receiverData);
};
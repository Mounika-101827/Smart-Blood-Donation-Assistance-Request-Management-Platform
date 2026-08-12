import axios from "axios";

const API =
  "https://smart-blood-donation-assistance-management-563z9f8vq.vercel.app/api/requests";

export const sendRequest = (requestData) => {
  return axios.post(`${API}/send`, requestData);
};

export const getDonorRequests = (donorId) => {
  return axios.get(`${API}/${donorId}`);
};

export const updateRequestStatus = (requestId, status) => {
  return axios.put(`${API}/status/${requestId}`, { status });
};
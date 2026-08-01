import axios from "axios";

const API = "http://localhost:5000/api/requests";

export const sendRequest = (requestData) => {
  return axios.post(`${API}/send`, requestData);
};

export const getDonorRequests = (donorId) => {
  return axios.get(`${API}/${donorId}`);
};

export const updateRequestStatus = (requestId, status) => {
  return axios.put(
    `${API}/status/${requestId}`,
    { status }
  );
};
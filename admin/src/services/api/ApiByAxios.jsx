import axiosInstance from "./AxiosCustom";

// Get data
export const getRequest = async (endpoint, params = {}) => {
  return await axiosInstance.get(endpoint, params);
};

// Post Data with optional data
export const postRequest = async (endpoint, params = {}) => {
  return await axiosInstance.post(endpoint, params);
};

// Put Data with optional data
export const putRequest = async (endpoint, params = {}) => {
  return await axiosInstance.put(endpoint, params);
};

// Delete Data with optional data
export const deleteRequest = async (endpoint, params = {}) => {
  return await axiosInstance.delete(endpoint, params);
};

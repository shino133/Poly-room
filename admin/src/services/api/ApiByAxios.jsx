import axiosInstance from "./AxiosCustom";

// Get data
export const getRequest = async (endpoint, params = {}) => {
  try {
    return await axiosInstance.get(endpoint, params);
  } catch (error) {
    return error;
  }
};

// Post Data with optional data
export const postRequest = async (endpoint, params = {}) => {
  try {
    return await axiosInstance.post(endpoint, params);
  } catch (error) {
    throw error;
  }
};

// Put Data with optional data
export const putRequest = async (endpoint, params = {}) => {
  try {
    return await axiosInstance.put(endpoint, params);
  } catch (error) {
    return error;
  }
};

// Delete Data with optional data
export const deleteRequest = async (endpoint, params = {}) => {
  try {
    return await axiosInstance.delete(endpoint, params);
  } catch (error) {
    return error;
  }
};

import axiosInstance from "./AxiosCustom";

// Get data
export const getRequest = async (endpoint, params = {}) => {
  try {
    const res = await axiosInstance.get(endpoint, params);
    return res.data;
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
    const res = await axiosInstance.put(endpoint, params);
    return res.data;
  } catch (error) {
    return error;
  }
};

// Delete Data with optional data
export const deleteRequest = async (endpoint, params = {}) => {
  try {
    const res = await axiosInstance.delete(endpoint, params);
    return res.data;
  } catch (error) {
    return error;
  }
};

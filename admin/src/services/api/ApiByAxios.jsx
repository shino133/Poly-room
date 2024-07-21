import { axiosInstance } from "./AxiosCustom";

// Get data
export const getRequest = async (role, endpoint , data = null) => {
  try {
    const res = await axiosInstance(role).get(endpoint , data);
    return res.data;
  } catch (error) {
    return error;
  }
};


// Post Data with optional data
export const postRequest = async (role, endpoint, data = null) => {
  try {
    const res = await axiosInstance(role).post(endpoint, data);
    return res.data;
  } catch (error) {
    return error;
  }
};

// Put Data with optional data
export const putRequest = async (role, endpoint, data = null) => {
  try {
    const res = await axiosInstance(role).put(endpoint, data);
    return res.data;
  } catch (error) {
    return error;
  }
};

// Delete Data with optional data
export const deleteRequest = async (role, endpoint, data = null) => {
  try {
    const res = await axiosInstance(role).delete(endpoint, data);
    return res.data;
  } catch (error) {
    return error;
  }
};
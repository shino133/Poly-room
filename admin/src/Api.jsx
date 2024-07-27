import * as Api from "./services/api/ApiByAxios";
import axios from "axios";

// Get Data
export const getRoomData = () => {
  return Api.getRequest("/room");
};

export const getRoomDataPerPage = (perPage, page) => {
  return Api.getRequest(`/room?perPage=${perPage}&page=${page}`);
};

export const getDashboardData = () => {
  return Api.getRequest("/dashboard");
};

export const getUserData = (perPage, page) => {
  return Api.getRequest("/user?perPage=" + perPage + "&page=" + page);
};

export const findUser = (id) => {
  return Api.getRequest(`/user/${id}`);
};

export const getMyData = () => {
  return Api.getRequest("/me");
};

export const getStatistics = () => {
  return Api.getRequest("/statistic");
};

export const deleteRoom = (id) => {
  return Api.deleteRequest(`/room/${id}`);
};

export const addRoom = (params) => {
  return Api.postRequest("/room", params);
};

export const editRoom = (id, params) => {
  return Api.putRequest(`/room/${id}`, params);
};

export const getWeather = async () => {
  const response = await axios.get(
    `https://api.open-meteo.com/v1/forecast?latitude=20.5453&longitude=105.9122&current=temperature`
  );
  return response.data.current.temperature;
};

// Authentication
export const loginRequest = async (params) => {
  try {
    const response = await Api.postRequest("/login", params);
    return response;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    } else if (
      error.response &&
      error.response.data &&
      error.response.data.message
    ) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
};

export const logoutRequest = () => {
  return Api.postRequest("/logout");
};
export const signupRequest = (params) => {
  return Api.postRequest("/signup", params);
};

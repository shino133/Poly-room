import * as Api from "./services/api/ApiByAxios";

// Get Data
export const getRoomData = () => {
  return Api.getRequest("/room");
};
export const getDashboardData = () => {
  return Api.getRequest("/dashboard");
};
export const getUserData = () => {
  return Api.getRequest("/user");
};
export const getMyData = () => {
  return Api.getRequest("/me");
};

// Authentication
export const loginRequest = (params) => {
  return Api.postRequest("/login", params);
};
export const logoutRequest = () => {
  return Api.getRequest("/logout");
};
export const signupRequest = (params) => {
  return Api.postRequest("/signup", params);
};

import * as Api from "./services/api/ApiByAxios";

// Get Data
export const getRoomData = () => Api.getRequest("/room");
export const getDashboardData = () => Api.getRequest("/dashboard");
export const getUserData = () => Api.getRequest("/user");
export const getMyData = () => Api.getRequest("/me");

// Authentication
export const login = (params) => Api.postRequest("/login", params);
export const logout = () => Api.getRequest("/logout");
export const signup = (params) => Api.postRequest("/signup", params);

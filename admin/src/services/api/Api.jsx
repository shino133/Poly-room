import * as Api from './ApiByAxios';

// Get Data
export const getSurveyData = (role) => Api.getRequest(role, "/survey");
export const getDashboardData = (role) => Api.getRequest(role, "/dashboard");
export const getUserData = (role) => Api.getRequest(role, "/user");
export const getMyData = (role) => Api.getRequest(role, "/me");

// Authentication
export const login = (role, data) => Api.postRequest(role, "/login", data);
export const logout = (role) => Api.getRequest(role, "/logout");
// export const signup = (role, data) => Api.postRequest(role, "/signup", data);
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


// postRequest
export const bookingRequest=(params)=>{
  return Api.postRequest("/booking", params);
}





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

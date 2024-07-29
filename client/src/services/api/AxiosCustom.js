import axios from "axios";

// Hàm tạo một instance của axios với cấu hình tùy chỉnh
const role = import.meta.env.VITE_API_ROLE || "";
const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/${role}`,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("TOKEN") || "";
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    error.response
      ? console.error("API Error:", error.response)
      : console.error("Unknown Error:", error);

    if (error.response && error.response.status === 401) {
      //WHEN: ERROR 401 (Unauthorized)
      localStorage.removeItem("TOKEN");
      window.location.reload();
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

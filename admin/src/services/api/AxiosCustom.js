import axios from "axios";

// Hàm tạo một instance của axios với cấu hình tùy chỉnh
const axiosInstance = () => {
  const role = import.meta.env.VITE_API_ROLE || "";
  const instance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/${role}`,
  });

  // Request: thêm token vào header
  const requestInterceptor = async (config) => {
    const token = localStorage.getItem("TOKEN");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  };

  // Response: xử lý response thành công
  const responseInterceptor = async (response) => {
    return response;
  };

  // Response: debug
  const errorInterceptor = async (error) => {
    if (error.response && error.response.status === 401) {
      //WHEN: ERROR 401 (Unauthorized)
      localStorage.removeItem("TOKEN");
      window.location.reload();
    } else {
      console.error("API Error:", error);
    }
    return Promise.reject(error);
  };

  // Interceptor
  instance.interceptors.request.use(requestInterceptor);
  instance.interceptors.response.use(responseInterceptor, errorInterceptor);

  return instance;
};

export default axiosInstance;
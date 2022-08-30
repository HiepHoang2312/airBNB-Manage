import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://airbnb.cybersoft.edu.vn/api",
  headers: {
    tokenByClass:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJGcm9udCBFbmQgNzEiLCJIZXRIYW5TdHJpbmciOiIyOS8xMi8yMDIyIiwiSGV0SGFuVGltZSI6IjE2NzIyNzIwMDAwMDAiLCJuYmYiOjE2NDU5ODEyMDAsImV4cCI6MTY3MjQxOTYwMH0.SZe3CJl1OkNH-0zfzqOV0CSC8WZ6q2hw64UykpCytT0",
  },
});
axiosClient.interceptors.request.use((config) => {
  //config là nội dung của request
  // ta có thể thay đổi nội dung của request trước khi  nó đc gửi lên server
  if (config.headers) {
    const accessToken = localStorage.getItem(`token`);
    if (accessToken) {
      config.headers.token = `${accessToken}`;
    }
  }
  return config;
});
axiosClient.interceptors.response.use(
  (reponse) => {
    return reponse.data;
  },
  (error) => {
    return error.response.data;
  },
);
export default axiosClient;

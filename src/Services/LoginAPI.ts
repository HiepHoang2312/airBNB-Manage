import { LoginValues, LoginResult } from "Interface/login";
import axiosClient from "./axiosClient";

const LoginAPI = {
  LoginAction: (values: LoginValues) => {
    return axiosClient.post<LoginResult>("auth/login", values);
  },
};

export default LoginAPI;

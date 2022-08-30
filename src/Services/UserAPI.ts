import { User, UserInfo } from "Interface/user";
import axiosClient from "./axiosClient";

const UserAPI = {
  getUserList: () => {
    return axiosClient.get<User[]>(`users/pagination`);
  },
  getUserDetail: (id: string) => {
    return axiosClient.get<UserInfo>(`users/${id}`);
  },
  addUser: (data: User) => {
    return axiosClient.post(`users`, data);
  },
  deleteUser: (id: string) => {
    return axiosClient.delete(`users/${id}`);
  },
  updateUser: (data: User) => {
    return axiosClient.put(`users/${data?._id}`, data);
  },
  editImageUser: (data: User) => {
    const formData = new FormData();
    let blob = new Blob([data.avatar[0].originFileObj], {
      type: "image/jpg",
    });
    formData.append("avatar", blob, data.avatar[0].originFileObj.name);
    return axiosClient.post(`users/upload-avatar`, formData);
  },
};

export default UserAPI;

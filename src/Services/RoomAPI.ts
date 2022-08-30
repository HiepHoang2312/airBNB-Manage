import { Room, RoomDetail } from "Interface/room";

import axiosClient from "./axiosClient";

const RoomAPI = {
  getRoomList: (id: string) => {
    return axiosClient.get<Room[]>(`rooms?locationId=${id}`);
  },
  getRoomDetail: (id: string) => {
    return axiosClient.get<RoomDetail>(`rooms/${id}`);
  },
  addRoom: (data: Room) => {
    return axiosClient.post(`rooms`, data);
  },
  editRoom: (data: Room) => {
    return axiosClient.put(`rooms/${data?._id}`, data);
  },
  deleteRoom: (id: string) => {
    return axiosClient.delete(`rooms/${id}`);
  },
  editImageRoom: (data: Room) => {
    const formData = new FormData();
    let blob = new Blob([data.image[0].originFileObj], {
      type: "image/jpg",
    });
    formData.append("room", blob, data.image[0].originFileObj.name);
    return axiosClient.post(`rooms/upload-image/${data?._id}`, formData);
  },
};

export default RoomAPI;

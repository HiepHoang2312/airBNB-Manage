import { Location } from "Interface/location";
import axiosClient from "./axiosClient";

const LocationAPI = {
  getLocationList: () => {
    return axiosClient.get<Location[]>(`locations`);
  },
  addLocation: (data: Location) => {
    return axiosClient.post(`locations`, data);
  },
  deleteLocation: (id: string) => {
    return axiosClient.delete(`locations/${id}`);
  },
  updateLocation: (data: Location) => {
    return axiosClient.put(`locations/${data?._id}`, data);
  },
  editImageLocation: (data: Location) => {
    const formData = new FormData();
    let blob = new Blob([data.image[0].originFileObj], {
      type: "image/jpg",
    });
    formData.append("location", blob, data.image[0].originFileObj.name);
    return axiosClient.post(`locations/upload-images/${data?._id}`, formData);
  },
};

export default LocationAPI;

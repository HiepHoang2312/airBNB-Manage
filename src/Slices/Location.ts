import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Location } from "Interface/location";
import LocationAPI from "Services/LocationAPI";
interface State {
  locations: Location[];
  isloading: boolean;
  error?: string | null;
}
const initialState: State = {
  locations: [],
  isloading: false,
  error: null,
};
export const getLocationList = createAsyncThunk(
  "location/getLocationList",
  async () => {
    try {
      const data = await LocationAPI.getLocationList();
      return data;
    } catch (error) {
      throw error;
    }
  },
);
export const updateLocation = createAsyncThunk(
  "location/updateLocation",
  async (data: Location) => {
    try {
      const result = await LocationAPI.updateLocation(data);
      return result;
    } catch (error) {
      throw error;
    }
  },
);
export const addLocation = createAsyncThunk(
  "location/addLocation",
  async (data: Location) => {
    try {
      const result = await LocationAPI.addLocation(data);
      return result;
    } catch (error) {
      throw error;
    }
  },
);
export const editImageLocation = createAsyncThunk(
  "location/editImageLocation",
  async (data: Location) => {
    try {
      const result = await LocationAPI.editImageLocation(data);
      return result;
    } catch (error) {
      throw error;
    }
  },
);
export const deleteLocation = createAsyncThunk(
  "location/deleteLocation",
  async (id: string) => {
    try {
      const result = await LocationAPI.deleteLocation(id);

      return result;
    } catch (error) {
      throw error;
    }
  },
);
const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /* getLocationList */
    builder.addCase(getLocationList.pending, (state) => {
      state.isloading = true;
    });
    builder.addCase(getLocationList.fulfilled, (state, { payload }) => {
      state.isloading = false;
      state.locations = payload;
    });
    builder.addCase(getLocationList.rejected, (state, { error }) => {
      state.isloading = true;
      state.error = error.message;
    });
    /* end getLocationList */
  },
});
export default locationSlice.reducer;

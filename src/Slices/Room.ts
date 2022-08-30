import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Room, RoomDetail } from "Interface/room";
import RoomAPI from "Services/RoomAPI";
interface State {
  roomsbyLocation: Room[];
  roomDetail: RoomDetail | null;
  rooms: Room[];
  isloading: boolean;
  error?: string | null;
}
const initialState: State = {
  roomsbyLocation: [],
  roomDetail: null,
  rooms: [],
  isloading: false,
  error: null,
};
export const getRoomList = createAsyncThunk(
  "room/getRoomList",
  async (id: string) => {
    try {
      const data = await RoomAPI.getRoomList(id);
      return data;
    } catch (error) {
      throw error;
    }
  },
);
export const getRoomDetail = createAsyncThunk(
  "room/getRoomDetail",
  async (id: string) => {
    try {
      const data = await RoomAPI.getRoomDetail(id);
      return data;
    } catch (error) {
      throw error;
    }
  },
);
export const getRoomListbyLocation = createAsyncThunk(
  "room/getRoomListbyLocation",
  async (id: string) => {
    try {
      const data = await RoomAPI.getRoomList(id);
      return data;
    } catch (error) {
      throw error;
    }
  },
);
export const deleteRoom = createAsyncThunk(
  "room/deleteRoom",
  async (id: string) => {
    try {
      const result = await RoomAPI.deleteRoom(id);

      return result;
    } catch (error) {
      throw error;
    }
  },
);
export const addRoom = createAsyncThunk("room/addRoom", async (data: Room) => {
  try {
    const result = await RoomAPI.addRoom(data);
    return result;
  } catch (error) {
    throw error;
  }
});
export const editImageRoom = createAsyncThunk(
  "room/editImageRoom",
  async (data: Room) => {
    try {
      const result = await RoomAPI.editImageRoom(data);
      return result;
    } catch (error) {
      throw error;
    }
  },
);
export const editRoom = createAsyncThunk(
  "room/editRoom",
  async (data: Room) => {
    try {
      const result = await RoomAPI.editRoom(data);
      return result;
    } catch (error) {
      throw error;
    }
  },
);
const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /* getRoomList */
    builder.addCase(getRoomList.pending, (state) => {
      state.isloading = true;
    });
    builder.addCase(getRoomList.fulfilled, (state, { payload }) => {
      state.isloading = false;
      state.rooms = payload;
    });
    builder.addCase(getRoomList.rejected, (state, { error }) => {
      state.isloading = true;
      state.error = error.message;
    });
    /* end getRoomList */
    /* getRoomListbyLocation */
    builder.addCase(getRoomListbyLocation.pending, (state) => {
      state.isloading = true;
    });
    builder.addCase(getRoomListbyLocation.fulfilled, (state, { payload }) => {
      state.isloading = false;
      state.roomsbyLocation = payload;
    });
    builder.addCase(getRoomListbyLocation.rejected, (state, { error }) => {
      state.isloading = true;
      state.error = error.message;
    });

    /* getRoomDetail */
    builder.addCase(getRoomDetail.pending, (state) => {
      state.isloading = true;
    });
    builder.addCase(getRoomDetail.fulfilled, (state, { payload }) => {
      state.isloading = false;
      state.roomDetail = payload;
    });
    builder.addCase(getRoomDetail.rejected, (state, { error }) => {
      state.isloading = true;
      state.error = error.message;
    });
    /* end getRoomDetail */
  },
});
export default roomSlice.reducer;

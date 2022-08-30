import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User, UserInfo } from "Interface/user";
import UserAPI from "Services/UserAPI";
interface State {
  users: User[];
  userDetail: UserInfo;
  isloading: boolean;
  error?: string | null;
}
const initialState: State = {
  users: [],
  userDetail: null || JSON.parse(localStorage.getItem("userdetail") as string),
  isloading: false,
  error: null,
};
export const getUserList = createAsyncThunk("user/getUserList", async () => {
  try {
    const data = await UserAPI.getUserList();
    return data;
  } catch (error) {
    throw error;
  }
});
export const getUserDetail = createAsyncThunk(
  "user/getUserDetail",
  async (id: string) => {
    try {
      const data = await UserAPI.getUserDetail(id);
      localStorage.setItem("userdetail", JSON.stringify(data));

      return data;
    } catch (error) {
      throw error;
    }
  },
);
export const addUser = createAsyncThunk("user/addUser", async (data: User) => {
  try {
    const result = await UserAPI.addUser(data);
    return result;
  } catch (error) {
    throw error;
  }
});
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id: string) => {
    try {
      const result = await UserAPI.deleteUser(id);

      return result;
    } catch (error) {
      throw error;
    }
  },
);
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (data: User) => {
    try {
      const result = await UserAPI.updateUser(data);
      return result;
    } catch (error) {
      throw error;
    }
  },
);
export const editImageUser = createAsyncThunk(
  "user/editImageUser",
  async (data: User) => {
    try {
      const result = await UserAPI.editImageUser(data);
      return result;
    } catch (error) {
      throw error;
    }
  },
);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /* getUserList */
    builder.addCase(getUserList.pending, (state) => {
      state.isloading = true;
    });
    builder.addCase(getUserList.fulfilled, (state, { payload }) => {
      state.isloading = false;
      state.users = payload;
    });
    builder.addCase(getUserList.rejected, (state, { error }) => {
      state.isloading = true;
      state.error = error.message;
    });
    /* end getUserList */
    /* getUserDetail */
    builder.addCase(getUserDetail.pending, (state) => {
      state.isloading = true;
    });
    builder.addCase(getUserDetail.fulfilled, (state, { payload }) => {
      state.isloading = false;
      state.userDetail = payload;
    });
    builder.addCase(getUserDetail.rejected, (state, { error }) => {
      state.isloading = true;
      state.error = error.message;
    });
    /* end getUserDetail */
  },
});
export default userSlice.reducer;

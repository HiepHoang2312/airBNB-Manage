import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginResult, LoginValues, UserValues } from "Interface/login";
import LoginAPI from "Services/LoginAPI";

interface State {
  loginresult: LoginResult[];
  user: UserValues | null;
  isloading: boolean;
  error?: string;
}
const initialState: State = {
  loginresult: [],
  user: null || JSON.parse(localStorage.getItem("user") as string),
  isloading: false,
  error: undefined,
};
export const LoginAction = createAsyncThunk(
  "auth/login",
  async (values: LoginValues) => {
    try {
      const data = await LoginAPI.LoginAction(values);

      return data;
    } catch (error) {
      throw error;
    }
  },
);
const LoginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(LoginAction.pending, (state) => {
      state.isloading = true;
    });
    builder.addCase(LoginAction.fulfilled, (state, { payload }) => {
      state.isloading = false;
      state.user = payload?.user;
    });
    builder.addCase(LoginAction.rejected, (state, { error }) => {
      state.isloading = false;
      state.error = error?.message;
    });
  },
});
export default LoginSlice.reducer;

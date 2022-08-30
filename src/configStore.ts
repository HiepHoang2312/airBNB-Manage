import { configureStore } from "@reduxjs/toolkit";
import locations from "Slices/Location";
import user from "Slices/User";
import room from "Slices/Room";
import login from "Slices/Login";
const store = configureStore({
  reducer: { user, locations, room, login },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

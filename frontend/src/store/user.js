import { createSlice } from "@reduxjs/toolkit";

import decodeToken from "../utils/jwtDecode";
const token = localStorage.getItem("token");

const initialState = {
  username: token ? decodeToken(token).name : "",
  role: token ? decodeToken(token).role : "",
  active: token ? decodeToken(token).active : false,
};

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    // action => actionHandler

    userLoggedIn: (user, action) => {
      const { username, active } = action.payload;
      user.username = username;
      user.active = active;
    },

    userRegistered: (user, action) => {
      const { username, role } = action.payload;
      user.username = username;
      user.role = role;
    },
    userLoggedOut: (user) => {
      localStorage.removeItem("token");

      user.username = "";
      user.role = "";
      user.active = false;
    },
  },
});

export const { userLoggedIn, userRegistered, userLoggedOut } =
  userSlice.actions;
export default userSlice.reducer;

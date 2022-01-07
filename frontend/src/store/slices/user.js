import { createSlice } from "@reduxjs/toolkit";

import decodeToken from "../../utils/jwtDecode";
const token = localStorage.getItem("token");

const initialState = {
  username: token ? decodeToken(token).name : "",
  role: token ? decodeToken(token).role : "",
};

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    // action => actionHandler

    userLoggedIn: (user, action) => {
      const { username, role } = action.payload;
      user.username = username;
      user.role = role;
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
    },
  },
});

export const { userLoggedIn, userRegistered, userLoggedOut } =
  userSlice.actions;
export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

import decodeToken from "../../utils/jwtDecode";
const token = localStorage.getItem("token");

const initialState = {
  username: token ? decodeToken(token).name : "",
  role: token ? decodeToken(token).role : "",
  userEmail: "",
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

    // userRegistered: (user, action) => {
    //   const { username, role } = action.payload;
    //   user.username = username;
    //   user.role = role;
    // },

    userLoggedOut: (user) => {
      localStorage.removeItem("token");
      user.username = "";
      user.role = "";
      user.userEmail = "";
    },

    userGotProfileInfo: (user, action) => {
      user.userEmail = action.payload.email;
    },
  },
});

export const { userLoggedIn, userLoggedOut, userGotProfileInfo } =
  userSlice.actions;
export default userSlice.reducer;

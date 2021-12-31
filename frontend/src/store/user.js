import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: '',
  role: '',
  active: false,
};

const userSlice = createSlice({
  name: 'user',
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
    }
  }
});

export const { userLoggedIn } = userSlice.actions;
export default userSlice.reducer;
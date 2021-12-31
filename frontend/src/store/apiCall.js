import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  callBegin: false,
  callSuccess: null,
  callFail: null,
  message: "",
};

const apiCallSlice = createSlice({
  name: 'apiCall',
  initialState,
  reducers: {
    callBegin: (state) => {
      state.callBegin = true;
    },
    callSuccess: (state, action) => {
      state.callBegin = false;
      state.callSuccess = true;
      // state.message = action.payload.message;
    },
    callFailed: (state, action) => {
      state.callBegin = false;
      state.callFail = true;
      state.message = action.payload;
    },
    reset: (state) => {
      state = initialState;
    }
  }
});

export const { callBegin, callSuccess, callFailed } = apiCallSlice.actions;
export default apiCallSlice.reducer;
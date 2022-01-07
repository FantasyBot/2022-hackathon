import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allHotels: [],
  myHotels: [],
};

const hotels = createSlice({
  name: "hotels",
  initialState,
  reducers: {
    fetchedAllHotels: (hotels, action) => {
      hotels.allHotels = action.payload.allHotels;
    },
    fetchedMyHotels: (hotels, action) => {
      hotels.myHotels = action.payload.myHotels;
    },
    resetHotelsState: (state) => {
      // state.allHotels = [];
      state.myHotels = [];
    },
  },
});

export const { fetchedAllHotels, fetchedMyHotels, resetHotelsState } =
  hotels.actions;
export default hotels.reducer;

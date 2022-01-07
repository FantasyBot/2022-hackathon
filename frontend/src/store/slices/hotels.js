import { createSlice } from "@reduxjs/toolkit";

const hotels = createSlice({
  name: "hotels",
  initialState: {
    allHotels: [],
    myHotels: [],
  },

  reducers: {
    fetchedAllHotels: (hotels, action) => {
      hotels.allHotels = action.payload.allHotels;
    },
    fetchedMyHotels: (hotels, action) => {
      hotels.myHotels = action.payload.myHotels;
    },
  },
});

export const { fetchedAllHotels, fetchedMyHotels } = hotels.actions;
export default hotels.reducer;

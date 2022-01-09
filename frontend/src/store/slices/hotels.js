import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allHotels: {
    fetched: false,
    newHotel: false,
    results: [],
  },
  myHotels: {
    fetched: false,
    results: [],
  },
};

const hotels = createSlice({
  name: "hotels",
  initialState,
  reducers: {
    fetchedAllHotels: (hotels, action) => {
      hotels.allHotels.results = action.payload.allHotels;
      hotels.allHotels.fetched = true;
      hotels.allHotels.newHotel = false;
    },
    fetchedMyHotels: (hotels, action) => {
      hotels.myHotels.results = action.payload.myHotels;
      hotels.myHotels.fetched = true;
    },
    addedNewHotel: (hotels) => {
      hotels.allHotels.newHotel = true;
    },
    resetHotelsState: (state) => {
      state.allHotels = { ...initialState.allHotels };
      state.myHotels = { ...initialState.myHotels };
    },
  },
});

export const { fetchedAllHotels, fetchedMyHotels, resetHotelsState } =
  hotels.actions;
export default hotels.reducer;

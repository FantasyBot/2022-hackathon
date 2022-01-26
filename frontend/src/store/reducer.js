import { combineReducers } from "@reduxjs/toolkit";

import userReducer from "./slices/user";
import apiCallReducer from "./slices/apiCall";
import hotelsReducer from "./slices/hotels";
import mapReducer from "./slices/map";

export default combineReducers({
  user: userReducer,
  apiCall: apiCallReducer,
  hotels: hotelsReducer,
  map: mapReducer,
});

import { combineReducers } from "@reduxjs/toolkit";

import userReducer from "./slices/user";
import apiCallReducer from "./slices/apiCall";
import hotelsReducer from "./slices/hotels";

export default combineReducers({
  user: userReducer,
  apiCall: apiCallReducer,
  hotels: hotelsReducer,
});

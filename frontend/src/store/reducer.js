import { combineReducers } from "@reduxjs/toolkit";
import userReducer from './user';
import apiCallReducer from './apiCall';

export default combineReducers({
  user: userReducer,
  apiCall: apiCallReducer,
})
import axios from 'axios';

import { callBegin, callSuccess, callFailed } from "../apiCall";
// import { userLoggedIn } from '../user';

export const loginAction = (email, password) => async (dispatch) => {

  dispatch(callBegin());

  try {
    const { data } = await axios.post("/api/user/login", { email, password });

    console.log('data', data);
    // dispatch(userLoggedIn({ payload: { username: , role: } }));
    dispatch(callSuccess());
    localStorage.setItem("token", JSON.stringify(data.token));

  } catch (error) {
    console.log(error.response.data.message);
    dispatch(callFailed(error.response.data.message ? error.response.data.message : error.message));
  }
};
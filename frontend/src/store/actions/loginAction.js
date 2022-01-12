import axios from "axios";
import decodeToken from "../../utils/jwtDecode";

import { callBegin, callSuccess, callFailed } from "../slices/apiCall";
import { userLoggedIn } from "../slices/user";
// import { userLoggedIn } from '../user';

export const loginAction =
  (method, url, enteredData, headers) => async (dispatch) => {
    dispatch(callBegin());
    try {
      const { data } = await axios({
        method,
        url,
        data: enteredData,
        headers,
      });

      // const { data } = await axios.post(url, { ...enteredData });
      console.log("data", data);

      const decodedToken = decodeToken(data.token);
      console.log("decodedToken", decodedToken);
      const { name, role } = decodedToken;

      dispatch(callSuccess({ message: "Successful!" }));
      dispatch(userLoggedIn({ username: name, role }));

      localStorage.setItem("token", JSON.stringify(data.token));
    } catch (error) {
      // console.log(error.response.data.message);
      dispatch(
        callFailed(
          error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };

export const registerHotel =
  (method, url, enteredData, headers) => async (dispatch) => {
    dispatch(callBegin());
    try {
      const { data } = await axios({
        method,
        url,
        data: enteredData,
        headers,
      });
      dispatch(callSuccess({ message: data.message }));
    } catch (error) {
      dispatch(
        callFailed(
          error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };

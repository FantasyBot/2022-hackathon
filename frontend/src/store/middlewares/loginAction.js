import axios from "axios";
import decodeToken from "../../utils/jwtDecode";

import { callBegin, callSuccess, callFailed } from "../apiCall";
import { userLoggedIn } from "../user";
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

      dispatch(userLoggedIn({ username: name, role }));
      dispatch(callSuccess());

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

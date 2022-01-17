import axios from "axios";
import decodeToken from "../../utils/jwtDecode";

import { callBegin, callSuccess, callFailed } from "../slices/apiCall";
import { userLoggedIn } from "../slices/user";

export const entryUser =
  (method, url, enteredData, headers) => async (dispatch) => {
    dispatch(callBegin());

    try {
      const { data } = await axios({
        method,
        url,
        data: enteredData,
        ...(headers && { headers }),
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
      dispatch(
        callFailed(
          error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };

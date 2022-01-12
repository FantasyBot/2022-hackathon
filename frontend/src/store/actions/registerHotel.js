import axios from "axios";

import { callBegin, callSuccess, callFailed } from "../slices/apiCall";

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

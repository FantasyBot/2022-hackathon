import axios from "axios";
import { callBegin, callFailed, callSuccess } from "../slices/apiCall";
import { fetchedAllHotels, fetchedMyHotels } from "../slices/hotels";

// /api/user/allhotels

export const fetchAllHotels = () => async (dispatch) => {
  callBegin();
  try {
    const { data } = await axios.get("/api/user/allhotels");
    dispatch(fetchedAllHotels({ allHotels: data.allHotels }));
    dispatch(callSuccess({ message: "Successfully fetched data!" }));
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

// /api/user/myhotels

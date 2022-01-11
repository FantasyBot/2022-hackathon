import axios from "axios";
import { callBegin, callFailed, callSuccess } from "../slices/apiCall";
import { fetchedAllHotels, fetchedMyHotels } from "../slices/hotels";

// /api/user/allhotels

export const fetchAllHotels = () => async (dispatch) => {
  dispatch(callBegin());
  try {
    const { data } = await axios.get("/api/product/allhotels");
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

export const fetchMyHotels = () => async (dispatch) => {
  dispatch(callBegin());
  try {
    const { data } = await axios({
      method: "GET",
      url: "/api/product/myhotels",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    console.log("data", data);
    dispatch(fetchedMyHotels({ myHotels: data.hotels }));
    dispatch(callSuccess({ Message: "Successfully fetched data!" }));
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

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchAllHotels } from "../store/actions/fetchHotels";
import { fetchMyHotels } from "../store/actions/fetchHotels";

export const useFetchAllHotels = () => {
  const dispatch = useDispatch();

  const {
    allHotels: { fetched, newHotel, results },
  } = useSelector((state) => state.hotels);

  const { callBegin } = useSelector((state) => state.apiCall);

  useEffect(() => {
    console.log("HomePage effect");

    if (!fetched || (fetched && newHotel)) {
      console.log(
        "fetched ->",
        fetched,
        "newHotel ->",
        newHotel,
        "So fetch will start!"
      );
      dispatch(fetchAllHotels());
    } else {
      console.log(
        "fetched ->",
        fetched,
        "newHotel ->",
        newHotel,
        "So fetch won't happen! X"
      );
    }
  }, [dispatch, fetched, newHotel]);

  return { results, callBegin };
};

export const useFetchMyHotels = () => {
  const { username } = useSelector((state) => state.user);
  const { callBegin } = useSelector((state) => state.apiCall);

  const {
    myHotels: { fetched, results },
  } = useSelector((state) => state.hotels);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("MyHotels effect");
    if (username && !fetched) {
      console.log(`fetched is ${fetched} so we WILL START fetching MyhHotels!`);
      dispatch(fetchMyHotels());
    } else {
      console.log(
        `fetched is ${fetched} or user was not signed in, so we WON'T start fetching MyhHotels!`
      );
    }
  }, [dispatch, fetched, username]);

  return {
    callBegin,
    username,
    results,
  };
};

import { useState, createRef } from "react";
import { useDispatch } from "react-redux";

import { gotNewCoordinates } from "../store/slices/map";

const useAutocomplete = () => {
  const [autoComplete, setAutoComplete] = useState(null);
  const dispatch = useDispatch();

  const searchRef = createRef();
  const onLoad = (autoC) => setAutoComplete(autoC);
  console.log({ autoComplete });

  const onPlaceChanged = () => {
    const lat = autoComplete.getPlace().geometry.location.lat();
    const lng = autoComplete.getPlace().geometry.location.lng();

    const splitedAddress = searchRef.current.value.split(", ");
    const city = splitedAddress[splitedAddress.length - 2];
    console.log({ city });

    dispatch(gotNewCoordinates({ city, lat, lng }));
  };

  return {
    onLoad,
    onPlaceChanged,
    searchRef,
  };
};

export default useAutocomplete;

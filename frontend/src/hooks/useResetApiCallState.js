import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { resetApiCallState } from "../store/slices/apiCall";

const useResetApiCallState = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      console.log("Cleanup useResetApiCallState");
      dispatch(resetApiCallState());
    };
  }, [dispatch]);
};

export default useResetApiCallState;

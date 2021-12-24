import axios from "axios";
import { useState, useContext } from "react";
import { MyContext } from "../context/context";

const useHttp = () => {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { token, setTokenHandler } = useContext(MyContext);

  const asyncFunc = async (url, method, enteredData) => {
    setIsLoading(true);
    try {
      const { data } = await axios.request({
        baseURL: "/api",
        url,
        method,
        data: enteredData,
      });
      // const { data } = await axios.post(url, enteredData);

      setIsLoading(false);
      setTokenHandler(data.token);

      localStorage.setItem("token", JSON.stringify(data.token));
    } catch (error) {
      setMessage(error.message);
      setIsLoading(false);
    }
  };

  return {
    token,
    enteredUsername,
    enteredPassword,
    confirmPassword,
    message,
    isLoading,
    asyncFunc,
    setMessage,
    setEnteredUsername,
    setEnteredPassword,
    setConfirmPassword,
  };
};

export default useHttp;
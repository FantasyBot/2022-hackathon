import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { entryUser } from "../store/actions/entryUsers";
import { resetApiCallState } from "../store/slices/apiCall";

const isEmpty = (string) => string.trim() === "";

const useRegisterOrEdit = (condition = "register") => {
  const { username, userEmail } = useSelector((state) => state.user);
  const { callBegin, message } = useSelector((state) => state.apiCall);

  const dispatch = useDispatch();

  const [fullname, setFullname] = useState(
    condition === "register" ? "" : username
  );

  // console.log(user.name);
  const [email, setEmail] = useState(condition === "register" ? "" : userEmail);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [warningMessage, setWarningMessage] = useState("");

  useEffect(() => {
    if (userEmail) {
      console.log("registerOrEditUser effect");
      setEmail(userEmail);
    }
  }, [userEmail]);

  useEffect(() => {
    console.log("Clean up registerOrEditUser custom hook");
    return () => dispatch(resetApiCallState());
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    setWarningMessage("");

    if (password !== confirmPassword) {
      setWarningMessage("Passwords do not match!");
      return;
    }

    const enteredFullnameIsValid = !isEmpty(fullname);
    const enteredEmailIsValid = !isEmpty(email);
    const enteredPasswordIsValid = !isEmpty(password);
    const enteredConfirmPasswordIsValid = !isEmpty(confirmPassword);

    const formIsValid =
      enteredFullnameIsValid &&
      enteredEmailIsValid &&
      enteredPasswordIsValid &&
      enteredConfirmPasswordIsValid &&
      password === confirmPassword;

    if (!formIsValid) {
      setWarningMessage(
        "Your username, password or email fields must not be empty!"
      );
      return;
    }

    const method = condition === "register" ? "POST" : "PUT";
    const url = `/api/user/${
      condition === "register" ? "register" : "profile"
    }`;

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    };

    dispatch(entryUser(method, url, { fullname, password, email }, headers));
  };

  return {
    fullname,
    email,
    password,
    confirmPassword,
    warningMessage,
    callBegin,
    message,

    username,

    setFullname,
    setEmail,
    setPassword,
    setConfirmPassword,
    setWarningMessage,
    submitHandler,
  };
};

export default useRegisterOrEdit;

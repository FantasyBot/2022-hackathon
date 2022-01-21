import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { entryUser } from "../store/actions/entryUsers";

const useOperatorData = () => {
  const [warningMessage, setWarningMessage] = useState("");
  const [disable, setDisable] = useState(false);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [objectUrls, setObjectUrls] = useState([]);
  const [filesBase64Strings, setFilesBase64Strings] = useState([]);

  const dispatch = useDispatch();

  const { callBegin, message } = useSelector((state) => state.apiCall);
  const { username } = useSelector((state) => state.user);

  const handleChange = async (e) => {
    setWarningMessage("");

    console.log(e.target.files.length);
    console.log("objectUrls", objectUrls);

    setObjectUrls([]);

    if (e.target.files.length !== 2) {
      setFilesBase64Strings([]);
      setWarningMessage("You must upload 2 pictures!");
      return;
    }

    try {
      const firstPic = e.target.files[0];
      const secondPic = e.target.files[1];

      const stringsArray = await Promise.all([
        convertToBase64(firstPic),
        convertToBase64(secondPic),
      ]);

      const readyStrings = stringsArray.map((string) => string.split(",")[1]);
      console.log({ readyStrings });
      setFilesBase64Strings(readyStrings);
      setObjectUrls(
        [...e.target.files].map((file) => URL.createObjectURL(file))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (filesBase64Strings.length !== 2) {
      setWarningMessage("You must upload 2 pictures!");
      return;
    }

    const firstString = filesBase64Strings[0];
    const secondString = filesBase64Strings[1];

    if (firstString === secondString) {
      setWarningMessage("Images must be different");
      return;
    }

    setWarningMessage("");
    dispatch(
      entryUser("POST", "/api/user/register/operator", {
        name: fullname,
        password,
        email,
        filename1: firstString,
        filename2: secondString,
      })
    );
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return {
    warningMessage,
    disable,
    fullname,
    email,
    password,
    objectUrls,
    filesBase64Strings,

    setFullname,
    setEmail,
    setPassword,

    handleChange,
    handleSubmit,

    callBegin,
    message,
    username,
  };
};

export default useOperatorData;

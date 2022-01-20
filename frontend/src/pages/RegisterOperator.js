import { useState } from "react";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";

import { Form, Image } from "react-bootstrap";
import { Navigate } from "react-router-dom";

import { entryUser } from "../store/actions/entryUsers";
import CustomBlockButton from "../components/UI/CustomBlockButton";

import FormContainer from "../components/FormContainer";
import Message from "../components/Message";

const RegisterOperator = () => {
  const [warningMessage, setWarningMessage] = useState("");
  const [disable, setDisable] = useState(false);

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const [token, setToken] = useState("");
  const [objectUrls, setObjectUrls] = useState([]);

  const [filesBase64Strings, setFilesBase64Strings] = useState([]);

  const dispatch = useDispatch();

  const { callBegin, message } = useSelector((state) => state.apiCall);

  const { username } = useSelector((state) => state.user);

  if (username) return <Navigate replace to="/" />;

  // const checkInputOnChange = (e) => {
  //   if (e.target.files.length !== 2) {
  //     setDisable(true);
  //     setWarningMessage("Please upload two images");
  //   } else {
  //     setObjectUrls([...e.target.files].map((o) => URL.createObjectURL(o)));
  //     setDisable(false);
  //     setWarningMessage("");
  //     setFiles(e.target.files);
  //   }
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   let bodyFormData = new FormData();

  //   for (let i = 0; i < files.length; i++) {
  //     bodyFormData.append("images", files[i]);
  //   }
  //   bodyFormData.append("name", fullname);
  //   bodyFormData.append("password", password);
  //   bodyFormData.append("email", email);

  //   dispatch(
  //     entryUser("POST", "/api/user/register/operator", bodyFormData, {
  //       "Content-Type": "multipart/form-data",
  //     })
  //   );
  // };

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
    axios
      .post("/api/user/register/operator", {
        name: fullname,
        password,
        email,
        filename1: firstString,
        filename2: secondString,
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
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

  const handleChange = async (e) => {
    if (e.target.files.length !== 2) return;
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

  const alert =
    warningMessage || message ? (
      <Message variant="danger">{warningMessage || message}</Message>
    ) : null;

  const form = (
    <Form onSubmit={handleSubmit}>
      <h4>Register operator</h4>

      {alert}
      <Form.Group className="mb-3" controlId="userName">
        <Form.Label>Fullname</Form.Label>
        <Form.Control
          type="text"
          required
          name="name"
          placeholder="Enter your fullname as in personal ID"
          onChange={(e) => setFullname(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          required
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          required
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formFileMultiple" className="mb-3">
        <Form.Label>
          Take photos of your id (both sides) and upload here
        </Form.Label>
        {/* <Form.Control
          type="file"
          name="images"
          accept=".jpeg, .jpg, .png, .gif"
          multiple
          required
          onChange={checkInputOnChange}
        /> */}
        <Form.Control
          type="file"
          name="image1"
          accept=".jpeg, .jpg, .png"
          required
          multiple
          onChange={handleChange}
        />
        <div className="my-2 d-flex gap-2">
          {objectUrls.map((url) => (
            <div style={{ width: "50%" }} key={url}>
              <Image
                rounded
                style={{ width: "100%", height: "100%" }}
                src={url}
                alt={url}
              />
            </div>
          ))}
        </div>
      </Form.Group>

      <CustomBlockButton
        type="submit"
        disabled={callBegin || disable}
        showSpinner={callBegin}
        loadingText="Loading..."
        defaultText="Submit"
      />
    </Form>
  );

  return <FormContainer>{form}</FormContainer>;
};

export default RegisterOperator;

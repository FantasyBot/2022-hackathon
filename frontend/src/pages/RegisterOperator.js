import { useState } from "react";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";

import { Form, Image, Button, Spinner } from "react-bootstrap";
import { Navigate } from "react-router-dom";

import { entryUser } from "../store/actions/entryUsers";

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

  const [fileBase64String1, setFileBase64String1] = useState("");
  const [fileBase64String2, setFileBase64String2] = useState("");

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
    if (fileBase64String1 === fileBase64String2) {
      setWarningMessage("Images must be different");
    } else {
      setWarningMessage("");

      //გადააკეთე მერე...
      axios
        .post("/api/user/register/operator", {
          name: fullname,
          password,
          email,
          filename1: fileBase64String1,
          filename2: fileBase64String2,
        })
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
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
  const handleChange1 = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setFileBase64String1(base64.split(",")[1]);
  };

  const handleChange2 = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setFileBase64String2(base64.split(",")[1]);
  };

  // console.log(fileBase64String1);
  // console.log("+++++++++++");
  // console.log(fileBase64String2);

  const submitButton = (
    <div className="d-grid gap-2 mb-4">
      <Button variant="primary" disabled={callBegin || disable} type="submit">
        {callBegin && (
          <Spinner
            as="span"
            variant="light"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        )}
        {callBegin ? " Loading..." : " Submit"}
      </Button>
    </div>
  );

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
          onChange={(e) => handleChange1(e)}
        />
        <Form.Control
          type="file"
          name="image2"
          accept=".jpeg, .jpg, .png"
          required
          onChange={(e) => handleChange2(e)}
        />
        {/* <div className="my-2 d-flex gap-2">
          {objectUrls.map((url) => (
            <div key={url}>
              <Image
                rounded
                style={{ width: "100%", height: "100%" }}
                src={url}
                alt={url}
              />
            </div>
          ))}
        </div> */}
      </Form.Group>

      {submitButton}
    </Form>
  );

  return <FormContainer>{form}</FormContainer>;
};

export default RegisterOperator;

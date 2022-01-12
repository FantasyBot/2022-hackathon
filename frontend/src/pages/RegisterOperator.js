import { useState } from "react";
// import axios from "axios";

import { useSelector, useDispatch } from "react-redux";

import { Form, Image, Button, Spinner } from "react-bootstrap";
import { Navigate } from "react-router-dom";

import { loginAction } from "../store/actions/loginAction";

import FormContainer from "../components/FormContainer";
import Message from "../components/Message";

const RegisterOperator = () => {
  const [warningMessage, setWarningMessage] = useState("");
  const [disable, setDisable] = useState(false);

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [files, setFiles] = useState(null);

  // const [token, setToken] = useState("");
  const [objectUrls, setObjectUrls] = useState([]);

  const dispatch = useDispatch();

  const { callBegin, message } = useSelector((state) => state.apiCall);

  const user = useSelector((state) => state.user);

  if (user.fullname) return <Navigate replace to="/" />;

  const checkInputOnChange = (e) => {
    if (e.target.files.length > 2 || e.target.files.length < 2) {
      setDisable(true);
      setWarningMessage("Please upload two images");
    } else {
      setObjectUrls([...e.target.files].map((o) => URL.createObjectURL(o)));
      setDisable(false);
      setWarningMessage("");
      setFiles(e.target.files);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let bodyFormData = new FormData();

    for (let i = 0; i < files.length; i++) {
      bodyFormData.append("images", files[i]);
    }
    bodyFormData.append("name", fullname);
    bodyFormData.append("password", password);
    bodyFormData.append("email", email);

    dispatch(
      loginAction("POST", "/api/user/register/operator", bodyFormData, {
        "Content-Type": "multipart/form-data",
      })
    );
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <h4>Register operator</h4>
        {(warningMessage || message) && (
          <Message variant="danger">{warningMessage || message}</Message>
        )}

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
          <Form.Control
            type="file"
            name="images"
            accept=".jpeg, .jpg, .png, .gif"
            multiple
            required
            onChange={checkInputOnChange}
          />
          <div className="my-2 d-flex gap-2">
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
          </div>
        </Form.Group>
        <div className="d-grid gap-2 mb-4">
          <Button
            variant="primary"
            disabled={callBegin || disable}
            type="submit"
          >
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

        {/* <input type="submit" value="Upload" disabled={disable} /> */}
      </Form>
    </FormContainer>
  );
};

export default RegisterOperator;

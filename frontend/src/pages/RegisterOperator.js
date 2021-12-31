import axios from "axios";
import { useState, useRef } from "react";

import { Form, Button, Spinner } from "react-bootstrap";
import { Navigate } from "react-router-dom";

import FormContainer from "../components/FormContainer";
import Message from "../components/Message";

const RegisterOperator = () => {
  const [message, setMessage] = useState("");
  const [disable, setDisable] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [files, setFiles] = useState(null);

  const checkInputOnChange = (e) => {
    if (e.target.files.length > 2 || e.target.files.length < 2) {
      setDisable(true);
      setMessage("Please upload two images");
    } else {
      setDisable(false);
      setMessage("");
      setFiles(e.target.files);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let bodyFormData = new FormData();

    for (let i = 0; i < files.length; i++) {
      bodyFormData.append("images", files[i]);
    }
    bodyFormData.append("name", username);
    bodyFormData.append("password", password);
    bodyFormData.append("email", email);

    axios({
      method: "post",
      url: "http://localhost:5000/api/user/register/operator",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        //handle success
        console.log(response.data);
      })
      .catch(function (response) {
        //handle error
        console.log("front ERR0R -->", response.message);
      });
  };

  return (
    <FormContainer>
      <Form
        onSubmit={handleSubmit}
        // action="/api/user/register/operator"
        // method="POST"
        // encType="multipart/form-data"
      >
        <h4>Register operator</h4>
        {message && <Message variant="danger">{message}</Message>}

        <Form.Group className="mb-3" controlId="userName">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            required
            name="name"
            placeholder="Enter name"
            onChange={(e) => setUsername(e.target.value)}
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

        <h5>Take photos of your id (both sides) and upload here</h5>
        <input
          type="file"
          name="images"
          // accept=".jpeg, .jpg, .png, .gif"
          multiple
          required
          onChange={(e) => checkInputOnChange(e)}
        />
        <br />
        <br />
        <input type="submit" value="Upload" disabled={disable} />
      </Form>
    </FormContainer>
  );
};

export default RegisterOperator;

import axios from "axios";
import { useState, useRef } from "react";

import { Form, Button, Spinner } from "react-bootstrap";
import { Navigate } from "react-router-dom";

import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
// import useHttp from "../hooks/useHttp";

const RegisterOperator = () => {
  const [message, setMessage] = useState("");
  const [disable, setDisable] = useState(false);

  const checkInputOnChange = (e) => {
    console.log(e.target.files.length);
    if (e.target.files.length > 2 || e.target.files.length < 2) {
      setDisable(true);
      setMessage("Please upload two images");
    } else {
      setDisable(false);
      setMessage("");
    }
  };
  return (
    <FormContainer>
      <Form
        action="/api/user/register/operator"
        method="POST"
        encType="multipart/form-data"
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
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            required
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            name="password"
            placeholder="Password"
          />
        </Form.Group>

        <h5>Take photos of your id (both sides) and upload here</h5>
        <input
          type="file"
          name="multiImages"
          accept=".jpeg, .jpg, .png, .gif"
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

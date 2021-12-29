import axios from "axios";
import { useState } from "react";

import { Form, Button, Spinner } from "react-bootstrap";
import { Navigate } from "react-router-dom";

import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
// import useHttp from "../hooks/useHttp";

const RegisterOperator = () => {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const {
  //   token,
  //   enteredUsername,
  //   enteredPassword,
  //   confirmPassword,
  //   message,
  //   isLoading,
  //   setMessage,
  //   asyncFunc,
  //   setEnteredUsername,
  //   setEnteredPassword,
  //   setConfirmPassword,
  // } = useHttp();

  // if (token) return <Navigate to="/products" />;

  const submitHandler = (e) => {
    e.preventDefault();

    const username = enteredUsername.trim();
    const password = enteredPassword.trim();
    const email = enteredEmail.trim();

    if (!username || !password || !email) {
      setMessage("Your name or password must not be empty!");
      return;
    }

    if (enteredPassword !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    const asyncFunc = async (url, method, enteredData) => {
      setIsLoading(true);
      try {
        const { data } = await axios.request({
          url,
          method,
          data: enteredData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        // const { data } = await axios.post(url, enteredData);

        setIsLoading(false);
        // setTokenHandler(data.token);

        localStorage.setItem("token", JSON.stringify(data.token));
      } catch (error) {
        setMessage(error.message);
        setIsLoading(false);
      }
    };

    asyncFunc("/upload", "POST", { username, password, email });
  };
  return (
    <FormContainer>
      <Form
        action="/api/user/register/operator"
        method="POST"
        encType="multipart/form-data"
      >
        <h4>Register operator</h4>

        <Form.Group className="mb-3" controlId="userName">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            required
            name="name"
            placeholder="Enter name"
            onChange={(e) => setEnteredUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            required
            placeholder="Enter email"
            onChange={(e) => setEnteredEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            name="password"
            placeholder="Password"
            onChange={(e) => setEnteredPassword(e.target.value)}
          />
        </Form.Group>

        <h5>Take photos of your id (both sides) and upload here</h5>
        <input
          type="file"
          name="multiImages"
          accept="image/*"
          multiple
          required
        />
        <br />
        <br />
        <input type="submit" value="Upload" />

        {/* <Button variant="primary" type="submit">
          Submit
        </Button> */}
      </Form>
    </FormContainer>
  );
};

export default RegisterOperator;

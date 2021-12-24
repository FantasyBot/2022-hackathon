import axios from 'axios';
import { useState } from 'react';

import { Form, Button, Spinner } from "react-bootstrap";
import { Navigate } from "react-router-dom";

import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
// import useHttp from "../hooks/useHttp";

const RegisterPage = () => {

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
          baseURL: "/api",
          url,
          method,
          data: enteredData,
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

    asyncFunc("/user/register", "POST", { username, password, email });
  };

  return (
    <FormContainer>
      <Form onSubmit={submitHandler}>
        <h4>Sign Up</h4>

        {isLoading && <Spinner animation="border" variant="warning" />}
        {message && <Message variant="danger">{message}</Message>}

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="email"
            value={enteredEmail}
            placeholder="Enter email"
            onChange={(e) => setEnteredEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="userName">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={enteredUsername}
            placeholder="Enter name"
            onChange={(e) => setEnteredUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={enteredPassword}
            placeholder="Password"
            onChange={(e) => setEnteredPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            value={confirmPassword}
            placeholder="Confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </FormContainer>
  );
};

export default RegisterPage;
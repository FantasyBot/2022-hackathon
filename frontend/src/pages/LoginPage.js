import { useState } from "react";
import axios from "axios";

import { Form, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
// import useHttp from "../hooks/useHttp";

const LoginPage = () => {
  // const {
  //   token,
  //   enteredUsername,
  //   enteredPassword,
  //   message,
  //   isLoading,
  //   setMessage,
  //   asyncFunc,
  //   setEnteredUsername,
  //   setEnteredPassword,
  // } = useHttp();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // if (token) return <Navigate to="/products" />;

  const submitHandler = (e) => {
    e.preventDefault();
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

        console.log("data", data);
        setMessage(data.message);
        localStorage.setItem("token", JSON.stringify(data.token));
      } catch (error) {
        setMessage(
          error.response.data.message
            ? error.response.data.message
            : error.message
        );
        setIsLoading(false);
      }
    };

    asyncFunc("/user/login", "POST", { email, password });
  };

  return (
    <FormContainer>
      <Form onSubmit={submitHandler}>
        <h3>Sign In</h3>
        {isLoading && <Spinner animation="border" variant="warning" />}
        {message && <Message variant="danger">{message}</Message>}

        <Form.Group className="mb-3" controlId="formBasicusername">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
        <p className="my-1">
          Do not have an account? <Link to="/register">Sign up</Link>
        </p>
      </Form>
    </FormContainer>
  );
};

export default LoginPage;

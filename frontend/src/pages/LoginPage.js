import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Form, Button, Spinner } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";

import { loginAction } from "../store/middlewares/loginAction";

import FormContainer from "../components/FormContainer";
import Message from "../components/Message";

// import useHttp from "../hooks/useHttp";

const LoginPage = () => {
  const dispatch = useDispatch();
  const { callBegin, message, callSuccess } = useSelector(
    (state) => state.apiCall
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (callSuccess) return <Navigate to="/" />;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(loginAction(email, password));
  };

  return (
    <FormContainer>
      <Form onSubmit={submitHandler}>
        <h3 className="text-center">Sign In</h3>
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
        <div className="d-grid gap-2 mb-4">
          <Button variant="primary" disabled={callBegin} type="submit">
            {callBegin && (
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            )}
            {callBegin ? " Loading..." : " Submit"}
          </Button>
        </div>

        <p className="my-1">
          Do not have an account? <Link to="/signup">Sign up</Link>
        </p>
      </Form>
    </FormContainer>
  );
};

export default LoginPage;

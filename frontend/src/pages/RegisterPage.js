import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Navigate } from "react-router-dom";

import { Form, Button, Spinner } from "react-bootstrap";

import { loginAction } from "../store/actions/loginAction";

import FormContainer from "../components/FormContainer";
import Message from "../components/Message";

const RegisterPage = () => {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [warningMessage, setWarningMessage] = useState("");

  const { callBegin, callSuccess, message } = useSelector(
    (state) => state.apiCall
  );

  const dispatch = useDispatch();

  const { username } = useSelector((state) => state.user);

  if (callSuccess || username) <Navigate replace to="/" />;

  const submitHandler = (e) => {
    e.preventDefault();

    const username = enteredUsername.trim();
    const password = enteredPassword.trim();
    const email = enteredEmail.trim();

    if (!username || !password || !email) {
      setWarningMessage(
        "Your username, password or email fields must not be empty!"
      );
      return;
    }

    if (enteredPassword !== confirmPassword) {
      setWarningMessage("Passwords do not match!");
      return;
    }

    dispatch(
      loginAction("POST", "/api/user/register", { username, password, email })
    );
  };

  return (
    <FormContainer>
      {console.log("RegisterPage rendering....")}
      <Form onSubmit={submitHandler}>
        <h4 className="text-center">Register</h4>

        {/* {isLoading && <Spinner animation="border" variant="warning" />} */}
        {(warningMessage || message) && (
          <Message variant="danger">{warningMessage || message}</Message>
        )}

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={enteredEmail}
            placeholder="Enter email"
            aria-describedby="email-help-text"
            onChange={(e) => setEnteredEmail(e.target.value)}
          />
          <Form.Text id="email-help-text" muted>
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
            aria-describedby="password-help-text"
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
        <div className="d-grid gap-2 mb-4">
          <Button variant="primary" disabled={callBegin} type="submit">
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
            {callBegin ? " Loading..." : " Register"}
          </Button>
        </div>
      </Form>
    </FormContainer>
  );
};

export default RegisterPage;

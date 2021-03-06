import { Navigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import useUserData from "../hooks/useUserData";

import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import CustomBlockButton from "../components/UI/CustomBlockButton";
// import useUserData from "../hooks/useUserData";

const RegisterPage = () => {
  const {
    fullname,
    email,
    password,
    confirmPassword,
    warningMessage,
    callBegin,
    message,
    username,
    checked,
    setFullname,
    setEmail,
    setPassword,
    setConfirmPassword,
    submitHandler,
    setChecked,
  } = useUserData();

  if (username) return <Navigate replace to="/" />;

  return (
    <FormContainer>
      {console.log("RegisterPage rendering....")}

      <Form onSubmit={submitHandler}>
        <h4 className="text-center">Register</h4>

        {(warningMessage || message) && (
          <Message variant="danger">{warningMessage || message}</Message>
        )}

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            placeholder="Enter email"
            aria-describedby="email-help-text"
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* <Form.Text id="email-help-text" muted>
            We'll never share your email with anyone else.
          </Form.Text> */}
        </Form.Group>

        <Form.Group className="mb-3" controlId="userName">
          <Form.Label>Fullname</Form.Label>
          <Form.Control
            type="text"
            value={fullname}
            placeholder="Enter fullname"
            onChange={(e) => setFullname(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            aria-describedby="password-help-text"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-1" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            value={confirmPassword}
            placeholder="Confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mt-3" controlId="formBasicCheckbox">
          <Form.Check
            value={checked}
            onChange={(e) => setChecked(e.target.checked)}
            type="checkbox"
            label="Register as hotel manager"
          />
        </Form.Group>
        {password && confirmPassword && password === confirmPassword ? (
          <Form.Text className="text-success fst-italic">
            Passwords match!
          </Form.Text>
        ) : null}
        <CustomBlockButton
          disabled={callBegin}
          type="submit"
          showSpinner={callBegin}
          loadingText="Registering..."
          defaultText="REGISTER"
        />
      </Form>
    </FormContainer>
  );
};

export default RegisterPage;

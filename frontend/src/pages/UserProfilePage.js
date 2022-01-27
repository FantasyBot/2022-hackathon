import { Navigate } from "react-router-dom";

import { Card, Row, Col, Table, Form } from "react-bootstrap";

import useUserDetails from "../hooks/useUserDetails";
import useUserData from "../hooks/useUserData";
import Message from "../components/Message";

import CustomSpinner from "../components/UI/CustomSpinner";
// import logo from "../assets/images/hotel-2.jpg";

const UserProfilePage = () => {
  const {
    userDetails: {
      name,
      email,
      role,
      operator_personal_id1,
      operator_personal_id2,
    },
  } = useUserDetails();

  const {
    fullname,
    email: enteredEmail,
    password,
    confirmPassword,
    warningMessage,
    callBegin,
    message,
    username,
    setFullname,
    setEmail,
    setPassword,
    setConfirmPassword,
    submitHandler,
  } = useUserData("edit");

  console.log({ name, email, role });


  const generalContent = (
    <Col md="8" className="rounded border mx-auto pt-2">
      <div className="px-1 py-2 mb-3">
        <h1 className="fs-5">Profile</h1>
        <small className="text-muted">Update your personal details here.</small>
      </div>

      {warningMessage || message ? (
        <Message>{warningMessage || message} </Message>
      ) : null}

      <Form onSubmit={submitHandler}>
        <Form.Group as={Row} className="py-2 border-top" controlId="fullname">
          <Form.Label column sm="4">
            Fullname
          </Form.Label>
          <Col sm="8">
            <Form.Control
              type="text"
              placeholder="Edit fullname"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="py-2" controlId="email">
          <Form.Label column sm="4">
            Email
          </Form.Label>
          <Col sm="8">
            <Form.Control
              type="text"
              placeholder="Change email"
              value={enteredEmail}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="py-2" controlId="password">
          <Form.Label column sm="4">
            New password
          </Form.Label>
          <Col sm="8">
            <Form.Control
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="py-2" controlId="confirmPassword">
          <Form.Label column sm="4">
            Confirm new password
          </Form.Label>
          <Col sm="8">
            <Form.Control
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Col>
          {password && confirmPassword && password === confirmPassword ? (
            <Form.Text className="text-success fst-italic">
              Passwords match!
            </Form.Text>
          ) : null}
        </Form.Group>

        <div className="d-grid col-4 mx-auto my-2">
          <button className="btn btn-outline-secondary" type="submit">
            UPDATE
          </button>
        </div>
      </Form>
    </Col>
  );

  if (!username) return <Navigate replace to="/" />;

  return (
    <Row className="my-2">
      {callBegin ? <CustomSpinner /> : generalContent}
      {!role || !name || !email ? <CustomSpinner /> : null}
      {/* {role === "operator" && operatorContent} */}
      {/* {role === "user" && userContent} */}
    </Row>
  );
};

export default UserProfilePage;

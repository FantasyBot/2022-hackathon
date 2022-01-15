import { Fragment } from "react";
import { Navigate, Link } from "react-router-dom";

import { Card, Stack, Row, Col, Spinner } from "react-bootstrap";

import useUserDetails from "../hooks/useUserDetails";

import logo from "../assets/images/hotel-2.jpg";

const ProfilePage = () => {
  const {
    username,
    userDetails: {
      name,
      email,
      role,
      // operator_personal_id1,
      // operator_personal_id2,
    },
  } = useUserDetails();

  const spinner = (
    <div className="d-flex justify-content-center my-4">
      <Spinner animation="border" variant="secondary" size="lg"></Spinner>
    </div>
  );

  const profileCard = (
    <Fragment>
      <Card className="mt-4 px-md-3">
        <Card.Body className="">
          <Card.Title className="fw-normal my-2">
            <h2>{name}</h2>
            <span className="fw-light text-muted fs-4">{email}</span>
            <br />
            <span className="text-success fs-6 fst-italic">{role}</span>
          </Card.Title>
          <Stack direction="horizontal" gap="2" className="mt-2">
            <Link
              className="ms-auto btn btn-outline-primary"
              to={`/profile/${username}/myhotels`}
            >
              My Hotels
            </Link>
            <Link
              className="btn btn-outline-secondary"
              to={`/profile/${username}/edit-profile`}
            >
              Edit Profile
            </Link>
          </Stack>
        </Card.Body>
      </Card>
      <Row xs={1} md={2} className="g-4 mt-2">
        <Col>
          <Card>
            <Card.Img
              variant="top"
              // src={operator_personal_id1}
              src={logo}
              alt="operator_personal_id1"
            />
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Img
              variant="top"
              // src={operator_personal_id2}
              src={logo}
              alt="operator_personal_id2"
            />
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );

  if (!username) return <Navigate replace to="/" />;

  return <Fragment>{!name && !email ? spinner : profileCard}</Fragment>;
};

export default ProfilePage;

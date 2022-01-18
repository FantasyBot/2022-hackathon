import { Navigate } from "react-router-dom";

import { Card, Row, Col, Table, Form } from "react-bootstrap";

import useUserDetails from "../hooks/useUserDetails";
import useRegisterOrEdit from "../hooks/useRegisterOrEdit";
import Message from "../components/Message";

import CustomSpinner from "../components/UI/CustomSpinner";
import logo from "../assets/images/hotel-2.jpg";

const UserProfilePage = () => {
  const {
    userDetails: {
      name,
      email,
      role,
      // operator_personal_id1,
      // operator_personal_id2,
    },
  } = useUserDetails();
  console.log("role", role);

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
  } = useRegisterOrEdit("edit", { name, email });

  const operatorContent = (
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
  );

  const userContent = (
    <Col md={12} className="mt-5">
      <h2>My Orders</h2>
      {/* 
      {loadingOrders ? (
        <Loader />
      ) : errorOrders ? (
        <Message variant="danger">{errorOrders}</Message>
      ) : ( */}
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>PAID</th>
            <th>DELIVERED</th>
            <th></th>
          </tr>
        </thead>
        {/* <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button className="btn-sm" variant="light">
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody> */}
      </Table>
      {/* )} */}
    </Col>
  );

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
          <button className="btn btn-outline-success" type="submit">
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
      {role === "operator" ? operatorContent : userContent}
    </Row>
  );
};

export default UserProfilePage;

import { useSelector } from "react-redux";

import { Navigate } from "react-router-dom";

import { Row, Col, Card } from "react-bootstrap";
import logo from "../assets/images/hotels.jpg";

const MyHotels = () => {
  const { username } = useSelector((state) => state.user);

  if (!username) return <Navigate to="/" />;

  return (
    <div className="my-3">
      <Row xs={1} md={2} className="g-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <Col key={idx}>
            <Card>
              <Card.Img variant="top" src={logo} />
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
        ))}
      </Row>
    </div>
  );
};

export default MyHotels;

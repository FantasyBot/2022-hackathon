import { Row, Col, Card } from "react-bootstrap";

import { LinkContainer } from "react-router-bootstrap";

const SignupPage = () => {
  return (
    <div className="py-2">
      {console.log("SignUp rendering")}
      <h1 className="text-center text-secondary my-3"> Register as</h1>
      <Row xs={1} md={2} className="g-2">
        <LinkContainer to="/register">
          <Col>
            <Card className="btn btn-outline-secondary">
              {/* <Card.Header>dads</Card.Header> */}
              {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
              <Card.Body>
                <Card.Title className="m-0">CUSTOMER</Card.Title>
                {/* <Card.Text>
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit longer.
                </Card.Text> */}
              </Card.Body>
            </Card>
          </Col>
        </LinkContainer>
        <LinkContainer to="/register/operator">
          <Col>
            <Card className="btn btn-outline-secondary">
              {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
              <Card.Body>
                <Card.Title className="m-0">OPERATOR</Card.Title>
                {/* <Card.Text>
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit longer.
                </Card.Text> */}
              </Card.Body>
            </Card>
          </Col>
        </LinkContainer>
      </Row>
    </div>
  );
};

export default SignupPage;

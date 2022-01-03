import { Row, Col, Card } from "react-bootstrap";

const FormContainer = ({ children }) => {
  return (
    <Row className="justify-content-md-center my-4">
      <Col xs={12} md={6}>
        <Card className="p-4">{children}</Card>
      </Col>
    </Row>
  );
};

export default FormContainer;

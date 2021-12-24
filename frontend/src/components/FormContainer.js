import { Row, Col } from "react-bootstrap";

const FormContainer = ({ children }) => {
  return (
    <Row className="justify-content-md-center py-2">
      <Col xs={12} md={16}>
        {children}
      </Col>
    </Row>
  );
};

export default FormContainer;
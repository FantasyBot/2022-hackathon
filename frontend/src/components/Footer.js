import { Container, Col, Row } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">Copyright &copy; TeamWork</Col>
        </Row>
      </Container>
    </footer>
  )
};

export default Footer;
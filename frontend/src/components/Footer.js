import { Container, Col, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <footer
      style={{
        position: "relative",
        left: "50%",
        bottom: "0",
        transform: "translate(-50%, 0)"
      }}
    >
      <Container>
            <h6 className="text-center py-3">
              Copyright &copy; Hotel Midnight
            </h6>
      </Container>
    </footer>
  );
};

export default Footer;

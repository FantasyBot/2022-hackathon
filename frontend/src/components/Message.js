import { Alert } from "react-bootstrap";

const Message = ({ children, variant }) => (
  <Alert className="my-4" variant={variant}>
    {children}
  </Alert>
);

Message.defaultProps = {
  variant: "info",
};

export default Message;
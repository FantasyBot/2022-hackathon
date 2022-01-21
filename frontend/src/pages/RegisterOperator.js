import { Form, Image } from "react-bootstrap";
import { Navigate } from "react-router-dom";

import CustomBlockButton from "../components/UI/CustomBlockButton";

import FormContainer from "../components/FormContainer";
import Message from "../components/Message";

import useOperatorData from "../hooks/useOperatorData";

const RegisterOperator = () => {
  const {
    warningMessage,
    disable,
    fullname,
    email,
    password,
    objectUrls,
    filesBase64Strings,
    setFullname,
    setEmail,
    setPassword,

    handleChange,
    handleSubmit,

    callBegin,
    message,
    username,
  } = useOperatorData();

  if (username) return <Navigate replace to="/" />;

  console.log("filesBase64Strings.length", filesBase64Strings.length);

  const alert =
    warningMessage || message ? (
      <Message variant="danger">{warningMessage || message}</Message>
    ) : null;

  const form = (
    <Form onSubmit={handleSubmit}>
      <h4>Register operator</h4>

      {alert}
      <Form.Group className="mb-3" controlId="userName">
        <Form.Label>Fullname</Form.Label>
        <Form.Control
          type="text"
          required
          name="name"
          value={fullname}
          placeholder="Enter your fullname as in personal ID"
          onChange={(e) => setFullname(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={email}
          required
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          required
          value={password}
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formFileMultiple" className="mb-3">
        <Form.Label>
          Take photos of your id (both sides) and upload here
        </Form.Label>
        <Form.Control
          type="file"
          name="image1"
          accept=".jpeg, .jpg, .png"
          required
          multiple
          onChange={handleChange}
        />
        <div className="my-2 d-flex gap-2">
          {objectUrls.map((url) => (
            <div style={{ width: "50%" }} key={url}>
              <Image
                rounded
                style={{ width: "100%", height: "100%" }}
                src={url}
                alt={url}
              />
            </div>
          ))}
        </div>
      </Form.Group>

      <CustomBlockButton
        type="submit"
        disabled={callBegin || disable}
        showSpinner={callBegin}
        loadingText="Loading..."
        defaultText="Submit"
      />
    </Form>
  );

  return <FormContainer>{form}</FormContainer>;
};

export default RegisterOperator;

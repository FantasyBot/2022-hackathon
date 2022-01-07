import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// import axios from "axios";

import { Form, Button, Image, Spinner } from "react-bootstrap";

import VerticallyCenteredModal from "../components/UI/VerticallyCenteredModal";

import { useNavigate } from "react-router-dom";

import { registerHotel } from "../store/middlewares/loginAction";

import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { resetApiCallState } from "../store/apiCall";

const AddHotel = () => {
  const [hotelName, setHotelName] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [discPrice, setDicsPrice] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState("");

  const [disable, setDisable] = useState("");
  const [warningMessage, setWarningMessage] = useState("");

  const [objectUrls, setObjectUrls] = useState([]);

  const { username } = useSelector((state) => state.user);

  const { callBegin, message, callSuccess } = useSelector(
    (state) => state.apiCall
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    return () => dispatch(resetApiCallState());
  }, [dispatch]);

  const checkInputOnChange = (e) => {
    if (e.target.files.length !== 4) {
      setDisable(true);
      setWarningMessage("Please upload exactly four (4) images!");
    } else {
      setDisable(false);
      setWarningMessage("");
      setFiles(e.target.files);

      // New
      setObjectUrls([...e.target.files].map((o) => URL.createObjectURL(o)));
    }
  };

  const hideModalHandler = () => navigate(`/profile/${username}/myhotels`);

  const handleSubmit = (e) => {
    e.preventDefault();
    let bodyFormData = new FormData();

    for (let i = 0; i < files.length; i++) {
      bodyFormData.append("images", files[i]);
    }
    bodyFormData.append("name", hotelName);
    bodyFormData.append("location", location);
    bodyFormData.append("price", price);
    bodyFormData.append("discount_price", discPrice);
    bodyFormData.append("email", email);
    bodyFormData.append("phone", phoneNumber);
    bodyFormData.append("description", description);

    const token = localStorage.getItem("token");

    dispatch(
      registerHotel("POST", "/api/user/create/hotel", bodyFormData, {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${JSON.parse(token)}`,
      })
    );
  };

  return (
    <>
      <h2 className="text-center mt-2 text-secondary">Register hotel</h2>
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          {(warningMessage || message) && (
            <Message variant="danger">{warningMessage || message}</Message>
          )}
          {/* username  */}
          <Form.Group className="mb-3">
            <Form.Label>User</Form.Label>
            <Form.Control placeholder={username} disabled />
          </Form.Group>

          {/* Hotel name  */}
          <Form.Group className="mb-3" controlId="formBasicHotelname">
            <Form.Label>Hotel Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              required
              onChange={(e) => setHotelName(e.target.value)}
            />
          </Form.Group>

          {/* Location */}
          <Form.Group className="mb-3" controlId="formBasicHotelLocation">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              required
              onChange={(e) => setLocation(e.target.value)}
            />
          </Form.Group>

          {/* price  */}
          <Form.Group className="mb-3" controlId="formBasicHotelPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              min="10"
              placeholder="price in $"
              required
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>

          {/* discprice  */}
          <Form.Group className="mb-3" controlId="formBasicHotelDiscprice">
            <Form.Label>Discount price</Form.Label>
            <Form.Control
              type="number"
              name="discount"
              placeholder="price in $"
              min="10"
              required
              onChange={(e) => setDicsPrice(e.target.value)}
            />
          </Form.Group>

          {/* hotel email  */}
          <Form.Group className="mb-3" controlId="formBasicHotelEmail">
            <Form.Label>Hotel email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              required
              placeholder="name@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          {/* phone number  */}
          <Form.Group className="mb-3" controlId="formBasicHotelEmail">
            <Form.Label>Phone number</Form.Label>
            <Form.Control
              type="number"
              name="phone"
              required
              min="995598000000"
              // WE CAN USE REGEX HERE
              placeholder="+(995)598123456"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Form.Group>

          {/* files  */}
          <Form.Group controlId="formFileMultiple" className="mb-3">
            <Form.Label>Upload files</Form.Label>
            <Form.Control
              type="file"
              name="multiImages"
              accept=".jpeg, .jpg, .png, .gif"
              multiple
              required
              onChange={checkInputOnChange}
            />
            <div className="my-2 d-flex gap-2">
              {objectUrls.map((url) => (
                <div key={url}>
                  <Image
                    rounded
                    style={{ width: "100%", height: "auto" }}
                    src={url}
                    alt={url}
                  />
                </div>
              ))}
            </div>
          </Form.Group>

          {/* description */}
          <Form.Group className="mb-3" controlId="basicTextarea">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              required
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <div className="d-grid">
            <Button
              variant="primary"
              disabled={callBegin || disable}
              type="submit"
            >
              {callBegin && (
                <Spinner
                  as="span"
                  variant="light"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              )}
              {callBegin ? " Loading..." : " Register"}
            </Button>
          </div>
        </Form>
      </FormContainer>
      <VerticallyCenteredModal show={callSuccess} onHide={hideModalHandler} />
    </>
  );
};

export default AddHotel;

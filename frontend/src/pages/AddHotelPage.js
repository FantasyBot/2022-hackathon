import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";

import { Form, Button, Image, Spinner } from "react-bootstrap";

import VerticallyCenteredModal from "../components/UI/VerticallyCenteredModal";

import { useNavigate } from "react-router-dom";

import { registerHotel } from "../store/actions/registerHotel";

import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { resetApiCallState } from "../store/slices/apiCall";

const AddHotelPage = () => {
  const [hotelName, setHotelName] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [discPrice, setDicsPrice] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [description, setDescription] = useState("");
  // const [files, setFiles] = useState("");

  const [filesBase64Strings, setFilesBase64Strings] = useState([]);

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

  const hideModalHandler = () => navigate(`/profile/${username}/myhotels`);

  // const checkInputOnChange = (e) => {
  //   if (e.target.files.length !== 4) {
  //     setDisable(true);
  //     setWarningMessage("Please upload exactly four (4) images!");
  //   } else {
  //     setDisable(false);
  //     setWarningMessage("");
  //     setFiles(e.target.files);

  //     // New
  //     setObjectUrls([...e.target.files].map((o) => URL.createObjectURL(o)));
  //   }
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   let bodyFormData = new FormData();

  //   for (let i = 0; i < files.length; i++) {
  //     bodyFormData.append("images", files[i]);
  //   }
  //   bodyFormData.append("name", hotelName);
  //   bodyFormData.append("location", location);
  //   bodyFormData.append("price", price);
  //   bodyFormData.append("discount_price", discPrice);
  //   bodyFormData.append("email", email);
  //   bodyFormData.append("phone", phoneNumber);
  //   bodyFormData.append("description", description);

  //   const token = localStorage.getItem("token");

  //   dispatch(
  //     registerHotel("POST", "/api/product/create/hotel", bodyFormData, {
  //       "Content-Type": "multipart/form-data",
  //       Authorization: `Bearer ${JSON.parse(token)}`,
  //     })
  //   );
  // };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (filesBase64Strings.length !== 4) {
      setWarningMessage("You must upload 2 pictures!");
      return;
    }

    const firstString = filesBase64Strings[0];
    const secondString = filesBase64Strings[1];
    const thirdString = filesBase64Strings[2];
    const fourthString = filesBase64Strings[3];

    setWarningMessage("");

    const sendData = {
      name: hotelName,
      location: location,
      price: price,
      discount_price: discPrice,
      email: email,
      phone: phoneNumber,
      description: description,
      image1: firstString,
      image2: secondString,
      image3: thirdString,
      image4: fourthString,
    };

    console.log(sendData);

    const token = localStorage.getItem("token");
    dispatch(
      registerHotel(
        "POST",
        "/api/product/create/hotel",
        sendData,
        {
          // "Content-Type": "application/x-www-form-urlencoded",
          'Content-Type': 'application/json',
          'accept':'application/json',
          Authorization: `Bearer ${JSON.parse(token)}`,
        }
      )
    );
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleChange = async (e) => {
    setWarningMessage("");
    setObjectUrls([]);

    if (e.target.files.length !== 4) {
      setFilesBase64Strings([]);
      setWarningMessage("You must upload 4 pictures!");
      return;
    }
    try {
      const firstPic = e.target.files[0];
      const secondPic = e.target.files[1];
      const thirdPic = e.target.files[2];
      const fourthPic = e.target.files[3];

      const stringsArray = await Promise.all([
        convertToBase64(firstPic),
        convertToBase64(secondPic),
        convertToBase64(thirdPic),
        convertToBase64(fourthPic),
      ]);

      const readyStrings = stringsArray.map((string) => string.split(",")[1]);
      setFilesBase64Strings(readyStrings);
      setObjectUrls(
        [...e.target.files].map((file) => URL.createObjectURL(file))
      );
    } catch (error) {
      console.log(error);
    }
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
              onChange={handleChange}
            />
            <div className="my-2 d-flex gap-2">
              {objectUrls.map((url) => (
                <div key={url}>
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

          {/* description */}
          <Form.Group className="mb-3" controlId="basicTextarea">
            <Form.Label>Description</Form.Label>
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
      <VerticallyCenteredModal
        title="Congratulations!"
        body="New hotel added successfully!"
        show={callSuccess}
        onHide={hideModalHandler}
      />
    </>
  );
};

export default AddHotelPage;

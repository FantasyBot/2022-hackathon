import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// import axios from "axios";

import { Form, Button, Image, Spinner } from "react-bootstrap";

import VerticallyCenteredModal from "../components/UI/VerticallyCenteredModal";

import { useNavigate } from "react-router-dom";

import { registerHotel } from "../store/actions/registerHotel";

import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { resetApiCallState } from "../store/slices/apiCall";

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const AddHotelPage = () => {
  const [hotelName, setHotelName] = useState("");
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [price, setPrice] = useState("");
  const [discPrice, setDicsPrice] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [description, setDescription] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (filesBase64Strings.length !== 4) {
      setWarningMessage("You must upload 4 pictures!");
      return;
    }

    const firstString = filesBase64Strings[0];
    const secondString = filesBase64Strings[1];
    const thirdString = filesBase64Strings[2];
    const fourthString = filesBase64Strings[3];

    setWarningMessage("");

    // get city name from adress...
    let split = address.split(", ");
    let splitedCity = split[split.length - 2];

    const sendData = {
      name: hotelName,
      location: address,
      //added
      city: splitedCity,
      latitude: coordinates.lat,
      longitude: coordinates.lng,
      //
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

    const token = localStorage.getItem("token");
    // http://localhost:5000/api/product/create/hotel
    dispatch(
      registerHotel("POST", "/api/product/create/hotel", sendData, {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${JSON.parse(token)}`,
      })
    );
  };
  // Sugestions
  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const ll = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(ll);
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

          {/* Location with auto complete */}
          <PlacesAutocomplete
            value={address}
            onChange={setAddress}
            onSelect={handleSelect}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <div>
                <Form.Group className="mb-3" controlId="formBasicHotelLocation">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    {...getInputProps({
                      type: "text",
                      name: "location",
                      placeholder: "Choose from suggestions...",
                      className: "location-search-input",
                    })}
                    required
                    // onChange={(e) => setLocation(e.target.value)}
                  />
                </Form.Group>
                <div className="autocomplete-dropdown-container">
                  {loading && <div>Loading...</div>}
                  {suggestions.map((suggestion) => {
                    // console.log(suggestions);
                    const className = suggestion.active
                      ? "suggestion-item--active"
                      : "suggestion-item";
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? {
                          margin: "0 0 2px 0",
                          backgroundColor: "lightblue",
                          cursor: "pointer",
                          padding: "5px",
                        }
                      : {
                          margin: "0 0 2px 0",
                          borderRadius: "5px",
                          backgroundColor: "#e3e3fa",
                          cursor: "pointer",
                          padding: "5px",
                        };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style,
                        })}
                        key={suggestion.index}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>

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
              min="0322000000"
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
              variant="secondary"
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

import { useState } from "react";
import { useSelector } from "react-redux";

import axios from "axios";

import { Form, Button, Image } from "react-bootstrap";

import Message from "../components/Message";
import FormContainer from "../components/FormContainer";

const AddHotel = () => {
  const [hotelName, setHotelName] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [discPrice, setDicsPrice] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState("");

  const [disable, setDisable] = useState("");
  const [message, setMessage] = useState("");

  const [objectUrls, setObjectUrls] = useState([]);

  const { username } = useSelector((state) => state.user);

  const checkInputOnChange = (e) => {
    if (e.target.files.length !== 4) {
      setDisable(true);
      setMessage("Please upload exactly four (4) images!");
    } else {
      setDisable(false);
      setMessage("");
      setFiles(e.target.files);

      // New
      setObjectUrls([...e.target.files].map((o) => URL.createObjectURL(o)));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let bodyFormData = new FormData();

    for (let i = 0; i < files.length; i++) {
      bodyFormData.append("images", files[i]);
    }
    bodyFormData.append("name", hotelName);
    bodyFormData.append("location", location);
    bodyFormData.append("price", price);
    bodyFormData.append("discPrice", discPrice);
    bodyFormData.append("description", description);

    const token = localStorage.getItem("token");
    axios({
      method: "post",
      url: "http://localhost:5000/api/user/create/hotel",
      data: bodyFormData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    })
      .then(function (response) {
        //handle success
        console.log(response.data);
      })
      .catch(function (response) {
        //handle error
        console.log("front ERR0R -->", response.message);
      });
  };

  return (
    <>
      <h2 className="text-center mt-2 text-secondary">Register hotel</h2>
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          {message && <Message variant="danger">{message}</Message>}
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
              placeholder="Please write price in $"
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
              placeholder="Please write discount price in $"
              min="10"
              required
              onChange={(e) => setDicsPrice(e.target.value)}
            />
          </Form.Group>

          {/* files  */}
          <Form.Group controlId="formFileMultiple" className="mb-3">
            <Form.Label>Please upload your hotel images</Form.Label>
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
              type="submit"
              size="lg"
              disabled={disable}
            >
              Submit
            </Button>
          </div>
        </Form>
      </FormContainer>
    </>
  );
};

export default AddHotel;

import { useState } from "react";

import { Card, Form, Button } from "react-bootstrap";

const AddHotel = () => {
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Submit!");
    const asyncBehaviour = async () => {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 3000);
    };

    asyncBehaviour();
  };

  return (
    <>
      <h3 className="text-center mt-2 ">Register hotel</h3>
      <Card className="p-4 my-3">
        <Form onSubmit={submitHandler}>
          {/* username  */}
          <Form.Group className="mb-3">
            <Form.Label>User</Form.Label>
            <Form.Control placeholder="Guram Svanidze" disabled />
          </Form.Group>

          {/* Hotel name  */}
          <Form.Group className="mb-3" controlId="formBasicHotelname">
            <Form.Label>Hotel Name</Form.Label>
            <Form.Control type="text" name="name" required />
          </Form.Group>

          {/* Location */}
          <Form.Group className="mb-3" controlId="formBasicHotelLocation">
            <Form.Label>Location</Form.Label>
            <Form.Control type="text" name="location" required />
          </Form.Group>

          {/* price  */}
          <Form.Group className="mb-3" controlId="formBasicHotelPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" name="price" required />
          </Form.Group>

          {/* discprice  */}
          <Form.Group className="mb-3" controlId="formBasicHotelDiscprice">
            <Form.Label>Discount percent</Form.Label>
            <Form.Control type="number" name="discount" required />
          </Form.Group>

          {/* email  */}
          <Form.Group className="mb-3" controlId="formBasicHotelEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              required
              placeholder="name@example.com"
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
            />
          </Form.Group>

          {/* comment */}
          <Form.Group className="mb-3" controlId="basicTextarea">
            <Form.Label>Comment</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>

          <div className="d-grid">
            <Button
              variant="primary"
              type="submit"
              size="lg"
              disabled={isLoading}
            >
              {!isLoading ? "Submit" : "Submitting..."}
            </Button>
          </div>
        </Form>
      </Card>
    </>
  );
};

export default AddHotel;

// function simulateNetworkRequest() {
//   return new Promise((resolve) => setTimeout(resolve, 2000));
// }

// function LoadingButton() {
//   const [isLoading, setLoading] = useState(false);

//   useEffect(() => {
//     if (isLoading) {
//       simulateNetworkRequest().then(() => {
//         setLoading(false);
//       });
//     }
//   }, [isLoading]);

//   const handleClick = () => setLoading(true);

//   return (
//     <Button
//       variant="primary"
//       disabled={isLoading}
//       onClick={!isLoading ? handleClick : null}
//     >
//       {isLoading ? 'Loading…' : 'Click to load'}
//     </Button>
//   );
// }

// render(<LoadingButton />);

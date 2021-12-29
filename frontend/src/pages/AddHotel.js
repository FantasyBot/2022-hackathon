import { Card, Form, Button } from 'react-bootstrap';

const AddHotel = () => {
  return (
    <>
      <h3 className="text-center mt-2 ">Register hotel</h3>
      <Card className="p-4 my-3">
        <Form>
          {/* username  */}
          <Form.Group className="mb-3">
            <Form.Label>User</Form.Label>
            <Form.Control placeholder="Guram Svanidze" disabled />
          </Form.Group>

          {/* Hotel name  */}
          <Form.Group className="mb-3" controlId="formBasicHotelname">
            <Form.Label>Hotel Name</Form.Label>
            <Form.Control type="text" />
          </Form.Group>

          {/* Location */}
          <Form.Group className="mb-3" controlId="formBasicHotelLocation">
            <Form.Label>Location</Form.Label>
            <Form.Control type="text" />
          </Form.Group>

          {/* price  */}
          <Form.Group className="mb-3" controlId="formBasicHotelPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" />
          </Form.Group>


          {/* discprice  */}
          <Form.Group className="mb-3" controlId="formBasicHotelDiscprice">
            <Form.Label>Discount percent</Form.Label>
            <Form.Control type="number" />
          </Form.Group>

          {/* email  */}
          <Form.Group className="mb-3" controlId="formBasicHotelEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="name@example.com" />
          </Form.Group>

          {/* files  */}
          <Form.Group controlId="formFileMultiple" className="mb-3">
            <Form.Label>Upload files</Form.Label>
            <Form.Control type="file" multiple />
          </Form.Group>

          {/* comment */}
          <Form.Group className="mb-3" controlId="basicTextarea">
            <Form.Label>Comment</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>

          <div className="d-grid">
            <Button variant="primary" type="submit" size="lg">Submit</Button>
          </div>
        </Form>
      </Card>
    </>

  )
};

export default AddHotel;
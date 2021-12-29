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

          {/* City  */}
          <Form.Group controlId="formFileMultiple" className="mb-3">
            <Form.Label>City</Form.Label>
            <Form.Select aria-label="Default select example">
              <option>-</option>
              <option value="1">Tbilisi</option>
              <option value="2">Rustavi</option>
              <option value="3">Gori</option>
            </Form.Select>
          </Form.Group>

          {/* Street name  */}
          <Form.Group className="mb-3" controlId="formBasicHotelname">
            <Form.Label>Street</Form.Label>
            <Form.Control type="text" />
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
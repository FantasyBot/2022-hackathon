import { Card, Container } from 'react-bootstrap';
import hotelLogo from '../assets/images/hotels.jpg'

const HomePage = () => {
  return (
    <>
      <Container className="my-3">
        {/* <Card className="bg-light text-secondary">
          <Card.Header as="h3">This is a wider card with supporting text below as a natural lead-in to
            additional content. This content is a little bit longer.</Card.Header>
          <Card.Img variant="bottom" src={hotelLogo} alt="Card image" />
          <Card.ImgOverlay>
          </Card.ImgOverlay>
        </Card> */}

        <Card>
          <Card.Body>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk
              of the card's content.
            </Card.Text>
            <Card.Img variant="bottom" src={hotelLogo} />
          </Card.Body>
        </Card>
      </Container>
    </>
  )
};




export default HomePage;
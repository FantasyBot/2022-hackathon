import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import AppRouter from "./router";

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Container>
          <AppRouter />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "../stylesheets/Header.css"

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-uppercase">
          Postio
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />

        <Navbar.Collapse id="navbarScroll" className="justify-content-end">
          {!localStorage.getItem("authToken") ? (
            <Nav>
              <Nav.Link as={Link} to="/login">
                <Button variant="outline-light" className="me-2">
                  Login
                </Button>
              </Nav.Link>
              <Nav.Link as={Link} to="/signup">
                <Button variant="primary">Signup</Button>
              </Nav.Link>
            </Nav>
          ) : (
            <Button variant="danger" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

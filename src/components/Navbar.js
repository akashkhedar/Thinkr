import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/signup");
  };
  return (
    <Navbar className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand>iNotebook</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: "100px" }}
          navbarScroll
        ></Nav>
        {!localStorage.getItem("authToken") ? (
          <Nav className="d-flex">
            <Link className="mx-2" to="/login">
              Login
            </Link>
            <Link to="/signup">Signup</Link>
          </Nav>
        ) : (
          <Link to="/signup" onClick={handleLogout}>
            Logout
          </Link>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;

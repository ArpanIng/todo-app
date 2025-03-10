import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function Header() {
  const { isAuthenticated, handleLogout } = useContext(AuthContext);

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Todo</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Features</Nav.Link>
          </Nav>
          <Nav>
            {isAuthenticated ? (
              <>
                <Button onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="me-lg-2 mb-2 mb-sm-0 btn btn-primary"
                >
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Register
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

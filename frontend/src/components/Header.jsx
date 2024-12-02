import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/esm/Button";
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
                <Button className="me-2">Login</Button>
                <Button>Register</Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

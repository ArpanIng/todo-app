import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { BsBell } from "react-icons/bs";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function Header() {
  const { isAuthenticated, handleLogout } = useContext(AuthContext);

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Todo
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/analytics">
              Features
            </Nav.Link>
          </Nav>
          <Nav className="me-lg-4 mb-2 mb-sm-0">
            <Dropdown>
              <Dropdown.Toggle
                variant="light"
                className="position-relative"
                id="notification-dropdown"
              >
                <BsBell />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  99+
                  <span className="visually-hidden">unread notifications</span>
                </span>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>Mark as read</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
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

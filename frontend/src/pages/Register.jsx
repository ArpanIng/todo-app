import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/esm/Spinner";
import { AuthContext } from "../contexts/AuthContext";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { handleUserRegister } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (password !== ConfirmPassword) {
      alert("password did not match.");
      setLoading(false);
      return;
    }

    try {
      await handleUserRegister(username, email, password, ConfirmPassword);
    } catch (error) {
      console.error("Error login:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="vstack">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formGroupUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required={true}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required={true}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required={true}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={ConfirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required={true}
            />
          </Form.Group>
          {loading && <Spinner />}
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Register;

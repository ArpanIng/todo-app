import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/esm/Spinner";
import { AuthContext } from "../contexts/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { handleLogin } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      await handleLogin(username, password);
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
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          {loading && <Spinner />}
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Login;

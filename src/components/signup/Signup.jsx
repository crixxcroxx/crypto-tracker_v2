import { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";

import { useUserAuth } from "../../context/userContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState("");

  const { signup } = useUserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signup(email, password);
    } catch (error) {
      setIsError(error.message);
    }
  };

  return (
    <Form className="signup-form" onSubmit={handleSubmit}>
      {isError && <Alert variant="danger">{isError}</Alert>}
      &nbsp;
      <Form.Group controlId="signupEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          required
          type="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      &nbsp;
      <Form.Group controlId="signupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          required
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      &nbsp;
      <hr />
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default Signup;

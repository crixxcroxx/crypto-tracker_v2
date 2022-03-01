import { useState } from "react";

import { Alert, Button, Form, Modal, Tab, Tabs } from "react-bootstrap";

import Signup from "../signup/Signup";

import { useUserAuth } from "../../context/userContext";

import "./login.css";

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState("");

  const { googleSignIn, login } = useUserAuth();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleGoogleSignin = async (e) => {
    e.preventDefault();

    try {
      await googleSignIn();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
    } catch (error) {
      setIsError(error.message);
    }
  };

  return (
    <div>
      <Button
        title="Login"
        variant="transparent"
        className="btn-login"
        onClick={handleShow}
      >
        <i className="fa fa-user" aria-hidden="true"></i>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <Tabs defaultActiveKey="login">
            <Tab eventKey="login" title="Login ">
              <Form className="login-form" onSubmit={handleSubmit}>
                {isError && <Alert variant="danger">{isError}</Alert>}
                <Form.Group controlId="loginEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                &nbsp;
                <Form.Group controlId="loginPassword">
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
                <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                &nbsp;
                <Button variant="primary" type="submit">
                  Submit
                </Button>
                <Button
                  variant="outline-primary"
                  type="submit"
                  className="float-end google-login"
                  onClick={handleGoogleSignin}
                >
                  <i className="fa fa-google" aria-hidden="true"></i>&nbsp;
                  Signin with Google
                </Button>
              </Form>
            </Tab>

            <Tab eventKey="signup" title=" Signup">
              <Signup />
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Login;

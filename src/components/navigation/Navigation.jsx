import { useState } from "react";
import { Link } from "react-router-dom";

import {
  Button,
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";

import Login from "../login/Login";
import WatchList from "../watchList/WatchList";

import { useUserAuth } from "../../context/userContext";

import "./navigation.css";

const Navigation = ({ setSearch }) => {
  const [show, setShow] = useState(false);
  const { user, logout } = useUserAuth();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar expand="lg" fixed="top" variant="dark">
        <Container fluid>
          <Navbar.Brand>
            <Link to="/">
              <strong>Crypto</strong>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0">
              {user && (
                <NavDropdown
                  title={user.displayName || user.email}
                  id="navbarScrollingDropdown"
                >
                  <NavDropdown.Item href="#profile" disabled>
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#watchList" onClick={handleShow}>
                    Watch List
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
            <Form
              className="d-flex"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            >
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="primary">Search</Button>
            </Form>
            &nbsp;
            <NavDropdown.Divider />
            {!user && <Login />}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <WatchList show={show} handleClose={handleClose} />
    </>
  );
};

export default Navigation;

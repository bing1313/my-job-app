import { useContext } from 'react';
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-content";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
  }
  return (
    <Navbar fixed="top" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Navbar.Collapse>
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/jobs">Jobs</Nav.Link>
          {!isLoggedIn && <Nav.Link as={Link} to="/login">Log In</Nav.Link>}
          {isLoggedIn && <Nav.Link as={Link} to="/profile">Profile</Nav.Link>}
          {isLoggedIn && <button onClick={logoutHandler}>Logout</button>}
        </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavigation;

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { useContext,  useState } from "react";
import { AuthContext } from "../Context/Authcontext";

export default function Navbarc({ cartItems }) {
  const { logout } = useContext(AuthContext);

  const isLoggedIn = localStorage.getItem("token") !== null;
  const [searchItem, setSearchItem] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSearchChange = (event) => {
    setSearchItem(event.target.value);
    if (event.target.value) {
      navigate(`/?search=${event.target.value}`);
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="MyNav">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img src="./images/logo.png" alt="logo1" className="imgLogo" />
          </Navbar.Brand>

          <Navbar.Brand as={Link} to="/">
            <h1>STYLE SHOP</h1>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Form className="d-flex search-form">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  value={searchItem}
                  onChange={handleSearchChange}
                />
                <Button
                  variant="outline-success"
                  className="bg-body-tertiary"
                  onClick={() => navigate(`/?search=${searchItem}`)}
                >
                  Search
                </Button>
              </Form>
            </Nav>

            <Nav>
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>

              {isLoggedIn && (
                <Nav.Link as={Link} to="/cart">
                  <FaCartShopping />
                  Cart
                  <span className="badge badge-pill badge-danger">
                    {cartItems.length}
                  </span>
                </Nav.Link>
              )}
              {isLoggedIn && (
                <>
                  <Nav.Link as={Link} to="/yourorders">
                    My Orders
                  </Nav.Link>
                  <Nav.Link as={Link} to="/profile">
                    Profile
                  </Nav.Link>
                </>
              )}
              {!isLoggedIn && (
                <>
                  <Nav.Link as={Link} to="/signin">
                    Register
                  </Nav.Link>
                  <Nav.Link as={Link} to="/login">
                    Login
                  </Nav.Link>
                </>
              )}
              {isLoggedIn && <Nav.Link onClick={handleLogout}>Logout</Nav.Link>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

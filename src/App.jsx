import { Routes, Route } from "react-router-dom";
import Login from "./assets/Components/Pages/Login";
import Home from "./assets/Components/Pages/Home";
import Signin from "./assets/Components/Pages/Signin";
import Navbarc from "./assets/Components/Navbarc";
import { Container } from "react-bootstrap";
import { ProProvider } from "./assets/Context/ProContext";
import { AuthProvider } from "./assets/Context/Authcontext";
import Productcreate from "./assets/Components/Pages/Productcreate";
import Profile from "./assets/Components/Pages/Profile";
import Editproduct from "./assets/Components/Pages/Editproduct";
import Carts from "./assets/Components/Pages/Carts";
import { useEffect, useState } from "react";
import axios from "axios";
import Yourorders from "./assets/Components/Pages/Yourorders";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    setIsLoggedIn(!!(userId && token));

    if (userId && token) {
      axios
        .post("http://localhost:5000/user/getCart", { userId }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setCartItems(res.data.data.map((item) => ({ ...item, quantity: 1 })));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <>
      <Container fluid>
        <AuthProvider>
          <ProProvider>
            <div>
              <Navbarc
                cartItems={cartItems}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
              <Container fluid>
                <Routes>
                  <Route Component={Home} path="/" />
                  <Route Component={Login} path="/login" />
                  <Route Component={Signin} path="/signin" />
                  <Route Component={Productcreate} path="/createProduct" />
                  <Route Component={Editproduct} path="/editProduct/:id" />
                  <Route
                    element={<Carts cartItems={cartItems} setCartItems={setCartItems} />}
                    path="/cart"
                  />
                  <Route Component={Yourorders} path="/yourorders" />
                  <Route Component={Profile} path="/profile" />
                </Routes>
              </Container>
            </div>
          </ProProvider>
        </AuthProvider>
      </Container>
    </>
  );
}

export default App;

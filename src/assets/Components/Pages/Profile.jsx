import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(false);

  useEffect(()=>{
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if(token){
      setIsLoggedIn(true);
      setUserRole(role)
    }
  },[userRole, isLoggedIn])


  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://ecommercebackend-oe27.onrender.com/user/getCurrentUser",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        console.log( response.data.user);
        setUser(response.data.user || {});
      } catch (error) {
        console.log("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || Object.keys(user).length === 0) {
    return <div>No user data available</div>;
  }

  return (
    <div className="py-5 mt-5 profilepage">
      <Card className="text-center">
        <Card.Header>My Info</Card.Header>
        <Card.Body>
          <Card.Title>Name: {user.name || "N/A"}</Card.Title>
          <Card.Text>Phone Num: {user.mobile || "N/A"}</Card.Text>
          <Card.Text>Email: {user.email || "N/A"}</Card.Text>
          <Card.Text>Address: {user.address || "N/A"}</Card.Text>
          <Card.Text>City: {user.city || "N/A"}</Card.Text>
          <Card.Text>Pincode: {user.pincode || "N/A"}</Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">
          {userRole === "Admin" && (
            <Button
              variant="success"
              onClick={() => navigate("/createProduct")}
            >
              Create Product
            </Button>
          )}
        </Card.Footer>
      </Card>
    </div>
  );
}

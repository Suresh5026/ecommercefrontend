import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";



export default function Carts() {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    console.log(userId);
    

    axios
      .post(
        "https://ecommercebackend-oe27.onrender.com/user/getCart",
        { userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data.data, "Cart Data");
        setCartItems(
          res.data.data.map((item) => ({
            ...item,
            quantity: 1,
          }))
        );

        const total = res.data.data.reduce((acc, item) => {
          const finalPrice = Math.round(
            item.price - (item.price * item.discount) / 100
          );
          return acc + finalPrice;
        }, 0);
        setSubtotal(total);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleIncrement = (itemId) => {
    setCartItems(
      cartItems.map((item) => {
        if (item._id === itemId) {
          return { ...item, quantity: Math.min(item.quantity + 1, item.stock) };
        }
        return item;
      })
    );
  };

  const handleDecrement = (itemId) => {
    setCartItems(
      cartItems.map((item) => {
        if (item._id === itemId) {
          return { ...item, quantity: Math.max(item.quantity - 1, 1) };
        }
        return item;
      })
    );
  };

  useEffect(() => {
    const total = cartItems.reduce((acc, item) => {
      const finalPrice = Math.round(
        item.price - (item.price * item.discount) / 100
      );
      return acc + finalPrice * item.quantity;
    }, 0);
    setSubtotal(total);
  }, [cartItems]);

  const handleRemoveFromCart = async (itemId) => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      await axios.delete("https://ecommercebackend-oe27.onrender.com/user/removeFromCart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          userId,
          productId: itemId,
        },
      });

      setCartItems(cartItems.filter((item) => item._id !== itemId));
    } catch (error) {
      console.error(
        "Error removing item from cart:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleOpenRazorPay = (data, userId, productIds) => {
    const options = {
      key: "rzp_test_tGoWeh9ybvAQtC",
      amount: Number(data.amount),
      currency: data.currency,
      order_id: data.id,
      name: "SHOP ZONE",
      description: "payment testing",
      handler: function (response) {
        console.log(response, "paid");
        axios
          .post("https://ecommercebackend-oe27.onrender.com/payment/verify", {
            response: response,
            userId : userId
          })
          .then((res) => {
            const userId = localStorage.getItem("userId");
            console.log(userId);
            console.log(res.data);
            

            return axios.post("https://ecommercebackend-oe27.onrender.com/user/clearCart", {
              userId,
            });
          })
          .then((res) => {
            console.log(res);
            setCartItems([]);
            setSubtotal(0);
          })
          .catch((err) => {
            console.log(err);
          });
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handlePayment = (subtotal) => {
    const productIds = cartItems.map((item) => item._id);
    console.log(productIds);

    const userId = localStorage.getItem("userId");
    const data = { amount:subtotal, productIds, userId };
    console.log(data);
    
    axios
      .post("https://ecommercebackend-oe27.onrender.com/payment/orders", data)
      .then((res) => {
        console.log(res.data.data);
        handleOpenRazorPay(res.data.data, userId, productIds);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Container className="cardContainer">
        <h1>Your Cart</h1>
        <h2>Sub Total: Rs. {subtotal}</h2>
        <Button variant="warning" onClick={() => handlePayment(subtotal)}>
          Proceed To Buy
        </Button>

        <Row>
          {cartItems.map((item) => (
            <Col
              key={item._id}
              xs={12}
              sm={6}
              md={4}
              lg={4}
              className="mb-4 py-5"
            >
              <Card style={{ width: "18rem" }}>
                <div style={{ position: "relative" }}>
                  <Card.Img
                    variant="top"
                    src={item.imageUrl || "default-image.jpg"}
                    alt="productImage"
                  />
                </div>
                <Card.Body style={{ backgroundColor: "skyblue" }}>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>Description: {item.description}</Card.Text>
                  <Card.Text>Category: {item.category}</Card.Text>
                  <Card.Text>Price: Rs. {item.price}</Card.Text>
                  <Card.Text>Stock: {item.stock}</Card.Text>
                  <Card.Text>Discount: {item.discount}% OFF</Card.Text>
                  <div>
                    <Button onClick={() => handleDecrement(item._id)}>-</Button>
                    <div>{item.quantity}</div>
                    <Button onClick={() => handleIncrement(item._id)}>+</Button>
                  </div>
                  <Card.Text>
                    Final Price: Rs.{" "}
                    {Math.round(
                      item.price - (item.price * item.discount) / 100
                    ) * item.quantity}
                  </Card.Text>
                  <Button
                    className="me-3"
                    onClick={() => handleRemoveFromCart(item._id)}
                  >
                    Remove from Cart
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

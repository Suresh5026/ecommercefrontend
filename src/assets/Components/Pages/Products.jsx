import { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { ProContext } from "../../Context/ProContext";
import { AuthContext } from "../../Context/Authcontext";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";


export default function Cards() {
  const { product } = useContext(ProContext);
  // const { isLoggedIn, userRole } = useContext(AuthContext);
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;
  const navigate = useNavigate();
  const location = useLocation();
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
    const queryParams = new URLSearchParams(location.search);
    const searchItem = queryParams.get("search");
    const colorFilter = queryParams.getAll('color');
    const discountFilter = queryParams.getAll('discount');
    const amountFilter = queryParams.getAll('price');
   
    let filtered = product;

    if(colorFilter.length >0){
      filtered = filtered.filter((prod)=>
      prod.color.some((color)=>colorFilter.includes(color)))
    }
    
    if (discountFilter.length > 0) {
      filtered = filtered.filter((prod) =>
        discountFilter.includes(prod.discount.toString())
      );
    }

    if (amountFilter.length > 0) {
      filtered = filtered.filter((prod) => {
        return amountFilter.some((range) => {
          switch (range) {
            case "0-200":
              return prod.price >= 0 && prod.price <= 200;
            case "200-600":
              return prod.price > 200 && prod.price <= 600;
            case "600-800":
              return prod.price > 600 && prod.price <= 800;
            case "800 and above":
              return prod.price > 800;
            default:
              return true;
          }
        });
      });
    }
  



    if (searchItem) {
      const lowerCaseSearchTerm = searchItem.toLowerCase();
      filtered = product.filter(
        (prod) =>
          prod.name.toLowerCase().includes(lowerCaseSearchTerm) ||
          prod.category.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }
    setFilteredProduct(filtered);
  }, [product, location.search]);

  const handleAddToCart = (product) => {
    if (isLoggedIn) {
      const productId = product._id;
      console.log(productId);
      
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
  
      const data = { productId, userId };
  
      axios.post('https://ecommercebackend-oe27.onrender.com/user/addTocart', data, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.message === 'Add to cart success') {
          alert("Product added to cart successfully!");
        }
      })
      .catch((err) => {
        console.log(err.response ? err.response.data : err);
        alert("Failed to add product to cart.");
      });
    } else {
      alert("Login to continue...");
    }
  };


  const handleDelete = (id) => {
    const token = localStorage.getItem('token');
    
    axios.delete(`https://ecommercebackend-oe27.onrender.com/product/deleteProduct/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
      console.log(res.data);
      setFilteredProduct(filteredProduct.filter(product => product._id !== id));
      alert("Product deleted successfully!");
    })
    .catch((err) => {
      console.log(err.response ? err.response.data : err);
      alert("Failed to delete product.");
    });
  };


  const handleEdit = (id) => {
    navigate(`/editProduct/${id}`);
  };

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredProduct.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Container className="cardContainer">
        <Row>
          {currentCards.map((item, index) => (
            <Col xs={12} sm={6} md={4} lg={4} key={index} className="mb-4">
              <Card style={{ width: "18rem" }}>
                <div style={{ position: "relative" }}>
                  <Card.Img
                    variant="top"
                    src={item.imageUrl}
                    alt="productImage"
                  />
                </div>
                <Card.Body style={{ backgroundColor: "skyblue" }}>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>Description : {item.description}</Card.Text>
                  <Card.Text>Category : {item.category}</Card.Text>
                  <Card.Text>Price : Rs. {item.price}</Card.Text>
                  <Card.Text>Stock : {item.stock}</Card.Text>
                  <Card.Text>{item.discount} % OFF</Card.Text>
                  <Card.Text>Final Price: {Math.round(item.price - (item.price * item.discount / 100))}</Card.Text>
                  <Button
                    className="me-3"
                    onClick={() => handleAddToCart(item)}
                  >
                    Add to Cart
                  </Button>
                  {isLoggedIn && userRole === "Admin" && (
                    <>
                      <Button
                        variant="warning"
                        className="me-2"
                        onClick={() => handleEdit(item._id)}
                      >
                        Edit Product
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete Product
                      </Button>
                    </>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <div className="d-flex justify-content-center mt-4">
          <Button
            variant="outline-primary"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="me-2"
          >
            Previous
          </Button>
          <Button
            variant="outline-primary"
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastCard >= filteredProduct.length}
          >
            Next
          </Button>
        </div>
      </Container>
    </>
  );
}

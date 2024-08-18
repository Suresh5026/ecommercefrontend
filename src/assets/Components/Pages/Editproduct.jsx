import { useEffect, useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function EditProduct() {
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState({
    name: "",
    description: "",
    category: "",
    size: "",
    color: "",
    stock: "",
    price: "",
    discount: "",
    imageUrl: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      const token = localStorage.getItem("token"); // Retrieve token here
      if (!token) {
        console.error("Token is missing");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5000/product/getProduct/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data.data);
        const data = response.data.data;

        if (data) {
          setInitialValues({
            name: data.name,
            description: data.description,
            category: data.category,
            size: data.size.join(", "),
            color: data.color.join(", "),
            stock: data.stock,
            price: data.price,
            discount: data.discount,
            imageUrl: data.imageUrl,
          });
        } else {
          console.error("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <>
      <Container>
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          validate={(values) => {
            const errors = {};
            if (!values.name) errors.name = "Required";
            if (!values.description) errors.description = "Required";
            if (!values.category) errors.category = "Required";
            if (!values.size) errors.size = "Required";
            if (!values.stock) errors.stock = "Required";
            if (!values.price) errors.price = "Required";
            if (!values.discount) errors.discount = "Required";
            if (!values.imageUrl) errors.imageUrl = "Required";
            return errors;
          }}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            const token = localStorage.getItem("token");
            if (!token) {
              console.error("Token is missing");
              return;
            }
            try {
              const payload = {
                ...values,
                size: values.size.split(",").map((item) => item.trim()),
                color: values.color.split(",").map((item) => item.trim()),
              };
              await axios.put(
                `http://localhost:5000/product/editProduct/${id}`,
                payload,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              alert("Product updated successfully!");
              resetForm();
            } catch (error) {
              console.error("There was an error updating the product!", error);
            }
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            resetForm,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter Product Name"
                  value={values.name || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.name && errors.name && <div>{errors.name}</div>}
              </Form.Group>
              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Product Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  placeholder="Enter Product Description"
                  value={values.description || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.description && errors.description && (
                  <div>{errors.description}</div>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="category">
                <Form.Label>Product Category</Form.Label>
                <Form.Control
                  type="text"
                  name="category"
                  placeholder="Enter Product Category"
                  value={values.category || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.category && errors.category && (
                  <div>{errors.category}</div>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="size">
                <Form.Label>Size</Form.Label>
                <Form.Control
                  type="text"
                  name="size"
                  placeholder="Enter Product category"
                  value={values.size}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.size && errors.size ? <div>{errors.size}</div> : null}
              </Form.Group>
              <Form.Group className="mb-3" controlId="color">
                <Form.Label>Color</Form.Label>
                <Form.Control
                  type="text"
                  name="color"
                  placeholder="Enter Product category"
                  value={values.color}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.color && errors.color ? (
                  <div>{errors.color}</div>
                ) : null}
              </Form.Group>
              <Form.Group className="mb-3" controlId="stock">
                <Form.Label>Product Stock</Form.Label>
                <Form.Control
                  type="number"
                  name="stock"
                  placeholder="Enter Product Stock"
                  value={values.stock || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.stock && errors.stock && <div>{errors.stock}</div>}
              </Form.Group>
              <Form.Group className="mb-3" controlId="price">
                <Form.Label>Product Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  placeholder="Enter Product Price"
                  value={values.price || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.price && errors.price && <div>{errors.price}</div>}
              </Form.Group>
              <Form.Group className="mb-3" controlId="discount">
                <Form.Label>Product Discount</Form.Label>
                <Form.Control
                  type="text"
                  name="discount"
                  placeholder="Enter Product category"
                  value={values.discount}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.discount && errors.discount ? (
                  <div>{errors.discount}</div>
                ) : null}
              </Form.Group>
              <Form.Group className="mb-3" controlId="imageUrl">
                <Form.Label>Product Image URL</Form.Label>
                <Form.Control
                  type="text"
                  name="imageUrl"
                  placeholder="Enter Product Image URL"
                  value={values.imageUrl || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.imageUrl && errors.imageUrl && (
                  <div>{errors.imageUrl}</div>
                )}
              </Form.Group>
              <Button type="submit" disabled={isSubmitting}>
                Submit
              </Button>
              <Button type="reset" onClick={() => resetForm()}>
                Cancel
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
}

import axios from "axios";
import { Formik } from "formik";
import { Button, Container, Form } from "react-bootstrap";

export default function Productcreate() {
  const initialValues = {
    name: "",
    description: "",
    category: "",
    size : "",
    color : "",
    stock: "",
    price: "",
    discount : "",
    imageUrl: "",
  };
  return (
    <>
      <Container>
        <Formik
          initialValues={initialValues}
          validate={(values) => {
            const errors = {};
            if (!values.name) {
              errors.name = "Required";
            }
            if (!values.description) {
              errors.description = "Required";
            }
            if (!values.category) {
              errors.category = "Required";
            }
            if (!values.size) {
              errors.size = "Required";
            }
            if (!values.color) {
              errors.color = "Required";
            }
            if (!values.stock) {
              errors.stock = "Required";
            }
            if (!values.price) {
              errors.price = "Required";
            }
            if (!values.discount) {
              errors.discount = "Required";
            }
            if (!values.imageUrl) {
              errors.imageUrl = "Required";
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            const token = localStorage.getItem("token");
            
            const payload = {
              ...values,
              size : values.size.split(","),
              color : values.color.split(',')
            }
            
            try {
              const response = await axios.post(
                "http://localhost:5000/product/createProduct",
                payload,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                  withCredentials : true
                }
              );
              console.log("Product created successfully:", response.data.data);
              resetForm();
            } catch (error) {
              console.error(
                "There was an error creating the product!",
                error
              );
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
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter Product Name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.name && errors.name ? <div>{errors.name}</div> : null}
              </Form.Group>
              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Product Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  placeholder="Enter Product description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.description && errors.description ? (
                  <div>{errors.description}</div>
                ) : null}
              </Form.Group>
              <Form.Group className="mb-3" controlId="category">
                <Form.Label>Product category</Form.Label>
                <Form.Control
                  type="text"
                  name="category"
                  placeholder="Enter Product category"
                  value={values.category}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.category && errors.category ? (
                  <div>{errors.category}</div>
                ) : null}
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
                {touched.size && errors.size ? (
                  <div>{errors.size}</div>
                ) : null}
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
                <Form.Label>Product Quantity</Form.Label>
                <Form.Control
                  type="Number"
                  name="stock"
                  placeholder="Enter Product stock"
                  value={values.stock}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.stock && errors.stock ? (
                  <div>{errors.stock}</div>
                ) : null}
              </Form.Group>
              <Form.Group className="mb-3" controlId="price">
                <Form.Label>Product Price</Form.Label>
                <Form.Control
                  type="Number"
                  name="price"
                  placeholder="Enter Product price"
                  value={values.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.price && errors.price ? (
                  <div>{errors.price}</div>
                ) : null}
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
                <Form.Label>Product Image</Form.Label>
                <Form.Control
                  type="text"
                  name="imageUrl"
                  placeholder="Enter Product imageUrl"
                  value={values.imageUrl}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.imageUrl && errors.imageUrl ? (
                  <div>{errors.imageUrl}</div>
                ) : null}
              </Form.Group>
              <Button type="submit" disabled={isSubmitting}>
                Submit
              </Button>
              <Button type="reset">Cancel</Button>
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
}

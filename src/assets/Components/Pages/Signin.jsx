import { Container, Form, Col, Row, Button, Alert } from "react-bootstrap";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function Signin() {
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState(null);
  return (
    <>
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <h2 className="text-center">Sign Up</h2>
            {alertMessage && (
              <Alert
                variant="danger"
                onClose={() => setAlertMessage(null)}
                dismissible
              >
                {alertMessage}
              </Alert>
            )}
            <Formik
              initialValues={{
                name: "",
                email: "",
                mobile: "",
                address: "",
                city: "",
                pincode: "",
                password: "",
                confirmpassword: "",
              }}
              validate={(values) => {
                const errors = {};
                if (!values.name) {
                  errors.name = "Required!";
                } else if (values.name.length < 3) {
                  errors.name = "Account name should be atleast 3 characters";
                }
                if (!values.email) {
                  errors.email = "Required!";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "Invalid email address";
                }
                if (!values.password) {
                  errors.password = "Required";
                }
                if (!values.confirmpassword) {
                  errors.password = "Required";
                }
                if (values.password !== values.confirmpassword) {
                  errors.confirmpassword = "password mismatch";
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting, resetForm } ) => {
                setSubmitting(true);
                axios
                  .post("https://ecommercebackend-oe27.onrender.com/user/register", values)
                  .then((res) => {
                    const result = res.data;
                    if (result.message === "User Registered Successfully") {
                      setAlertMessage(result.message)
                    }
                  })
                  .catch((error) => {
                    if (
                      error.response &&
                      error.response.data &&
                      error.response.data.message
                    ) {
                      setAlertMessage(error.response.data.message);
                    } else {
                      setAlertMessage("An error occurred. Please try again.");
                    }
                  })
                  .finally(() => {
                    setSubmitting(false);
                    resetForm();
                  });
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
                  <Form.Group className="mb-3" controlId="regname">
                    <Form.Label>Name </Form.Label>
                    <Form.Label className="text-danger">*</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Enter Name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                      isInvalid={touched.name && !!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Label className="text-danger">*</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      isInvalid={touched.email && !!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="mobile">
                    <Form.Label>Mobile </Form.Label>
                    <Form.Label className="text-danger">*</Form.Label>
                    <Form.Control
                      type="text"
                      name="mobile"
                      placeholder="Enter mobile"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.mobile}
                      isInvalid={touched.mobile && !!errors.mobile}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.mobile}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="address">
                    <Form.Label>Address </Form.Label>
                    <Form.Label className="text-danger">*</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      placeholder="Enter Name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.address}
                      isInvalid={touched.address && !!errors.address}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.address}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="city">
                    <Form.Label>City </Form.Label>
                    <Form.Label className="text-danger">*</Form.Label>
                    <Form.Control
                      type="text"
                      name="city"
                      placeholder="Enter Name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.city}
                      isInvalid={touched.city && !!errors.city}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="pincode">
                    <Form.Label>Pincode </Form.Label>
                    <Form.Label className="text-danger">*</Form.Label>
                    <Form.Control
                      type="text"
                      name="pincode"
                      placeholder="Enter Name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.pincode}
                      isInvalid={touched.pincode && !!errors.pincode}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Label className="text-danger">*</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      isInvalid={touched.password && !!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="formBasicConfirmPassword"
                  >
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Label className="text-danger">*</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmpassword"
                      placeholder="Confirm Password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.confirmpassword}
                      isInvalid={
                        touched.confirmpassword && !!errors.confirmpassword
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.confirmpassword}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <div className="d-flex justify-content-center mt-4">
                    <Button
                      variant="success"
                      type="submit"
                      className="me-2"
                      disabled={isSubmitting}
                    >
                      Sign Up
                    </Button>
                    <Button variant="warning" type="submit">
                      Cancel
                    </Button>
                  </div>
                  <div className="d-flex justify-content-center mt-4">
                    <Link to="/login">Already have an account? Login</Link>
                  </div>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </Container>
    </>
  );
}

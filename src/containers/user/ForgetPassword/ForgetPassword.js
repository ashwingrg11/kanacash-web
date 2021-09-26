import React, { Component } from "react";
import { Row, Col, Form, Button, Card, Container } from "react-bootstrap";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import { Formik } from "formik";
import * as yup from "yup";
import { forgetPassword } from "../../../services/axios/authApi";
import "./forgetPassword.css";

class ForgetPassword extends Component {
  forgetPassword = (value) => {
    forgetPassword(value)
      .then((res) => {
      })
      .catch((err) => {
        // console.log("err", err);
      });
  };
  render() {
    const schema = yup.object({
      email: yup.string().required("This field cannot be empty.").email("Please enter a valid email address."),
    });
    const initialValue = {
      email: "",
    };
    return (
      <>
      <Header/>
      <section className="front-background">
        <Container>
          <Row>
          <div className="circle-stroke form-up-wrap">
            <Col className="m-auto theme-form forgot-pw-form">
              <Card className="p-4">
                <Card.Body className="p-0">
                <h2 className="sub-title">Forget Password</h2>
                  <Row>
                    <Col>
                      <Formik
                        validationSchema={schema}
                        onSubmit={(values) => this.forgetPassword(values)}
                        initialValues={initialValue}
                      >
                        {({
                          handleSubmit,
                          handleChange,
                          handleBlur,
                          values,
                          touched,
                          isValid,
                          errors,
                        }) => (
                          <Form noValidate onSubmit={handleSubmit}>
                            <Form.Group>
                              <Form.Label>Email address</Form.Label>
                              <Form.Control
                                type="email"
                                name="email"
                                placeholder="Your email address"
                                value={values.email}
                                onChange={handleChange}
                                isValid={touched.email && !errors.email}
                                isInvalid={!!errors.email}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.email}
                              </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group>
                              <Button
                                block
                                type="submit"
                                className="btn btn-secondary btn-secondary-big"
                              >
                                Get password reset link{" "}
                              </Button>
                            </Form.Group>
                          </Form>
                        )}
                      </Formik>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            </div>
          </Row>
        </Container>
        </section>
        <Footer/>
      </>
    );
  }
}

export default ForgetPassword;

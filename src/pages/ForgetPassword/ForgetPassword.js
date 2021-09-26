import React from "react";
import { Row, Col, Form, Card, Container } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../containers/layout/Header";
import Footer from "../../containers/layout/Footer";
import { forgetPassword } from "../../services/axios/authApi";
import ErrorCircle from "../../assets/images/error.svg";
import Notify from "../../components/Alert/CustomAlert";
import ButtonSpinner from "../../components/ButtonSpinner/ButtonSpinner";
import "./forgetPassword.css";
import Disclaimer from "../../components/Disclaimer/Disclaimer";
import { connect } from "react-redux";
const schema = yup.object({
  email: yup
    .string()
    .required("This field cannot be empty.")
    .email("Please enter a valid email address."),
});

const initialValue = {
  email: "",
};

const ForgetPassword = (props) => {
  const [error, setError] = React.useState("");
  const [notify, setNotify] = React.useState({
    show: false,
    message: "",
    variant: "",
  });
  const sendResetPasswordEmail = ({ email }, { setSubmitting }) => {
    setError("");
    setNotify(false);
    setSubmitting(true);
    forgetPassword(email)
      .then((res) => {
        setSubmitting(false);
        if (res.status === 200) {
          setNotify((prevState) => ({
            ...prevState,
            message: "Password reset link has been sent to your email.",
            variant: "success",
            show: true,
          }));
        } else {
          setNotify((prevState) => ({
            ...prevState,
            variant: "danger",
            message: res.data?.message,
            show: true,
          }));
          setError(res.data.message);
        }
      })
      .catch((err) => {
        setSubmitting(false);
        // console.log("err", err);
      });
  };

  return (
    <React.Fragment>
      <Header />
      <section className="front-background">
        <Container>
          <Row>
            <div className="circle-stroke form-up-wrap">
              <Col className="m-auto theme-form forgot-pw-form">
                <Card className="p-4">
                  <Card.Body className="p-0">
                    <h2 className="sub-title">Forget Password</h2>
                    {error && (
                      <Row>
                        <Col
                          style={{
                            color: "#dc3545",
                            backgroundColor: "rgba(255,0,0,.27)",
                            margin: "10px",
                            padding: "10px",
                            fontSize: "13px",
                          }}
                          className="d-flex justify-content-center"
                        >
                          {" "}
                          <img
                            src={ErrorCircle}
                            alt="ErrorCircle"
                            height="10px"
                            width="10px"
                            style={{ margin: "6px 6px 0px 0px " }}
                          />
                          {error}
                        </Col>
                      </Row>
                    )}
                    <Row>
                      <Col>
                        <Formik
                          isSubmitting={true}
                          validationSchema={schema}
                          onSubmit={sendResetPasswordEmail}
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
                            isSubmitting,
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
                                <ButtonSpinner
                                  isSubmitting={isSubmitting}
                                  title={"Get password reset link"}
                                />
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
      <Footer />
      {!localStorage.acceptPolicy && <Disclaimer />}

      <Notify
        variant={notify.variant}
        show={notify.show}
        message={notify.message}
        close={() =>
          setNotify((prevState) => ({ message: "", variant: "", show: false }))
        }
      />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  acceptPolicy: state.auth.accept_policy,
});

export default connect(mapStateToProps)(ForgetPassword);

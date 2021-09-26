import React from "react";
import { Row, Col, Form, Card, Container } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../containers/layout/Header";
import Footer from "../../containers/layout/Footer";
import * as api from "../../services/axios/";
import ErrorCircle from "../../assets/images/error.svg";
import Notify from "../../components/Alert/CustomAlert";
import ButtonSpinner from "../../components/ButtonSpinner/ButtonSpinner";
import ROUTES from "../../assets/Routes/Routes";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Disclaimer from "../../components/Disclaimer/Disclaimer";
import { connect } from "react-redux";
const lowercaseRegex = /(?=.*[a-z])/;
const uppercaseRegex = /(?=.*[A-Z])/;
const numericRegex = /(?=.*[0-9])/;
const charactersRegex = /(?=.*[\^$*.[\]{}()?“!@#%&/><’:;|_~`])/;

let schema = yup.object({
  password: yup
    .string()
    .required("This field cannot be empty.")
    .matches(lowercaseRegex, "Password must contain one lowercase character.")
    .matches(uppercaseRegex, "Password must contain one uppercase character.")
    .matches(numericRegex, "Password must contain one number.")
    .matches(charactersRegex, "Password must contain one special character.")
    .min(8, "Minimum 8 characters required!"),
  confirmPassword: yup
    .string()
    .required("This field cannot be empty.")
    .oneOf([yup.ref("password")], "Password does not match."),
});

let initialValue = {
  password: "",
  confirmPassword: "",
};

const ResetPassword = (props) => {
  const [error, setError] = React.useState("");
  const [notify, setNotify] = React.useState({
    show: false,
    message: "",
    variant: "",
  });

  const onResetPassword = ({ password }, { resetForm, setSubmitting }) => {
    setError("");
    setSubmitting(true);
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let token = params.get("token");
    let email = params.get("email");
    const body = {
      token: token,
      email: email,
      password: password,
    };
    api
      .resetPassword(body)
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("successReset", true);
          props.history.push({
            pathname: `${ROUTES.WELCOME}`,
            resetPasswordSuccess: {
              message: "Your password has been reset successfully",
              variant: "success",
              showAlert: true,
            },
          });
        } else {
          setNotify((prevState) => ({
            ...prevState,
            variant: "danger",
            message: res.data?.message,
            show: true,
          }));
          setError(res.data.message);
        }
        resetForm();
        setSubmitting(false);
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
                    <h2 className="sub-title">Password reset</h2>
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
                      <Col className="theme-form">
                        <Formik
                          validationSchema={schema}
                          onSubmit={onResetPassword}
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
                                <Form.Label>New Password</Form.Label>
                                <Form.Control
                                  name="password"
                                  type="password"
                                  placeholder="Enter your new password"
                                  value={values.password}
                                  onChange={handleChange}
                                  isValid={touched.password && !errors.password}
                                  isInvalid={!!errors.password}
                                  onBlurCapture={handleBlur}
                                />
                                {touched.password && errors.password && (
                                  <Form.Control.Feedback type="invalid">
                                    {errors.password}
                                  </Form.Control.Feedback>
                                )}
                              </Form.Group>

                              <Form.Group>
                                <Form.Label>Confirm New Password</Form.Label>
                                <Form.Control
                                  name="confirmPassword"
                                  type="password"
                                  placeholder="Confirm your new password"
                                  value={values.confirmPassword}
                                  onChange={handleChange}
                                  isValid={
                                    touched.confirmPassword &&
                                    !errors.confirmPassword
                                  }
                                  isInvalid={!!errors.confirmPassword}
                                  onBlurCapture={handleBlur}
                                />
                                {touched.confirmPassword &&
                                  errors.confirmPassword && (
                                    <Form.Control.Feedback type="invalid">
                                      {errors.confirmPassword}
                                    </Form.Control.Feedback>
                                  )}
                              </Form.Group>

                              <Form.Group>
                                <ButtonSpinner
                                  isSubmitting={isSubmitting}
                                  title={"Reset Password"}
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

ResetPassword.propTypes = {
  history: PropTypes.object,
};
const mapStateToProps = (state) => ({
  acceptPolicy: state.auth.accept_policy,
});

export default connect(mapStateToProps)(withRouter(ResetPassword));

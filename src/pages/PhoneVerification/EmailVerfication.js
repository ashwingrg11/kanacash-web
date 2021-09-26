import React, { Component } from "react";
import { Row, Col, Form, Card, Container, Spinner } from "react-bootstrap";
import { Formik } from "formik";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as yup from "yup";
import PropTypes from "prop-types";
import COLORS from "../../assets/Color/Color";
import ROUTES from "../../assets/Routes/Routes";
import EmailVerificationImg from "../../assets/images/EmailVerificationImg.svg";
import Header from "../../containers/layout/Header";
import Footer from "../../containers/layout/Footer";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { resendVerificationCode } from "../../store/actions/Auth";
import {
  verifyEmailAddress,
  signupUser,
} from "../../store/actions/SignUpAction";
import { loginAction } from "../../store/actions/Login";
import ButtonSpinner from "../../components/ButtonSpinner/ButtonSpinner";
import { getCurrentUser } from "../../store/actions/UserDetailsActions";
import Disclaimer from "../../components/Disclaimer/Disclaimer";
class EmailVerification extends Component {
  state = {
    errorMessage: "",
    resendLoading: false,
    resendMessage: "",
  };

  resendVerfication = () => {
    this.setState({ resendLoading: true, resendMessage: "" });
    this.props
      .resendVerificationCode()
      .then((res) => {
        this.setState({
          resendLoading: false,
          resendMessage: "Successfully sent you a new code.",
        });
      })
      .catch((err) => {
        // console.log("resendVerificationCode catch", err.data?.message);
        this.setState({
          resendLoading: false,
          resendMessage: err.data?.message,
        });
      });
  };

  verification = (value, { setSubmitting }) => {
    this.setState({ errorMessage: "" });
    setSubmitting(true);
    this.props
      .verifyEmailAddress(value.code)
      .then((res) => {
        this.props.getCurrentUser();
        this.props.history.push(`${ROUTES.EMAIL_VERIFIED}`);
      })
      .catch((err) => {
        setSubmitting(false);
        this.setState({ errorMessage: err.data?.message });
      });
  };

  handleInput = () => {
    this.setState({ errorMessage: "" });
  };

  render() {
    const schema = yup.object({
      code: yup.number().required("This field can not be empty."),
    });
    const initialValue = {
      code: "",
    };
    return (
      <>
        <Header />
        <section className="front-background">
          <div className="w-100 circle-stroke form-up-wrap">
            <Container>
              <Row>
                <Col className="m-auto theme-form phone-verification-form">
                  <Card className="text-center">
                    <Card.Body>
                      <Col className="mb-4 justify-content-center p-0 pt-md-4">
                        <img
                          src={EmailVerificationImg}
                          alt="EmailVerificaitonImg"
                        />
                      </Col>
                      <div className="mb-1 justify-content-center">
                        <h2 className="sub-title mb-1">Account Activation</h2>
                        <p>Please check your email for an activation code. </p>
                      </div>
                      <Formik
                        validationSchema={schema}
                        onSubmit={this.verification}
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
                              <Form.Control
                                type="number"
                                name="code"
                                placeholder="Enter Code"
                                value={values.code}
                                onChange={handleChange}
                                isValid={touched.code && !errors.code}
                                isInvalid={!!errors.code}
                                onInput={() =>
                                  this.setState({ errorMessage: "" })
                                }
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.code}
                              </Form.Control.Feedback>
                              {this.state.errorMessage && (
                                <ErrorMessage
                                  errorMessage={this.state.errorMessage}
                                />
                              )}
                            </Form.Group>

                            <Form.Row>
                              <ButtonSpinner
                                isSubmitting={isSubmitting}
                                title={"Verify"}
                              />
                            </Form.Row>
                            <div className="mt-2">
                              <Col>
                                {this.state.resendLoading ? (
                                  <Spinner animation="border" size="sm" />
                                ) : (
                                  <p>
                                    {this.state.resendMessage === ""
                                      ? "Successfully sent you a new code."
                                      : this.state.resendMessage}
                                  </p>
                                )}
                              </Col>
                              <Col>
                                <p className="mb-0">
                                  Didn&apos;t receive code?{" "}
                                  <span
                                    className="btn-link"
                                    onClick={this.resendVerfication}
                                    style={{
                                      cursor: "pointer",
                                      color: `${COLORS.PRIMARY_COLOR}`,
                                    }}
                                  >
                                    Resend
                                  </span>
                                </p>
                              </Col>
                            </div>
                          </Form>
                        )}
                      </Formik>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        </section>
        <Footer />
        {!localStorage.acceptPolicy && <Disclaimer />}
      </>
    );
  }
}

EmailVerification.propTypes = {
  history: PropTypes.object,
  resendVerificationCode: PropTypes.func,
  loader: PropTypes.bool,
  loginAction: PropTypes.func,
  signupUser: PropTypes.func,
  verifyEmailAddress: PropTypes.func,
  getCurrentUser: PropTypes.func,
};

const mapActionToProps = {
  resendVerificationCode,
  verifyEmailAddress,
  signupUser,
  loginAction,
  getCurrentUser,
};

const mapStateToProps = (state) => ({
  loader: state.loader.presentLoader,
  acceptPolicy: state.auth.accept_policy,
});

export default connect(
  mapStateToProps,
  mapActionToProps
)(withRouter(EmailVerification));

import React, { Component } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { connect } from "react-redux";
import { Row, Col, Form } from "react-bootstrap";
import { getAllCountries } from "../../store/actions/miscellaneousAction";
import {
  sendPhoneVerificationCode,
  signupUser,
} from "../../store/actions/SignUpAction";
import { setToken } from "../../store/actions/Auth";
import ErrorCircle from "../../assets/images/error.svg";
import "./index.css";
import PropTypes from "prop-types";
import COLORS from "../../assets/Color/Color";
import ButtonSpinner from "../../components/ButtonSpinner/ButtonSpinner";
import Helper from "../../services/Helper";
import { loginAction } from "../../store/actions/Login";

const lowercaseRegex = /(?=.*[a-z])/;
const uppercaseRegex = /(?=.*[A-Z])/;
const numericRegex = /(?=.*[0-9])/;
const charactersRegex = /(?=.*[\^$*.[\]{}()?“!@#%&/><’:;|_~`])/;
const nameRegex = /^[A-Za-z]*\s*$/;
const numberOnlyRegex = /^[0-9]*$/;

// let errorMessages;

class SignupForm extends Component {
  state = {
    countries: [],
    error: "",
  };

  onClickRegister = (values, { setSubmitting }) => {
    this.setState({ error: "" });
    let body = {
      firstName: values.firstName,
      lastName: values.lastName,
      middleName: values.middleName,
      email: values.email,
      phoneNumber: values.phone,
      password: `${values.password}`,
      state: values.country,
      device: "deviceId", //`${fingerPrint}`,
      countryCode: values.zip,
    };
    setSubmitting(true);
    this.props
      .signupUser(body)
      .then((res) => {
        this.props
          .loginAction(res)
          .then((response) => {
            // this.props.successfullySignup();
            // setSubmitting(false);

            if (response.status === "success") {
              this.props
                .sendPhoneVerificationCode()
                .then((res1) => {
                  this.props.successfullySignup();
                  setSubmitting(false);
                })
                .catch((err) => {
                  this.setState({ errors: `${res.errorMessage}` });
                });
            }
          })
          .catch((err) => {
            this.setState({ errors: `${res.errorMessage}` });
          });
      })
      .catch((err) => {
        this.setState({ error: err.data.message });
        setSubmitting(false);
      });
    // this.props
    //   .sendPhoneVerificationCode(body)
    //   .then((res) => {
    //     console.log("res in sendPhone Verifacation code",res)
    //     this.props.signupUser(body).then(res=>{
    //       console.log("res form signyp User",res)
    //       this.props
    //       .loginAction(res)
    //       .then((res) => {
    //         setSubmitting(false);
    //         if (res.status === "success") {
    //           this.props.successfullySignup();        }
    //       })
    //       .catch((err) => {
    //         setSubmitting(false);
    //         // console.log("error from login", err);
    //       });
    //       console.log("res from signup ",res)
    //     }).catch(err=>{
    //       console.log("error from signup",err)
    //     })
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //     setSubmitting(false);
    //     // console.log("error in signup form", err);
    //     // this.setState({ error: err.response.message });
    //   });
  };
  render() {
    const schema = yup.object({
      firstName: yup
        .string()
        // .min(3, "Too Short!")
        // .max(50, "Too Long!")
        .required("This field cannot be empty.")
        .matches(nameRegex, "Please enter a valid name."),
      middleName: yup.string().matches(nameRegex, "Please enter a valid name."),
      lastName: yup
        .string()
        .required("This field cannot be empty.")
        .matches(nameRegex, "Please enter a valid name."),
      phone: yup
        .string()
        .required("This field cannot be empty.")
        .matches(numberOnlyRegex, "Please enter the number only.")
        .min(10, "Please enter valid phone number.")
        .max(10, "Please enter valid phone number."),
      country: yup.string().required("This field cannot be empty."),
      zip: yup.string().required("This field cannot be empty."),
      password: yup
        .string()
        .required("This field cannot be empty.")
        .matches(
          lowercaseRegex,
          "Password must contain one lowercase character."
        )
        .matches(
          uppercaseRegex,
          "Password must contain one uppercase character."
        )
        .matches(numericRegex, "Password must contain one number.")
        .matches(
          charactersRegex,
          "Password must contain one special character."
        )
        .min(8, "Password must be at least 8 characters long."),
      confirmPassword: yup
        .string()
        .required("This field cannot be empty.")
        .oneOf([yup.ref("password")], "Password does not match."),
      email: yup
        .string()
        .lowercase()
        .required("This field cannot be empty.")
        .email("Please enter a valid email address."),
    });

    const initialValue = {
      firstName: "",
      middleName: "",
      lastName: "",
      phone: "",
      country: "",
      zip: "+1",
      password: "",
      confirmPassword: "",
      email: "",
    };

    return (
      <>
        {this.props.showLogin && (
          <Col
            className="p-3 mb-4"
            style={{ backgroundColor: `${COLORS.LIGHT_BLUE}` }}
          >
            Already have an account?
            <span
              onClick={() => this.props.login()}
              style={{ fontWeight: "bold", cursor: "pointer" }}
            >
              {" "}
              Log in{" "}
            </span>
          </Col>
        )}
        {this.state.error && (
          <Col
            style={{
              color: "#dc3545",
              backgroundColor: "rgba(255,0,0,.27)",
              padding: "10px",
              fontSize: "13px",
            }}
            className="d-flex justify-content-center"
          >
            <img
              src={ErrorCircle}
              alt="ErrorCircle"
              height="10px"
              width="10px"
              style={{ margin: "6px 6px 0px 0px " }}
            />
            {this.state.error}
          </Col>
        )}
        <Col className="theme-form p-0">
          <Formik
            validationSchema={schema}
            onSubmit={this.onClickRegister}
            initialValues={initialValue}
            className="p-0"
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
              <Form noValidate onSubmit={handleSubmit} className="Signup-Form">
                <Form.Row>
                  <Form.Group className="col-md-4">
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      value={values.firstName}
                      onChange={handleChange}
                      isValid={touched.firstName && !errors.firstName}
                      placeholder="First name "
                      isInvalid={!!errors.firstName}
                      onBlurCapture={handleBlur}
                    />
                    {touched.firstName && errors.firstName && (
                      <Form.Control.Feedback type="invalid">
                        {errors.firstName}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                  <Form.Group className="col-md-4">
                    <Form.Label>Middle name</Form.Label>
                    <Form.Control
                      type="text"
                      name="middleName"
                      value={values.middleName}
                      onChange={handleChange}
                      isValid={touched.middleName && !errors.middleName}
                      placeholder="Middle name "
                      isInvalid={!!errors.middleName}
                      onBlurCapture={handleBlur}
                    />
                    {touched.middleName && errors.middleName && (
                      <Form.Control.Feedback type="invalid">
                        {errors.middleName}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                  <Form.Group className="col-md-4">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      value={values.lastName}
                      onChange={handleChange}
                      isValid={touched.lastName && !errors.lastName}
                      placeholder="Last name"
                      isInvalid={!!errors.lastName}
                      onBlurCapture={handleBlur}
                    />

                    {touched.lastName && errors.lastName && (
                      <Form.Control.Feedback type="invalid">
                        {errors.lastName}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group md="12" as={Col}>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Your email address"
                      value={values.email}
                      onChange={handleChange}
                      isValid={touched.email && !errors.email}
                      isInvalid={!!errors.email}
                      onBlur={handleBlur}
                    />
                    {touched.email && errors.email && (
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                </Form.Row>
                <Form.Group>
                  <Form.Label>Your state</Form.Label>
                  <Form.Control
                    as="select"
                    name="country"
                    value={values.country}
                    onChange={handleChange}
                    isValid={touched.country && !errors.country}
                    isInvalid={!!errors.country}
                    onBlurCapture={handleBlur}
                  >
                    <option value=""> Select State</option>
                    {this.props.us_state.map((state, index) => {
                      return (
                        <option key={index} value={state.code}>
                          {state.name}
                        </option>
                      );
                    })}
                  </Form.Control>{" "}
                  {touched.country && errors.country && (
                    <Form.Control.Feedback type="invalid">
                      {errors.country}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <Form.Row>
                  <Form.Group as={Col}>
                    <Row>
                      <Form.Label className="col-12"> Phone number</Form.Label>
                      <Col md="3">
                        <Form.Control
                          as="select"
                          name="zip"
                          value={values.zip}
                          onChange={handleChange}
                          isValid={touched.zip && !errors.zip}
                          isInvalid={!!errors.zip}
                          onBlurCapture={handleBlur}
                        >
                          <option value="+1">+1</option>
                        </Form.Control>
                        {touched.zip && errors.zip && (
                          <Form.Control.Feedback type="invalid">
                            {errors.zip}
                          </Form.Control.Feedback>
                        )}
                      </Col>
                      <Col>
                        <Form.Control
                          name="phone"
                          placeholder="Enter your phone number"
                          type="text"
                          value={values.phone}
                          onChange={handleChange}
                          isValid={touched.phone && !errors.phone}
                          isInvalid={!!errors.phone}
                          id="phoneNumber"
                          onBlurCapture={handleBlur}
                          onInput={Helper.verifyPhoneNumLength}
                        />
                        {touched.phone && errors.phone && (
                          <Form.Control.Feedback type="invalid">
                            {errors.phone}
                          </Form.Control.Feedback>
                        )}
                      </Col>
                    </Row>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group className="col-md-6">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      name="password"
                      type="password"
                      placeholder="Set your password"
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

                  <Form.Group className="col-md-6">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm password"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      isValid={
                        touched.confirmPassword && !errors.confirmPassword
                      }
                      isInvalid={!!errors.confirmPassword}
                      onBlurCapture={handleBlur}
                    />
                    {touched.confirmPassword && errors.confirmPassword && (
                      <Form.Control.Feedback type="invalid">
                        {errors.confirmPassword}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                </Form.Row>
                <Row style={{ marginBottom: "0px" }}>
                  <Col>
                    <ButtonSpinner
                      isSubmitting={isSubmitting}
                      title={"Continue to next step"}
                    />
                  </Col>
                </Row>
                {/* <Row>
                  <Col>
                    <Button
                      variant="outline-primary"
                      size="md"
                      block
                    >
                  <i class="fab fa-facebook-square"></i>    Sign up with facebook
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      variant="outline-danger"
                      size="md"
                      block
                    >
                      Sign up with Google{" "}
                    </Button>
                  </Col>
                </Row> */}
              </Form>
            )}
          </Formik>
        </Col>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  countries: state.miscellaneous.countries,
  us_state: state.miscellaneous.us_state,

  presentLoader: state.loader.presentLoader,
});

const mapDispatchToProps = {
  getAllCountries,
  sendPhoneVerificationCode,
  setToken,
  signupUser,
  loginAction,
};

SignupForm.propTypes = {
  signupUser: PropTypes.func,
  loginAction: PropTypes.func,
  setToken: PropTypes.func,
  destinationCountry: PropTypes.array,
  showLogin: PropTypes.bool,
  login: PropTypes.func,
  successfullySignup: PropTypes.func,
  getSourceCountry: PropTypes.func,
  presentLoader: PropTypes.bool,
  sendPhoneVerificationCode: PropTypes.func,
  getAllCountries: PropTypes.func,
  countries: PropTypes.array,
  us_state: PropTypes.array,
};
export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);

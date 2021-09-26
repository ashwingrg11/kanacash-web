import React, { Component } from "react";
import { Row, Col, Form, Modal } from "react-bootstrap";
import { Formik } from "formik";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as yup from "yup";
import PropTypes from "prop-types";
import ROUTES from "../../assets/Routes/Routes";
import ErrorCircle from "../../assets/images/error.svg";
import CrossButton from "../../assets/images/Cross.svg";
import { getCurrentUser } from "../../store/actions/UserDetailsActions";
import { loginAction } from "../../store/actions/Login";
import ButtonSpinner from "../../components/ButtonSpinner/ButtonSpinner";
import { getActiveAccountSideBar } from "../../store/actions/senderDetail";
import "./login.css";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: "",
    };
  }

  onClickLogin = (values, { setSubmitting }) => {
    let body = {
      email: values.email, //Nepal12344@yopmail.com
      password: values.password, //Password!
      // device: "deviceID", //`${fingerPrint}`,
    };
    this.setState({ errors: "" });
    setSubmitting(true);
    this.props
      .loginAction(body)
      .then((res) => {
        setSubmitting(false);
        if (res.status === "success") {
          this.props.getCurrentUser();
          this.props.close();
          if (res.role === "USER") {
            this.props.history.push(`${ROUTES.WELCOME}`);
          } else {
            localStorage.setItem("activeSideBar", "AdminDashboard");
            this.props.getActiveAccountSideBar("AdminDashboard");
            this.props.history.push(`${ROUTES.ADMIN_DASHBOARD}`);
          }
        } else {
          this.setState({ errors: `${res.errorMessage}` });
        }
      })
      .catch((err) => {
        setSubmitting(false);
        this.setState({ errors: err.errorMessage });
        // console.log("err in login ", err);
      });
  };

  render() {
    let schema = yup.object({
      email: yup
        .string()
        .required("This field cannot be empty.")
        .email("Please enter a valid email address."),
      password: yup.string().required("This field cannot be empty."),
    });
    let initialValue = {
      email: "",
      password: "",
    };

    return (
      <Modal
        show={this.props.show}
        onHide={this.props.close}
        centered
        size="md"
      >
        <Modal.Body className="theme-modal">
          <div
            style={{
              position: "absolute",
              top: "-10px",
              right: "-10px",
              cursor: "pointer",
            }}
            onClick={() => {
              this.setState({ errors: "" });
              this.props.close();
            }}
          >
            <img src={CrossButton} alt="CrossButton" />
          </div>
          <h2 className="sub-title">Sign in</h2>
          {this.state.errors && (
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
                {this.state.errors}
              </Col>
            </Row>
          )}
          <Formik
            validationSchema={schema}
            onSubmit={this.onClickLogin}
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
              <Form
                noValidate
                onSubmit={handleSubmit}
                className="theme-form login-Form"
              >
                <Form.Group>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    isValid={touched.email && !errors.email}
                    placeholder="Enter your Email Address"
                    onBlur={handleBlur}
                    isInvalid={!!errors.email}
                  />
                  {touched.email && errors.email && (
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Form.Group>
                  <Form.Label> Password</Form.Label>
                  <Form.Control
                    name="password"
                    type="password"
                    placeholder="Your Password"
                    value={values.password}
                    onChange={handleChange}
                    isValid={touched.password && !errors.password}
                    isInvalid={!!errors.password}
                    onBlur={handleBlur}
                  />
                  {touched.password && errors.password && (
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                <ButtonSpinner
                  isSubmitting={isSubmitting}
                  title={"Sign in and Continue"}
                />
                {/* <Button
                  disabled={isSubmitting}
                  block
                  type="submit"
                  className="bt btn-secondary btn-secondary-big"
                >
                  {isSubmitting ? (
                    <Spinner animation="border" />
                  ) : (
                    "Sign in and Continue"
                  )}
                </Button> */}
              </Form>
            )}
          </Formik>
          <Col className="forget-signup-button p-0">
            <NavLink
              to={{ pathname: `${ROUTES.SIGNUP}` }}
              onClick={this.props.close}
              className="signup-button-login"
            >
              Sign up for free!
            </NavLink>

            <NavLink
              to={{ pathname: `${ROUTES.FORGET_PASSWORD}` }}
              onClick={this.props.close}
              className="forgetpassword-button"
            >
              Forgot Password?
            </NavLink>
          </Col>
        </Modal.Body>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  status: state.auth.status,
});

const mapDispatchToProps = {
  loginAction,
  getCurrentUser,
  getActiveAccountSideBar,
};

Login.propTypes = {
  history: PropTypes.object,
  close: PropTypes.func,
  getCurrentUser: PropTypes.func,
  loginApi: PropTypes.func,
  show: PropTypes.bool,
  loginAction: PropTypes.func,
  getActiveAccountSideBar: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));

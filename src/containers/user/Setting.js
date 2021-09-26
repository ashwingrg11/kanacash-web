import React, { Component } from "react";
import { Row, Col, Card, Accordion, Form } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import * as api from "../../services/axios/authApi";
import ButtonSpinner from "../../components/ButtonSpinner/ButtonSpinner";
import PropTypes from "prop-types";

class Setting extends Component {
  changePassword = (value, { resetForm, setSubmitting }) => {
    setSubmitting(true);
    api
      .changePassword(value)
      .then((res) => {
        setSubmitting(false);
        if (res.status === 200) {
          this.props.handleChange({ success: true, data: res.data });
          resetForm();
        } else {
          this.props.handleChange({ success: false, data: res.data });
        }
      })
      .catch((err) => {
        console.log("res", err);

        setSubmitting(false);
        console.log("error in changeing password", err);
      });
  };
  render() {
    const lowercaseRegex = /(?=.*[a-z])/;
    const uppercaseRegex = /(?=.*[A-Z])/;
    const numericRegex = /(?=.*[0-9])/;
    const charactersRegex = /(?=.*[\^$*.[\]{}()?“!@#%&/><’:;|_~`])/;
    const schema = yup.object({
      oldPassword: yup
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
      newPassword: yup
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
      repeatPassword: yup
        .string()
        .required("This field cannot be empty.")
        .oneOf([yup.ref("newPassword")], "Password does not match."),
    });
    const initialValue = {
      oldPassword: "",
      newPassword: "",
      repeatPassword: "",
    };
    return (
      <>
        <Row>
          <Col className="activity-title">Settings </Col>
        </Row>
        <Row className="mt-3">
          <Col sm="12" className="card-block">
            <Accordion defaultActiveKey="0">
              <Card>
                <Accordion.Toggle
                  as={Card.Header}
                  eventKey="0"
                  style={{ background: "#fff" }}
                >
                  <h3 className="subhead-title mb-0">Security and Login</h3>{" "}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <Row>
                      <Col>
                        <div className="payment-block-wrap theme-form">
                          <Formik
                            validationSchema={schema}
                            onSubmit={this.changePassword}
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
                                  <Form.Label>Old Password</Form.Label>
                                  <Form.Control
                                    type="password"
                                    name="oldPassword"
                                    placeholder=" Enter old password"
                                    value={values.oldPassword}
                                    onChange={handleChange}
                                    isValid={
                                      touched.oldPassword && !errors.oldPassword
                                    }
                                    isInvalid={!!errors.oldPassword}
                                    onBlur={handleBlur}
                                  />
                                  {touched.oldPassword &&
                                    errors.oldPassword && (
                                      <Form.Control.Feedback type="invalid">
                                        {errors.oldPassword}
                                      </Form.Control.Feedback>
                                    )}
                                </Form.Group>
                                <Form.Group>
                                  <Form.Label>New Password</Form.Label>
                                  <Form.Control
                                    type="password"
                                    name="newPassword"
                                    placeholder="Enter new password"
                                    value={values.newPassword}
                                    onChange={handleChange}
                                    isValid={
                                      touched.newPassword && !errors.newPassword
                                    }
                                    isInvalid={!!errors.newPassword}
                                    onBlur={handleBlur}
                                  />
                                  {touched.newPassword &&
                                    errors.newPassword && (
                                      <Form.Control.Feedback type="invalid">
                                        {errors.newPassword}
                                      </Form.Control.Feedback>
                                    )}
                                </Form.Group>
                                <Form.Group>
                                  <Form.Label>Confirm Password </Form.Label>
                                  <Form.Control
                                    type="password"
                                    name="repeatPassword"
                                    placeholder="Confirm new password"
                                    value={values.repeatPassword}
                                    onChange={handleChange}
                                    isValid={
                                      touched.repeatPassword &&
                                      !errors.repeatPassword
                                    }
                                    isInvalid={!!errors.repeatPassword}
                                    onBlur={handleBlur}
                                  />
                                  {touched.repeatPassword &&
                                    errors.repeatPassword && (
                                      <Form.Control.Feedback type="invalid">
                                        {errors.repeatPassword}
                                      </Form.Control.Feedback>
                                    )}
                                </Form.Group>

                                <Form.Row>
                                  <ButtonSpinner
                                    isSubmitting={isSubmitting}
                                    title={"Reset Password"}
                                  />
                                </Form.Row>
                              </Form>
                            )}
                          </Formik>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>{" "}
          </Col>
        </Row>
      </>
    );
  }
}

Setting.propTypes = {
  handleChange: PropTypes.func,
};

export default withRouter(Setting);

import React, { Component } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ButtonSpinner from "../../components/ButtonSpinner/ButtonSpinner";
import BackArrow from "../../assets/images/backArrow.svg";
import { setBeneficiary } from "../../store/actions/senderDetail";
import Helper from "../../services/Helper";
const nameRegex = /^[A-Za-z]*\s*$/;
const addressRegex = /^[a-zA-Z0-9\s]*$/;
const schema = yup.object({
  firstName: yup
    .string()
    .required("This field cannot be empty.")
    .matches(nameRegex, "Please enter a valid name."),
  middleName: yup.string().matches(nameRegex, "Please enter a valid name."),
  lastName: yup
    .string()
    .required("This field cannot be empty.")
    .matches(nameRegex, "Please enter a valid name."),
  phoneNumber: yup
    .string()
    .required("This field cannot be empty.")
    .min(10, "Please enter valid phone number.")
    .max(10, "Please enter valid phone number."),
  state: yup.string().required("This field cannot be empty."),
  zip: yup.number().required("This field cannot be empty."),
  city: yup
    .string()
    .required("This field cannot be empty.")
    .matches(nameRegex, "Please enter a valid name of city."),
  country: yup.string().required("This field cannot be empty."),
  addressLine1: yup
    .string()
    .required("This field cannot be empty.")
    .matches(addressRegex, "Please enter a valid address."),
  postalCode: yup
    .string()
    .required("This field cannot be empty.")
    .min(6, "Please enter a valid postal code.")
    .max(6, "Please enter a valid postal code."),
});
const initialValue = {
  firstName: "",
  middleName: "",
  lastName: "",
  addressLine1: "",
  addressLine2: "",
  phoneNumber: "",
  state: "",
  zip: "+234",
  city: "",
  country: "",
  postalCode: "",
};
class AddBenificiaryForm extends Component {
  render() {
    return (
      <>
        <Row>
          <Col>
            <div className="payment-block-wrap">
              <h3 className="subhead-title">Please Add a new Beneficiary</h3>
              <Row>
                <Col className="theme-form">
                  <Formik
                    validationSchema={schema}
                    onSubmit={this.props.handleChange}
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
                        <Form.Row>
                          <Form.Group className="col-md-4">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                              type="text"
                              name="firstName"
                              value={values.firstName}
                              onChange={handleChange}
                              isValid={touched.firstName && !errors.firstName}
                              placeholder="First Name "
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
                            <Form.Label>Middle Name</Form.Label>
                            <Form.Control
                              type="text"
                              name="middleName"
                              value={values.middleName}
                              onChange={handleChange}
                              isValid={touched.middleName && !errors.middleName}
                              placeholder="Middle Name "
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
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                              type="text"
                              name="lastName"
                              value={values.lastName}
                              onChange={handleChange}
                              isValid={touched.lastName && !errors.lastName}
                              placeholder="Last Name"
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
                            <Form.Label>Address Line</Form.Label>
                            <Form.Control
                              type="text"
                              name="addressLine1"
                              placeholder="Address Line"
                              value={values.addressLine1}
                              onChange={handleChange}
                              isValid={
                                touched.addressLine1 && !errors.addressLine1
                              }
                              isInvalid={!!errors.addressLine1}
                              onBlurCapture={handleBlur}
                            />
                            {touched.addressLine1 && errors.addressLine1 && (
                              <Form.Control.Feedback type="invalid">
                                {errors.addressLine1}
                              </Form.Control.Feedback>
                            )}
                          </Form.Group>
                        </Form.Row>

                        <Form.Row>
                          <Form.Group className="col-md-6">
                            <Form.Label>Country</Form.Label>
                            <Form.Control
                              as="select"
                              name="country"
                              value={values.country}
                              onChange={handleChange}
                              isValid={touched.country && !errors.country}
                              isInvalid={!!errors.country}
                              placeholder="Select Country"
                              onBlurCapture={handleBlur}
                            >
                              <option value="">Select Country</option>
                              {this.props.destinationCountry.map(
                                (country, index) => {
                                  if (country.three_char_code === "NGA") {
                                    return (
                                      <option
                                        value={country.three_char_code}
                                        key={index}
                                      >
                                        {country.name}
                                      </option>
                                    );
                                  } else {
                                    return true;
                                  }
                                }
                              )}
                            </Form.Control>
                            {touched.country && errors.country && (
                              <Form.Control.Feedback type="invalid">
                                {errors.country}
                              </Form.Control.Feedback>
                            )}
                          </Form.Group>

                          <Form.Group className="col-md-6">
                            <Form.Label>State</Form.Label>
                            <Form.Control
                              as="select"
                              name="state"
                              value={values.state}
                              onChange={handleChange}
                              isValid={touched.state && !errors.state}
                              isInvalid={!!errors.state}
                              onBlurCapture={handleBlur}
                            >
                              <option value="">Select State</option>
                              {this.props.nga_state.map((country, index) => {
                                return (
                                  <option
                                    value={country.threeCharCode}
                                    key={index}
                                  >
                                    {country.name}
                                  </option>
                                );
                              })}
                            </Form.Control>
                            {touched.state && errors.state && (
                              <Form.Control.Feedback type="invalid">
                                {errors.state}
                              </Form.Control.Feedback>
                            )}
                          </Form.Group>
                        </Form.Row>
                        <Form.Row>
                          <Form.Group className="col-md-6">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                              name="city"
                              type="text"
                              placeholder="City"
                              value={values.city}
                              onChange={handleChange}
                              isValid={touched.city && !errors.city}
                              isInvalid={!!errors.city}
                              onBlurCapture={handleBlur}
                            />
                            {touched.city && errors.city && (
                              <Form.Control.Feedback type="invalid">
                                {errors.city}
                              </Form.Control.Feedback>
                            )}
                          </Form.Group>

                          <Form.Group className="col-md-6">
                            <Form.Label>Postal Code</Form.Label>
                            <Form.Control
                              name="postalCode"
                              type="number"
                              placeholder="Postal Code"
                              value={values.postalCode}
                              onChange={handleChange}
                              isValid={touched.postalCode && !errors.postalCode}
                              isInvalid={!!errors.postalCode}
                              onBlurCapture={handleBlur}
                              onInput={Helper.verifyPostalCodeLength}
                            />
                            {touched.postalCode && errors.postalCode && (
                              <Form.Control.Feedback type="invalid">
                                {errors.postalCode}
                              </Form.Control.Feedback>
                            )}
                          </Form.Group>
                        </Form.Row>

                        <Form.Row>
                          <Form.Group as={Col}>
                            <Form.Label>
                              {" "}
                              Phone number of the Beneficary{" "}
                            </Form.Label>
                            <Row>
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
                                  <option value="+234">+234</option>
                                  {/* <option value="+232">+232</option> */}
                                </Form.Control>
                                {touched.zip && errors.zip && (
                                  <Form.Control.Feedback type="invalid">
                                    {errors.zip}
                                  </Form.Control.Feedback>
                                )}
                              </Col>
                              <Col>
                                <Form.Control
                                  name="phoneNumber"
                                  placeholder="Enter Beneficiary's Phone Number"
                                  type="number"
                                  value={values.phoneNumber}
                                  onChange={handleChange}
                                  isValid={
                                    touched.phoneNumber && !errors.phoneNumber
                                  }
                                  isInvalid={!!errors.phoneNumber}
                                  onBlurCapture={handleBlur}
                                  onInput={Helper.verifyPhoneNumLength}
                                />
                                {touched.phoneNumber && errors.phoneNumber && (
                                  <Form.Control.Feedback type="invalid">
                                    {errors.phoneNumber}
                                  </Form.Control.Feedback>
                                )}
                              </Col>
                            </Row>
                          </Form.Group>
                        </Form.Row>

                        <div className="button-group">
                          <ButtonSpinner
                            block={false}
                            isSubmitting={isSubmitting}
                            title={"Click To Continue"}
                          />

                          <button
                            className="btn btn-back-arrow float-right"
                            onClick={() => {
                              this.props.handleBack();
                            }}
                          >
                            <img src={BackArrow} alt="BackArrow" />
                            Back{" "}
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </>
    );
  }
}
const mapActionToProps = { setBeneficiary };

const mapStateToProps = (state) => ({
  destinationCountry: state.miscellaneous.dest_country,
  nga_state: state.miscellaneous.nga_state,
});
AddBenificiaryForm.propTypes = {
  destinationCountry: PropTypes.array,
  handleBack: PropTypes.func,
  handleChange: PropTypes.func,
  nga_state: PropTypes.array,
};

export default connect(mapStateToProps, mapActionToProps)(AddBenificiaryForm);

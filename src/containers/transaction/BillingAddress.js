import React, { Component } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import { withRouter } from "react-router-dom";
import PropTypes from 'prop-types'

class BillingAddress extends Component {
    billingAddressEdited = (value) =>{
        this.props.billingAddressEdited(value)
    }
  render() {
    const schema = yup.object({
      address: yup.string().required("Please provide  address"),
      city: yup.string().required("Please provide city"),
      state: yup.string().required("Please provide  state"),
      zip: yup.string().required("Please provide Zip"),
      country: yup.string().required("Please provide Country"),
    });
    const initialValue = {
      address: "",
      city: "",
      state: "",
      country: "",
      zip: "",
    };
    return (
      <Row className="mb-3">
        <Col>
          {" "}
          <Formik
            validationSchema={schema}
            onSubmit={(values) => this.billingAddressEdited(values)}
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
                  <Form.Control
                    type="text"
                    name="address"
                    placeholder=" Name on Account"
                    value={values.address}
                    onChange={handleChange}
                    isValid={touched.address && !errors.address}
                    isInvalid={!!errors.address}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.address}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                  <Form.Control
                    type="text"
                    name="city"
                    value={values.city}
                    onChange={handleChange}
                    isValid={touched.city && !errors.city}
                    isInvalid={!!errors.city}
                    placeholder="City"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.city}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Control
                      name="state"
                      type="text"
                      placeholder="State"
                      value={values.state}
                      onChange={handleChange}
                      isValid={touched.state && !errors.state}
                      isInvalid={!!errors.state}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.state}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Control
                      name="zip"
                      type="number"
                      placeholder="zip/postal code"
                      value={values.zip}
                      onChange={handleChange}
                      isValid={touched.zip && !errors.zip}
                      isInvalid={!!errors.zip}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Form.Group>
                  <Form.Control
                    as="select"
                    name="country"
                    value={values.country}
                    onChange={handleChange}
                    isValid={touched.country && !errors.country}
                    isInvalid={!!errors.country}
                  >
                    <option value="">Choose Country</option>
                    <option value="Nepal">Nepal</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.country}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Row>
                  <Button variant="primary" size="lg" block type="submit">
                    Save Change{" "}
                  </Button>
                </Form.Row>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    );
  }
}
BillingAddress.propTypes = {
  billingAddressEdited : PropTypes.func
}

export default BillingAddress;

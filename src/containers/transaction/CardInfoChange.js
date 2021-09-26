import React, { Component } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import { withRouter } from "react-router-dom";
import PropTypes from 'prop-types'

class CardInfoChange extends Component {
  cardInfoEdited = (value) => {
    this.props.cardInfoEdited(value);
  };

  render() {
    const schema = yup.object({
      name: yup.string().required("Please provide  name in the card"),
      cardNumber: yup.string().required("Please provide card Number"),
      expiryMonth: yup.string().required("Please provide  expiry Month"),
      Year: yup.string().required("Please provide expiry Year"),
      SecurityCode: yup.string().required("Please provide SecurityCodeCode"),
    });
    const initialValue = {
      name: "",
      cardNumber: "",
      expiryMonth: "",
      Year: "",
      SecurityCode: "",
    };
    return (
      <Row className="mb-3">
        <Col>
          {" "}
          <Formik
            validationSchema={schema}
            onSubmit={(values) => this.cardInfoEdited(values)}
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
                    name="name"
                    placeholder=" Name on Card"
                    value={values.name}
                    onChange={handleChange}
                    isValid={touched.name && !errors.name}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                  <Form.Control
                    type="number"
                    name="cardNumber"
                    value={values.cardNumber}
                    onChange={handleChange}
                    isValid={touched.cardNumber && !errors.cardNumber}
                    isInvalid={!!errors.cardNumber}
                    placeholder="Card Number"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.cardNumber}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Control
                      as="select"
                      name="expiryMonth"
                      value={values.expiryMonth}
                      onChange={handleChange}
                      isValid={touched.expiryMonth && !errors.expiryMonth}
                      isInvalid={!!errors.expiryMonth}
                    >
                      <option value="">Expiry Month</option>
                      <option value="jan">jan</option>

                      <option value="jan">jan</option>
                      <option value="feb">feb</option>
                      <option value="march">march</option>
                      <option value="april">april</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.expiryMonth}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Control
                      as="select"
                      name="Year"
                      value={values.Year}
                      onChange={handleChange}
                      isValid={touched.Year && !errors.Year}
                      isInvalid={!!errors.Year}
                    >
                      <option value="">Year</option>
                      <option value="jan">jan</option>

                      <option value="jan">jan</option>
                      <option value="feb">feb</option>
                      <option value="march">march</option>
                      <option value="april">april</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.Year}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Form.Group>
                  <Form.Control
                    type="password"
                    name="SecurityCode"
                    placeholder=" Security Code"
                    value={values.SecurityCode}
                    onChange={handleChange}
                    isValid={touched.SecurityCode && !errors.SecurityCode}
                    isInvalid={!!errors.SecurityCode}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.SecurityCode}
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
CardInfoChange.propTypes ={
  cardInfoEdited : PropTypes.func
}

export default CardInfoChange;

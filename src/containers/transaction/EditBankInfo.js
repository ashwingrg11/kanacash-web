import React, { Component } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

class EditBankInfo extends Component {
    bankInfoEdited = (value) =>{
        this.props.bankInfoChanged(value)
    }
  render() {

    const schema = yup.object({
      name: yup.string().required("Please provide  Name in your account"),
      accountType: yup.string().required("Please provide accountType"),
      accNumber: yup.string().required("Please provide  account number"),
      routingNum: yup.string().required("Please provide routing number"),
    });
    const initialValue = {
      name: "",
      accountType: "",
      routingNum: "",
      accNumber: "",
    };

    
    return (
      <Row className="mb-3">
        <Col>
          {" "}
          <Formik
            validationSchema={schema}
            onSubmit={(values) => this.bankInfoEdited(values)}
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
                    placeholder=" Name on Account"
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
                    as="select"
                    name="accountType"
                    value={values.accountType}
                    onChange={handleChange}
                    isValid={touched.accountType && !errors.accountType}
                    isInvalid={!!errors.accountType}
                  >
                    <option value="">Choose Account</option>
                    <option value="Saving">Saving Account</option>

                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.accountType}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="number"
                    name="routingNum"
                    placeholder=" Routing Number"
                    value={values.routingNum}
                    onChange={handleChange}
                    isValid={touched.routingNum && !errors.routingNum}
                    isInvalid={!!errors.routingNum}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.routingNum}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="number"
                    name="accNumber"
                    placeholder=" Account Number"
                    value={values.accNumber}
                    onChange={handleChange}
                    isValid={touched.accNumber && !errors.accNumber}
                    isInvalid={!!errors.accNumber}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.accNumber}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Row>
                  <Button variant="primary" size="lg" block type="submit" >
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
EditBankInfo.propTypes ={
  bankInfoChanged : PropTypes.func,
}

export default EditBankInfo;

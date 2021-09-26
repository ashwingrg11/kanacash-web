import React, { Component } from "react";
import { Col, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import * as api from "../../services/axios/auxApi";
import BackArrow from "../../assets/images/backArrow.svg";
import PropTypes from "prop-types";
import ButtonSpinner from "../../components/ButtonSpinner/ButtonSpinner";

const schema = yup.object({
  bank: yup.number().required("This field cannot be empty."),
  accountNumber: yup.string().required("This field cannot be empty."),
});
const initialValue = {
  bank: "",
  accountNumber: "",
};
class BankForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bankList: [],
      loading: true,
    };
  }

  componentWillUnmount = () => {
    this.setState({
      bankList: [],
    });
  };

  componentDidMount = () => {
    this.setState({ loading: true });
    api
      .getBankByCountry(7)
      .then((res) => {
        this.setState({ bankList: res.data.results, loading: false });
      })
      .catch((err) => {
        this.setState({ loading: false });
        // console.log("error in getting bank", err);
      });
  };

  render() {
    return (
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
          <Form noValidate onSubmit={handleSubmit} className="theme-form">
            <Form.Row>
              <Form.Group as={Col}>
                <label>Pleae select bank</label>
                <Form.Control
                  as="select"
                  name="bank"
                  value={values.bank}
                  onChange={handleChange}
                  isValid={touched.bank && !errors.bank}
                  isInvalid={!!errors.bank}
                >
                  <option value="">Select the bank</option>
                  {this.state.bankList.map((bank, index) => {
                    return (
                      <option value={bank.id} key={index}>
                        {bank.name}
                      </option>
                    );
                  })}
                  {this.state.loading && <option value="">LOADING...</option>}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.bank}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <label>Account number</label>
                <Form.Control
                  name="accountNumber"
                  placeholder="Add account number"
                  type="number"
                  value={values.accountNumber}
                  onChange={handleChange}
                  isValid={touched.accountNumber && !errors.accountNumber}
                  isInvalid={!!errors.accountNumber}
                  className="special-input"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.accountNumber}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>

            <div className="button-group">
              <ButtonSpinner
                isSubmitting={isSubmitting}
                title={"Save"}
                block={false}
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
    );
  }
}

BankForm.propTypes = {
  handleChange: PropTypes.func,
  handleBack: PropTypes.func,
  country: PropTypes.string,
};

export default BankForm;

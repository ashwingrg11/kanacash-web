import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";

import { withRouter } from "react-router-dom";
import Header from "../../containers/layout/Header";
import {
  getBeneficiaries,
  setBeneficiary,
} from "../../store/actions/senderDetail";
import { connect } from "react-redux";
import Footer from "../../containers/layout/Footer";
import ROUTES from "../../assets/Routes/Routes";
import PropTypes from "prop-types";

import SendMoneyHeader from "../../containers/transaction/SendMoneyHeader";
import SendingMoneyDetail from "../../containers/transaction/SendingMoneyDetail";
import AddBeneficiaryForm from "../../containers/user/AddBeneficiaryForm";
import {
  getReceiverInfo,
  getReciverPaymentMethod,
  clearReceiverPaymentDetail,
} from "../../store/actions/TrasactionAction";
import * as api from "../../services/axios/senderApi";
import CustomAlert from "../../components/Alert/CustomAlert";
import Disclaimer from "../../components/Disclaimer/Disclaimer";
class BeneficiaryCreate extends Component {
  state = {
    showAlert: false,
    errorMessage: "",
    variant: "",
  };
  createBeneficiary = (values, { setSubmitting }) => {
    setSubmitting(true);
    const body = {
      first_name: values.firstName,
      middle_name: values.middleName,
      last_name: values.lastName,
      country: values.country,
      province: values.state,
      city: values.city,
      address_line1: values.addressLine1,
      postal_code: values.postalCode + "",
      mobile_phone: values.phoneNumber + "",
      // TODO: set it dynamic
      sender_relationship: "Sister",
    };
    api
      .createBeneficiary(body)
      .then((response) => {
        if (response.status === 200) {
          // console.log(response, 'beneficiary info');debugger
          let beneficiaryInfo = {
            beneficiaryId: response.data.id,
            country: response.data.country,
            province: response.data.province,
            first_name: response.data.first_name,
            last_name: response.data.last_name,
          };
          this.props.setBeneficiary();
          // if (this.props.payoutMehod === "bankPick") {
          this.props.history.push({
            pathname: `${ROUTES.BENEFICIARY_ADD_BANK_TRANSACTION}`,
            state: {
              country: `${values.country}`,
              beneficiary: beneficiaryInfo,
            },
          });
        } else {
          setSubmitting(false);
          this.setState({
            errorMessage: `${response.data.message}`,
            showAlert: true,
            variant: "danger",
          });
        }
      })
      .catch((err) => {
        setSubmitting(false);
      });
    //     this.props.history.push(`${ROUTES.BENEFICIARY_LIST}`)
  };

  render() {
    return (
      <>
        <Header />
        <div className="shadow-line"></div>
        <section className="theme-inner">
          <Container>
            <SendMoneyHeader />

            <Row>
              <Col className="steps-content-block">
                <h2 className="sub-title text-md-center text-lg-left">
                  Beneficiary details
                </h2>

                <Row className="mt-md-4">
                  <Col
                    md={{ span: 8, offset: 2 }}
                    sm="12"
                    lg={{ span: 6, offset: 0 }}
                    className="pr-lg-0 mb-md-5 mb-lg-0"
                  >
                    <Row>
                      <Col>
                        {" "}
                        <AddBeneficiaryForm
                          handleChange={this.createBeneficiary}
                          handleBack={() => {
                            this.props.history.push(
                              `${ROUTES.BENEFICIARY_DETAIL}`
                            );
                          }}
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col
                    md={{ span: 8, offset: 2 }}
                    sm="12"
                    lg={{ span: 5, offset: 1 }}
                    className="sumary-bar"
                  >
                    <SendingMoneyDetail />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </section>

        <Footer />
        {!localStorage.acceptPolicy && <Disclaimer />}

        <CustomAlert
          message={this.state.errorMessage}
          show={this.state.showAlert}
          variant={this.state.variant}
          close={() => this.setState({ showAlert: false })}
        />
      </>
    );
  }
}
BeneficiaryCreate.propTypes = {
  payoutMehod: PropTypes.string,
  history: PropTypes.object,
  getReceiverInfo: PropTypes.func,
  setBeneficiary: PropTypes.func,
};
const mapStateToProps = (state) => ({
  payoutMehod: state.senderDetail.payoutMehod,
  acceptPolicy: state.auth.accept_policy,
});
const mapActionToProps = {
  getBeneficiaries,
  setBeneficiary,
  getReciverPaymentMethod,
  getReceiverInfo,

  clearReceiverPaymentDetail,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withRouter(BeneficiaryCreate));

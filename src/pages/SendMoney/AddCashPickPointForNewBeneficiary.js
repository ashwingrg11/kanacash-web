import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import PropTypes from "prop-types";

import { withRouter } from "react-router-dom";
import Header from "../../containers/layout/Header";
import { getReciverPaymentMethod } from "../../store/actions/TrasactionAction";
import { connect } from "react-redux";
import Footer from "../../containers/layout/Footer";
import { getBeneficiaries } from "../../store/actions/senderDetail";
import SendMoneyHeader from "../../containers/transaction/SendMoneyHeader";
import SendingMoneyDetail from "../../containers/transaction/SendingMoneyDetail";
import * as api from "../../services/axios/auxApi";
import CustomDropdown from "../../components/Dropdown/Dropdown";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import ROUTES from "../../assets/Routes/Routes";
import BackArrow from "../../assets/images/backArrow.svg";
import Disclaimer from "../../components/Disclaimer/Disclaimer";
class AddCashPickPointForNewBeneficiary extends Component {
  state = {
    cashPickupPoint: [],
  };
  componentDidMount = () => {
    api
      .getListOfLocationForCashPickUp({
        country: `${this.props?.location?.state?.country}`,
      })
      .then((res) => {
        this.setState({ cashPickupPoint: res.data.result });
      });
  };
  componentWillUnmount = () => {
    this.setState({
      cashPickupPoint: [],
    });
  };

  setReceiverCashPickUpPoint = () => {
    this.setState({ receiverPaymentMethodError: "" });

    this.state.cashPickupPoint.map((cashPickup) => {
      if (
        cashPickup.referenceId ===
        parseInt(document.getElementById("cashPickPoint").value)
      ) {
        let receiverPaymentMethod = {};
        this.props.getBeneficiaries();

        receiverPaymentMethod.payoutMethod = "CASH_PICKUP";
        receiverPaymentMethod.payoutDetail = cashPickup;
        this.setState({ receiverPaymentMethod: receiverPaymentMethod });
      }
      return true;
    });
  };

  addBeneficiary = () => {
    this.setState({
      beneficiaryError: "",
    });
    if (document.getElementById("cashPickPoint").value === "") {
      this.setState({ beneficiaryError: "This field cannot be empty." });
    } else {
      this.state.cashPickupPoint.map((cashPickup) => {
        if (
          cashPickup.referenceId ===
          parseInt(document.getElementById("cashPickPoint").value)
        ) {
          let receiverPaymentMethod = {};

          receiverPaymentMethod.payoutMethod = "CASH_PICKUP";
          receiverPaymentMethod.payoutDetail = cashPickup;
          this.props.getReciverPaymentMethod(receiverPaymentMethod);
          this.props.history.push(`${ROUTES.PAYMENT_INFO}`);
        }
        return true;
      });
    }
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
                <h2 className="sub-title">Beneficiary details</h2>
                <Row className="mt-4">
                  <Col md="6" sm="12" className="pr-md-0 theme-form">
                    <Row>
                      <Col>
                        <label>Please select payer</label>
                        <CustomDropdown
                          id="cashPickPoint"
                          handleChange={this.setReceiverCashPickUpPoint}
                          options={this.state.cashPickupPoint}
                          title="Select Cash Point"
                          optionValue="name"
                        />
                        {this.state.receiverPaymentMethodError && (
                          <ErrorMessage
                            errorMessage={this.state.receiverPaymentMethodError}
                          />
                        )}
                      </Col>
                    </Row>

                    <div className="button-group mt-2">
                      <button
                        onClick={() => this.addBeneficiary()}
                        className="btn btn-secondary"
                      >
                        {" "}
                        Add the beneficiary{" "}
                      </button>
                      <button
                        className="btn btn-back-arrow float-right"
                        onClick={() => {
                          this.props.history.push(
                            `${ROUTES.BENEFICIARY_PAYMENT_METHOD}`
                          );
                        }}
                      >
                        <img src={BackArrow} alt="BackArrow" />
                        Back{" "}
                      </button>
                    </div>
                  </Col>
                  <Col
                    md="6"
                    sm="12"
                    xl={{ span: 5, offset: 1 }}
                    className="sumary-bar"
                  >
                    {" "}
                    <SendingMoneyDetail />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </section>

        <Footer />
        {!localStorage.acceptPolicy && <Disclaimer />}
      </>
    );
  }
}

AddCashPickPointForNewBeneficiary.propTypes = {
  getBeneficiaries: PropTypes.func,
  history: PropTypes.object,
  location: PropTypes.object,
  getReciverPaymentMethod: PropTypes.func,
};

const mapActionToProps = {
  getReciverPaymentMethod,
  getBeneficiaries,
};

const mapStateToProps = (state) => ({
  acceptPolicy: state.auth.accept_policy,
});

export default connect(
  mapStateToProps,
  mapActionToProps
)(withRouter(AddCashPickPointForNewBeneficiary));

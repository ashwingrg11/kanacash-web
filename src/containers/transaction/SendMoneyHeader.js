import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import PaymentInfoGreen from "../../assets/images/SendMoneyHeader/PaymentInfoGreen.svg";
import PaymentInfoGrey from "../../assets/images/SendMoneyHeader/PaymentInfoGrey.svg";
import PaymentInfoBlue from "../../assets/images/SendMoneyHeader/PaymentInfoBlue.svg";
import BeneficiaryDetailGreen from "../../assets/images/SendMoneyHeader/BeneficiaryDetailGreen.svg";
import BeneficiaryDetailGrey from "../../assets/images/SendMoneyHeader/BeneficiaryDetailGrey.svg";
import BeneficiaryDetailBlue from "../../assets/images/SendMoneyHeader/BeneficiaryDetailBlue.svg";
import PaymentDetailGreen from "../../assets/images/SendMoneyHeader/PaymentDetailGreen.svg";
import PaymentDetailBlue from "../../assets/images/SendMoneyHeader/PaymentDetailBlue.svg";
import ReviewDetailGrey from "../../assets/images/SendMoneyHeader/ReviewDetailGrey.svg";
import SenderDetailGrey from "../../assets/images/SendMoneyHeader/SenderDetailGrey.svg";
import SenderDetailGreen from "../../assets/images/SendMoneyHeader/SenderDetailGreen.svg";
import ReviewDetailGreen from "../../assets/images/SendMoneyHeader/ReviewDetailGreen.svg";
import ROUTES from "../../assets/Routes/Routes";
import PropTypes from "prop-types";
import { isEmpty } from "../../utils/isEmpty";

class SendMoneyHeader extends Component {
  state = {
    showSenderDetail: false,
  };
  componentDidMount = () => {
    if (!localStorage.accessToken) {
      this.setState({ showSenderDetail: true });
    } else if (
      this.props.user.status !== "UNVERIFIED" &&
      this.props.user.status !== "SUSPENDED" &&
      this.props.user.status !== "RETRY" &&
      this.props.user.status !== "REVIEW_PENDING" &&
      this.props.user.status !== undefined
    ) {
      this.setState({ showSenderDetail: false });
    } else {
      this.setState({ showSenderDetail: true });
    }
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.user !== this.props.user) {
      if (!localStorage.accessToken) {
        this.setState({ showSenderDetail: true });
      } else if (
        this.props.user.status !== "UNVERIFIED" &&
        this.props.user.status !== "SUSPENDED"
      ) {
        this.setState({ showSenderDetail: false });
      } else {
        this.setState({ showSenderDetail: true });
      }
    }
  };

  render() {
    return (
      <Row className="transaction-steps">
        <Col>
          <div className="d-flex justify-content-left align-items-center">
            {!isEmpty(this.props.transactionDetail) ? (
              <>
                <div
                  className="blue-block payment-step"
                  onClick={() =>
                    this.props.history.push(`${ROUTES.PAYMENT_DETAIL}`)
                  }
                  style={{ curser: "pointer" }}
                >
                  {" "}
                  <img src={PaymentDetailBlue} alt="PaymentDetailBlue" />
                  <span className="steps-title">Payment Details</span>{" "}
                </div>
              </>
            ) : (
              <div className="green-block payment-step">
                {" "}
                <img src={PaymentDetailGreen} alt="paymentDetailGreen" />
                <span className="steps-title">Payment Details</span>{" "}
              </div>
            )}
          </div>
        </Col>
        {this.state.showSenderDetail && (
          <Col>
            <div className="d-flex justify-content-left align-items-center">
              {isEmpty(this.props.transactionDetail) ? (
                <>
                  <div className="gray-block sender-step">
                    {" "}
                    <img src={SenderDetailGrey} alt="SenderDetailGrey" />
                    <span className="steps-title">Sender Details</span>
                  </div>{" "}
                </>
              ) : (
                <>
                  <div className="green-block sender-step">
                    {" "}
                    <img src={SenderDetailGreen} alt="SenderDetailGreen" />
                    <span className="steps-title">Sender Details</span>
                  </div>{" "}
                </>
              )}
            </div>
          </Col>
        )}

        <Col>
          <div className="d-flex justify-content-left align-items-center">
            {!isEmpty(this.props.transactionDetail) &&
            !isEmpty(this.props.receiverPaymentMethod) &&
            this.props.user.status === "VERIFIED" ? (
              <>
                <div
                  className="blue-block beneficiary-step"
                  onClick={() =>
                    this.props.history.push(`${ROUTES.BENEFICIARY_DETAIL}`)
                  }
                  style={{ curser: "pointer" }}
                >
                  {" "}
                  <img
                    src={BeneficiaryDetailBlue}
                    alt="BeneficiaryDetailBlue"
                  />
                  <span className="steps-title">Beneficiary Details</span>
                </div>{" "}
              </>
            ) : this.props.loginStatus &&
              !isEmpty(this.props.transactionDetail) &&
              this.props.user.status === "VERIFIED" &&
              isEmpty(this.props.receiverPaymentMethod) ? (
              <>
                {" "}
                <div className="green-block beneficiary-step">
                  <img
                    src={BeneficiaryDetailGreen}
                    alt="BeneficiaryDetailGreen"
                  />
                  <span className="steps-title">Beneficiary Details</span>
                </div>
              </>
            ) : (
              <>
                {" "}
                <div className="gray-block beneficiary-step">
                  <img
                    src={BeneficiaryDetailGrey}
                    alt="BeneficiaryDetailGrey"
                  />
                  <span className="steps-title">Beneficiary Details</span>
                </div>
              </>
            )}
          </div>
        </Col>
        <Col>
          <div className="d-flex justify-content-left align-items-center">
            {!isEmpty(this.props.transactionDetail) &&
            !isEmpty(this.props.receiverPaymentMethod) &&
            !isEmpty(this.props.senderPaymentMethod) ? (
              <>
                <div
                  className="blue-block pay-info-step"
                  onClick={() =>
                    this.props.history.push(`${ROUTES.PAYMENT_INFO}`)
                  }
                  style={{ curser: "pointer" }}
                >
                  {" "}
                  <img src={PaymentInfoBlue} alt="PaymentInfoBlue" />
                  <span className="steps-title">Payment Information</span>
                </div>
              </>
            ) : !isEmpty(this.props.transactionDetail) &&
              !isEmpty(this.props.receiverPaymentMethod) &&
              isEmpty(this.props.senderPaymentMethod) ? (
              <>
                {" "}
                <div className="green-block pay-info-step">
                  <img src={PaymentInfoGreen} alt="PaymentInfoGreen" />
                  <span className="steps-title">Payment Information</span>
                </div>
              </>
            ) : (
              <>
                {" "}
                <div className="gray-block pay-info-step">
                  <img src={PaymentInfoGrey} alt="paymentInfoGrey" />
                  <span className="steps-title">Payment Information</span>
                </div>
              </>
            )}
          </div>
        </Col>
        <Col>
          <div className="d-flex justify-content-left align-items-center">
            {!isEmpty(this.props.transactionDetail) &&
            !isEmpty(this.props.senderPaymentMethod) &&
            !isEmpty(this.props.receiverPaymentMethod) ? (
              <>
                <div className="green-block review-step last-step">
                  <img src={ReviewDetailGreen} alt="ReviewDetailGreen" />
                  <span className="steps-title">Review Details</span>
                </div>
              </>
            ) : (
              <>
                <div className="gray-block review-step last-step">
                  <img src={ReviewDetailGrey} alt="ReviewDetailGrey" />
                  <span className="steps-title">Review Details</span>
                </div>
              </>
            )}
          </div>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => ({
  receiverPaymentMethod: state.transaction.receiverPaymentMethod,
  receiverInfo: state.transaction.receiverInfo,
  transactionDetail: state.transaction.transactionDetail,
  senderPaymentMethod: state.transaction.senderPaymentMethod,
  loginStatus: state.auth.isAuthenticated,
  user: state.auth.user,
});

SendMoneyHeader.propTypes = {
  receiverPaymentMethod: PropTypes.object,
  receiverInfo: PropTypes.object,
  transactionDetail: PropTypes.object,
  senderPaymentMethod: PropTypes.object,
  loginStatus: PropTypes.bool,
  status: PropTypes.object,
  history: PropTypes.object,
  user: PropTypes.object,
};

export default connect(mapStateToProps, null)(withRouter(SendMoneyHeader));

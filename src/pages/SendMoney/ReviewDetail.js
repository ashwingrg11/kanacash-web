import React, { Component } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import BackArrow from "../../assets/images/backArrow.svg";
import "./sendMoney.css";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import SendingMoneyDetail from "../../containers/transaction/SendingMoneyDetail";
import { connect } from "react-redux";
import SenderUserDetail from "../../containers/transaction/SenderUserDetail";
import ReciverUserDetail from "../../containers/transaction/ReciverUserDetail";
import CreditCardSvg from "../../assets/images/creditcard.svg";
import BankLogoSvg from "../../assets/images/BankLogoSvg.svg";
import BankoutSvg from "../../assets/images/bank-out.svg";
import SenderBankInfo from "../../containers/transaction/SenderBankInfo";
import SenderCardInfo from "../../containers/transaction/SenderCardInfo";
import ReciverBankInfo from "../../containers/transaction/ReciverBankInfo";
import { createTransaction } from "../../services/axios/transactionApi";
import AuthorizationModal from "../../containers/transaction/AuthorizationModal";
import SendMoneyHeader from "../../containers/transaction/SendMoneyHeader";
import {
  clearTransactionData,
  getTransactionAmount,
} from "../../store/actions/TrasactionAction";
import { getSenderTransactionLimit } from "../../store/actions/senderDetail";
import RightArrow from "../../assets/images/icons/RightArrow.svg";
import Footer from "../../containers/layout/Footer";
import Header from "../../containers/layout/Header";
import CustomAlert from "../../components/Alert/CustomAlert";
import CustomSpinner from "../../components/CustomSpinner";
import ROUTES from "../../assets/Routes/Routes";
import Disclaimer from "../../components/Disclaimer/Disclaimer";
class ReviewDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAuthorizationModal: false,
      errorMessage: "",
      variant: "",
      showAlert: false,
      loading: false,
      transferFee: "",
      isSubmitting: false,
    };
  }
  componentWillUnmount = () => {
    this.setState({
      showAuthorizationModal: false,
      errorMessage: "",
      variant: "",
      showAlert: false,
      loading: false,
      transferFee: "",
    });
  };

  closeModal = () => {
    this.setState({ showAuthorizationModal: false });
  };

  closeAlert = () => {
    this.setState({ showAlert: false, variant: "", errorMessage: "" });
  };

  sendMoney = () => {
    this.setState({ showAuthorizationModal: true });
  };

  componentDidMount = () => {
    console.log("transaction", this.props.transactionDetail);
    let transferFee;
    let senderPaymentMethod;
    if (this.props.senderPaymentMethod.payoutMethod === "BANK") {
      senderPaymentMethod = "BANK";
    } else {
      senderPaymentMethod = "CARD";
    }
    // console.log("this.", this.props.transactionDetail.feeAmount);
    if (this.props.transactionDetail.feeAmount !== undefined) {
      const findTransferFee = this.props.transactionDetail.feeAmount.find(
        (item) => {
          return (
            item.senderPayment === senderPaymentMethod &&
            item.receiverPayout ===
              this.props.receiverPaymentMethod.payoutMethod
          );
        }
      );
      transferFee = findTransferFee;
      let body = {
        feeAmount: this.props.transactionDetail.feeAmount,
        exchangeRate: this.props.transactionDetail.exchangeRate,
        senderAmount: this.props.transactionDetail.senderAmount,
        recipientAmount: this.props.transactionDetail.recipientAmount,
        recipientCurrency: "USD",
        destinationCountry: this.props.transactionDetail.destinationCountry,
        minFee: findTransferFee.feeRange,
        selectedCountry: this.props.transactionDetail.selectedCountry,
      };
      this.props.getTransactionAmount(body);
      localStorage.setItem("transactionDetail", JSON.stringify(body));
    } else {
      transferFee = { feeRange: this.props.transactionDetail?.minFee };
    }

    this.setState({ transferFee });
  };

  continueSendMoney = () => {
    this.setState({ isSubmitting: true });
    let body = {};
    // body = this.props.transactionDetail;
    body.recipientId = this.props.receiverInfo.beneficiaryId;
    body.payoutMethod = this.props.receiverPaymentMethod.payoutMethod;
    body.fundingSource = this.props.senderPaymentMethod.payoutMethod;
    body.senderFundingAccountId = this.props.senderPaymentMethod.payoutDetail.id;
    body.recipientBankId = this.props.receiverPaymentMethod.payoutDetail.beneficiaryAccountId;
    body.exchangeRate = this.props.transactionDetail.exchangeRate;
    body.senderAmount = parseFloat(this.props.transactionDetail.senderAmount);
    body.recipientAmount = this.props.transactionDetail.recipientAmount;
    body.recipientCurrency = this.props.transactionDetail.selectedCountry.currency.code;
    body.destinationCountry = this.props.transactionDetail.destinationCountry;
    body.feeAmount = parseFloat(this.state.transferFee.feeRange);
    body.remittancePurpose = "Land Purchase";
    body.ipAddress = "27.34.104.241";

    createTransaction(body)
      .then((res) => {
        this.props.getSenderTransactionLimit();
        localStorage.removeItem("activeSideBar");
        localStorage.removeItem("transactionDetail");
        localStorage.removeItem("beneficiaryInfo");
        localStorage.removeItem("beneficiaryDetail");
        localStorage.removeItem("senderPaymentDetail");
        this.setState({ isSubmitting: false });
        const pushObject = {
          pathname: ROUTES.CONGRATULATION_PAGE,
          state: this.props.receiverInfo,
        };
        this.props.clearTransactionData();
        this.props.history.push(pushObject);
      })
      .catch((err) => {
        this.setState({ isSubmitting: false });
        // if (typeof err.response.data.message === "object") {
        //   this.setState({
        //     errorMessage: `${JSON.parse(err.response.data.message).message}`,
        //     showAlert: true,
        //     variant: "danger",
        //   });
        // } else {
        //   this.setState({
        //     errorMessage: `${err.response.data.message}`,
        //     showAlert: true,
        //     variant: "danger",
        //   });
        // }
      });
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
                  {" "}
                  Here is your transaction summary
                </h2>
                <p
                  style={{ fontSize: "18px" }}
                  className="text-md-center text-lg-left"
                >
                  Please review to make sure everything is correct before
                  proceeding.
                </p>
                <Row>
                  <Col
                    md={{ span: 8, offset: 2 }}
                    sm="12"
                    lg={{ span: 7, offset: 0 }}
                    className="pr-lg-0 mb-md-5 mb-lg-0"
                  >
                    <Row>
                      <Col className="pr-xl-0">
                        {this.props.receiverInfo && (
                          <Card style={{ padding: "20px" }}>
                            {this.state.loading && <CustomSpinner />}
                            <Row>
                              <Col
                                sm="5"
                                xs="5"
                                className="review-info sender-review"
                              >
                                <h3 className="review-title green-title">
                                  {" "}
                                  Sender Information
                                </h3>
                                <SenderUserDetail
                                  userDetail={this.props.user}
                                />
                              </Col>
                              <Col sm="2" xs="2" className="arrow text-center">
                                {" "}
                                <Row style={{ marginTop: "30px" }}>
                                  <Col>
                                    <img src={RightArrow} alt="RightArrow" />
                                  </Col>
                                </Row>
                              </Col>
                              <Col
                                sm="5"
                                xs="5"
                                className="review-info receiver-review"
                              >
                                <h3 className="review-title green-title">
                                  {" "}
                                  Recipient Information
                                </h3>
                                <ReciverUserDetail
                                  receiverInfo={this.props.receiverInfo}
                                />
                              </Col>
                            </Row>
                            <Row>
                              <Col
                                sm="5"
                                xs="5"
                                className="review-info sender-review"
                              >
                                <div className="review-sub-block">
                                  <h3 className="review-title">
                                    Payment Method{" "}
                                  </h3>
                                  <div className="review-method">
                                    {this.props.senderPaymentMethod
                                      .payoutMethod === "CARD" ? (
                                      <>
                                        <img
                                          alt="CreditCardSvg"
                                          src={CreditCardSvg}
                                        />
                                        Credit Card{" "}
                                        <span
                                          onClick={() =>
                                            this.props.history.push(
                                              `${ROUTES.PAYMENT_INFO}`
                                            )
                                          }
                                        >
                                          ( Change )
                                        </span>{" "}
                                      </>
                                    ) : (
                                      <>
                                        <img
                                          alt="BankLogoSvg"
                                          src={BankLogoSvg}
                                        />
                                        Bank{" "}
                                        <span
                                          onClick={() =>
                                            this.props.history.push(
                                              `${ROUTES.PAYMENT_INFO}`
                                            )
                                          }
                                        >
                                          ( Change )
                                        </span>{" "}
                                      </>
                                    )}{" "}
                                  </div>
                                </div>
                                <div className="review-sub-block payment-info-show">
                                  {this.props.senderPaymentMethod
                                    .payoutMethod === "CARD" ? (
                                    <SenderCardInfo
                                      cardInfo={
                                        this.props.senderPaymentMethod
                                          .payoutDetail
                                      }
                                      userDetail={this.props.user}
                                    />
                                  ) : (
                                    <SenderBankInfo
                                      bankInfo={
                                        this.props.senderPaymentMethod
                                          .payoutDetail
                                      }
                                      userDetail={this.props.user}
                                    />
                                  )}
                                </div>
                              </Col>
                              <Col sm="2" xs="2" className="arrow text-center">
                                {" "}
                                <Row style={{ marginTop: "60px" }}>
                                  <Col>
                                    <img src={RightArrow} alt="RightArrow" />
                                  </Col>
                                </Row>
                              </Col>
                              <Col
                                sm="5"
                                xs="5"
                                className="review-info receiver-review"
                              >
                                <div className="review-sub-block">
                                  <h3 className="review-title">
                                    Payout Method{" "}
                                  </h3>
                                  <div className="review-method">
                                    {this.props.receiverPaymentMethod
                                      .payoutMethod === "CASH_PICKUP" ? (
                                      <>
                                        <img
                                          src={CreditCardSvg}
                                          alt="CreditCardSvg"
                                        />
                                        Cash Pick{" "}
                                        <span
                                          onClick={() =>
                                            this.props.history.push(
                                              `${ROUTES.BENEFICIARY_DETAIL}`
                                            )
                                          }
                                        >
                                          ( Change )
                                        </span>{" "}
                                      </>
                                    ) : (
                                      <>
                                        <img
                                          src={BankoutSvg}
                                          alt="BankoutSvg"
                                        />
                                        Bank Deposit{" "}
                                        <span
                                          onClick={() =>
                                            this.props.history.push(
                                              `${ROUTES.BENEFICIARY_DETAIL}`
                                            )
                                          }
                                        >
                                          ( Change )
                                        </span>{" "}
                                      </>
                                    )}{" "}
                                  </div>
                                </div>
                                <div className="review-sub-block payment-info-show">
                                  {/* {this.props.receiverPaymentMethod
                                  .payoutMethod === "CASH_PICKUP" ? (
                                  <ReciverCashPickUpInfo
                                    cashPickUpInfo={
                                      this.props.receiverPaymentMethod
                                        .payoutDetail
                                    }
                                  />
                                ) : ( */}
                                  <ReciverBankInfo
                                    bankInfo={
                                      this.props.receiverPaymentMethod
                                        .payoutDetail
                                    }
                                  />
                                  {/* )} */}
                                </div>
                              </Col>
                            </Row>
                          </Card>
                        )}
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-0">
                        <div
                          className="button-group mt-3"
                          style={{ maxWidth: "100%" }}
                        >
                          <button
                            onClick={() => {
                              this.sendMoney();
                            }}
                            className="btn btn-secondary"
                          >
                            {" "}
                            Send Money Now !
                          </button>
                          <button
                            className="btn btn-back-arrow float-right"
                            onClick={() => {
                              this.props.history.push(`${ROUTES.PAYMENT_INFO}`);
                            }}
                          >
                            <img src={BackArrow} alt="BackArrow" />
                            Back{" "}
                          </button>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col
                    md={{ span: 8, offset: 2 }}
                    sm="12"
                    lg={{ span: 5, offset: 0 }}
                    className="sumary-bar"
                  >
                    <SendingMoneyDetail />
                  </Col>
                </Row>
              </Col>
            </Row>{" "}
          </Container>
        </section>

        <Footer />
        {!localStorage.acceptPolicy && <Disclaimer />}

        <AuthorizationModal
          isSubmitting={this.state.isSubmitting}
          show={this.state.showAuthorizationModal}
          close={this.closeModal}
          continue={this.continueSendMoney}
        />
        <CustomAlert
          show={this.state.showAlert}
          message={this.state.errorMessage}
          variant={this.state.variant}
          close={this.closeAlert}
        />
      </>
    );
  }
}
const mapActionToProps = {
  clearTransactionData,
  getTransactionAmount,
  getSenderTransactionLimit,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  senderPaymentMethod: state.transaction.senderPaymentMethod,
  receiverPaymentMethod: state.transaction.receiverPaymentMethod,
  receiverInfo: state.transaction.receiverInfo,
  transactionDetail: state.transaction.transactionDetail,
  acceptPolicy: state.auth.accept_policy,
});

ReviewDetail.propTypes = {
  history: PropTypes.object,
  user: PropTypes.object,
  senderPaymentMethod: PropTypes.object,
  receiverPaymentMethod: PropTypes.object,
  receiverInfo: PropTypes.object,
  transactionDetail: PropTypes.object,
  clearTransactionData: PropTypes.func,
  getTransactionAmount: PropTypes.func,
  getSenderTransactionLimit: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withRouter(ReviewDetail));

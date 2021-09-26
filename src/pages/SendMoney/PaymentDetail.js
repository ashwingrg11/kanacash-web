import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Header from "../../containers/layout/Header";
import ROUTES from "../../assets/Routes/Routes";
import COLORS from "../../assets/Color/Color";
import { connect } from "react-redux";
import Footer from "../../containers/layout/Footer";
import "./sendMoney.css";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import {
  getTransactionAmount,
  getTransferFee,
  clearPaymentDetail,
} from "../../store/actions/TrasactionAction";
import { getActiveAccountSideBar } from "../../store/actions/senderDetail";
import IllSign from "../../assets/images/illSign.svg";
import SendMoneyHeader from "../../containers/transaction/SendMoneyHeader";
import { InputDropdown } from "../../components/CustomDropdown";
import Disclaimer from "../../components/Disclaimer/Disclaimer";
const PaymentDetail = (props) => {
  const [state, setState] = React.useState({
    errorMessage: "",
    limitExceed: "",
    sendCurrency: "",
    receiveCurrency: "",
    selectedCountry: null,
    minFee: "",
    showFee: false,
    transferFee: [],
    senderLimit: 500, //TODO: get dynamic value
    exchangeRate: {},
    disableButton: false,
    isSelectedCountryEmpty: "",
    destinationList: [],
  });

  const countrySelect = (value) => {
    localStorage.setItem("selectedCountry", JSON.stringify(value));
    setState((prevState) => ({
      ...prevState,
      selectedCountry: value,
      isSelectedCountryEmpty: "",
      disableButton: false,
      sendCurrency: "",
      receiveCurrency: "",
    }));
  };

  React.useEffect(() => {
    if (!!props.exchange_rate && !!state.selectedCountry) {
      const exchangeRate = props.exchange_rate.find(
        (item) =>
          item.destination_currency === state.selectedCountry.currency.code &&
          item.source_currency === "USD"
      );
      setState((prevState) => ({ ...prevState, exchangeRate: exchangeRate }));
    }
  }, [props.exchange_rate, state.selectedCountry, props.destinationCountry]);

  const handleChange = (e) => {
    const value = Math.abs(e.target.value);
    const name = e.target.name;
    setState((prevState) => ({
      ...prevState,
      errorMessage: "",
      limitExceed: "",
      disableButton: false,
    }));
    if (name === "sendCurrency") {
      setState((prevState) => ({
        ...prevState,
        sendCurrency: value,
        receiveCurrency: value * state.exchangeRate.rate,
      }));
      if (0 > value) {
        setState((prevState) => ({
          ...prevState,
          limitExceed: `Amount cannot be negative  `,
          disableButton: true,
        }));
      }
      if (0 === parseInt(value)) {
        setState((prevState) => ({
          ...prevState,
          errorMessage: "Transaction amount cannot be zero.",
          disableButton: true,
        }));
      }
      if (props.senderTransactionLimit.current_tier === "LEVEL2") {
        if (1000 >= value) {
          if (state.senderLimit < value) {
            setState((prevState) => ({
              ...prevState,
              limitExceed: `Maximum amount is $ ${state.senderLimit} `,
              disableButton: true,
            }));
          }
        } else {
          setState((prevState) => ({
            ...prevState,
            limitExceed: `Maximum amount is $1000`,
            disableButton: true,
          }));
        }
      } else if (props.senderTransactionLimit.current_tier === "LEVEL2") {
        if (2000 >= value) {
          if (state.senderLimit < value) {
            setState((prevState) => ({
              ...prevState,
              limitExceed: `Maximum amount is $ ${state.senderLimit} `,
              disableButton: true,
            }));
          }
        } else {
          setState((prevState) => ({
            ...prevState,
            limitExceed: `Maximum amount is $2000`,
            disableButton: true,
          }));
        }
      } else {
        if (state.senderLimit < value) {
          setState((prevState) => ({
            ...prevState,
            limitExceed: `Maximum amount is $ ${state.senderLimit} `,
            disableButton: true,
          }));
        }
      }
    } else if (name === "receiveCurrency") {
      setState((prevState) => ({
        ...prevState,
        receiveCurrency: value,
        sendCurrency: (value / state.exchangeRate.rate).toFixed(2),
      }));
      if (state.senderLimit * state.exchangeRate.rate < value) {
        setState((prevState) => ({
          ...prevState,
          errorMessage: "Transaction amount limit exceeded.",
        }));
      }
    }
  };

  React.useEffect(() => {
    if (!!props.transferFee) {
      let transferFee = [];
      let minFees = [];
      props.transferFee.forEach((result) => {
        const feeRanges = result.feeRanges.find(
          (element) =>
            state.sendCurrency >= element.minAmount &&
            state.sendCurrency <= element.maxAmount
        );
        if (feeRanges !== undefined) {
          transferFee.push({
            senderPayment: result.paymentMethod,
            receiverPayout: result.payoutMethod,
            currency: result.currency,
            feeRange: (
              feeRanges.flatFee +
              (state.sendCurrency * feeRanges.percentageFee) / 100
            ).toFixed(2),
          });
          minFees.push(
            (
              feeRanges.flatFee +
              (state.sendCurrency * feeRanges.percentageFee) / 100
            ).toFixed(2)
          );
        }
      });
      if (Math.min(...minFees) !== Infinity) {
        setState((prevState) => ({
          ...prevState,
          minFee: Math.min(...minFees),
        }));
      } else {
        setState((prevState) => ({ ...prevState, minFee: 0 }));
      }
      setState((prevState) => ({ ...prevState, transferFee }));
    }
    if (!!props.senderTransactionLimit.sender) {
      setState((prevState) => ({
        ...prevState,
        senderLimit: props.senderTransactionLimit.sender.limit,
      }));
    }
  }, [
    state.receiveCurrency,
    state.sendCurrency,
    props.transferFee,
    props.senderTransactionLimit,
  ]);

  const NextStep = () => {
    if (!state.sendCurrency && !state.receiveCurrency) {
      if (!state.selectedCountry) {
        setState((prevState) => ({
          ...prevState,
          isSelectedCountryEmpty: "This field cannot be empty.",
          errorMessage: "This field cannot be empty.",

          disableButton: true,
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          errorMessage: "This field cannot be empty.",
          disableButton: true,
        }));
      }
    } else if (
      state.sendCurrency &&
      state.receiveCurrency &&
      !state.selectedCountry
    ) {
      setState((prevState) => ({
        ...prevState,
        isSelectedCountryEmpty: "This field cannot be empty.",
        disableButton: true,
      }));
    } else {
      let body = {
        feeAmount: state.transferFee,
        exchangeRate: state.exchangeRate.rate,
        senderAmount: state.sendCurrency,
        recipientAmount: state.receiveCurrency,
        recipientCurrency: "USD",
        destinationCountry: state.selectedCountry.three_char_code,
        minFee: state.minFee,
        selectedCountry: state.selectedCountry,
      };
      props.getTransactionAmount(body);
      localStorage.setItem("transactionDetail", JSON.stringify(body));

      if (props.loginStatus) {
        if (props.user.status === "VERIFIED") {
          props.history.push(`${ROUTES.BENEFICIARY_DETAIL}`);
        } else if (
          props.user.status === "UNVERIFIED" ||
          props.user.status === "SUSPENDED" ||
          props.user.status === "RETRY" ||
          props.user.status === "REVIEW_PENDING"
        ) {
          if (
            props.user.isPhoneVerified !== 0 &&
            props.user.isEmailVerified !== 0
          ) {
            props.history.push(`${ROUTES.SENDER_DETAIL_KYC_TRANSACTION}`);
          } else if (
            props.user.isPhoneVerified === 0 &&
            props.user.isEmailVerified === 0
          ) {
            localStorage.setItem("signUpFromTransaction", true);

            props.history.push(`${ROUTES.PHONE_VERIFICATION}`);
          } else if (
            props.user.isEmailVerified === 0 &&
            props.user.isPhoneVerified !== 0
          ) {
            localStorage.setItem("signUpFromTransaction", true);

            props.history.push(`${ROUTES.EMAIL_VERIFICATION}`);
          }
        }
      } else {
        props.history.push(`${ROUTES.SENDER_DETAIL}`);
      }
    }
  };

  React.useEffect(
    () => {
      if (props.transactionDetail) {
        setState((prevState) => ({
          ...prevState,
          selectedCountry: props.transactionDetail.selectedCountry,
          sendCurrency: props.transactionDetail.senderAmount,
          receiveCurrency: props.transactionDetail.recipientAmount,
        }));
      }
      props.getTransferFee();
      props.getActiveAccountSideBar("Profile");
      props.clearPaymentDetail();
      localStorage.setItem("activeSideBar", "Profile");
      localStorage.removeItem("transactionDetail");
      localStorage.removeItem("beneficiaryInfo");
      localStorage.removeItem("beneficiaryDetail");
    },
    //eslint-disable-next-line
    [
      props.getTransferFee,
      props.clearPaymentDetail,
      props.getActiveAccountSideBar,
    ]
  );

  React.useEffect(() => {
    if (!!props.destinationCountry) {
      const filterDestinationCountry = props.destinationCountry.filter(
        (item) => item.three_char_code !== "USA"
      );

      setState((prevState) => ({
        ...prevState,
        destinationList: filterDestinationCountry,
        // selectedCountry: props.location.state,
      }));
      if (localStorage.selectedCountry) {
        setState((prevState) => ({
          ...prevState,
          // destinationList: filterDestinationCountry,
          selectedCountry: JSON.parse(localStorage.selectedCountry),
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          // destinationList: filterDestinationCountry,
          selectedCountry: props.destinationCountry[1],
        }));
      }
    }
  }, [
    props.transactionDetail,
    props.transferFee,
    props.destinationCountry,
    props.exchange_rate,
  ]);

  return (
    <React.Fragment>
      <Header />
      <div className="shadow-line"></div>
      <section className="theme-inner">
        <Container>
          <SendMoneyHeader />
          <Row className="d-flex justify-content-center">
            <Col className="steps-content-block" md="8" sm="12" xl="5">
              {" "}
              <h2 className="sub-title text-center">Enter the send amount</h2>
              <Col className="p-0">
                <Col className="p-0">
                  <div className="calculator steps-calculator">
                    <InputDropdown
                      pickerValue={"name"}
                      label={"Send money to"}
                      option={state.destinationList}
                      value={state.selectedCountry}
                      onChangeOption={(value) => countrySelect(value)}
                    />
                  </div>
                  <div>
                    {state.isSelectedCountryEmpty ? (
                      <p
                        style={{ fontSize: ".8rem", width: "100%" }}
                        className="p-2 text-danger mb-1"
                      >
                        {state.isSelectedCountryEmpty}
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                </Col>
                <Col className="fee-block">
                  <Row>
                    <Col>
                      <Row>
                        <Col
                          style={{
                            color: "#4F4F4F",
                            fontWeight: "400",
                          }}
                        >
                          Exchange Rate
                        </Col>
                      </Row>
                      <Row>
                        <Col
                          style={{
                            color: `${COLORS.BLACK_COLOR}`,
                            fontWeight: "bold",
                          }}
                        >
                          1 USD ={" "}
                          {state.exchangeRate &&
                            state.exchangeRate.rate +
                              " " +
                              state.exchangeRate.destination_currency}
                        </Col>
                      </Row>
                    </Col>
                    <Col>
                      <Row>
                        <Col
                          style={{
                            color: "#4F4F4F",
                            fontWeight: "400",
                          }}
                        >
                          Estimated Transfer Fee
                        </Col>
                      </Row>
                      <Row>
                        <Col
                          style={{
                            color: `${COLORS.BLACK_COLOR}`,
                            fontWeight: "bold",
                          }}
                        >
                          {state.minFee} USD{" "}
                          <button
                            onClick={() =>
                              setState((prevState) => ({
                                ...prevState,
                                showFee: !state.showFee,
                              }))
                            }
                            style={{
                              backgroundColor: "transparent",
                              border: "none",
                            }}
                          >
                            <img src={IllSign} alt="IllSign" />
                          </button>
                        </Col>
                      </Row>
                    </Col>{" "}
                  </Row>
                </Col>
                {state.showFee && state.transferFee && (
                  <>
                    <Col className="fee-list">
                      {state.transferFee.length > 0 ? "" : "N/A"}
                      {state.transferFee.map((result, index) => {
                        return (
                          <Row key={index}>
                            <Col className="p-0" md="4" xs="4">
                              {result.senderPayment}
                            </Col>
                            <Col className="p-0 text-center" md="1" xs="1 ">
                              -
                            </Col>
                            <Col className="p-0" md="5" xs="5">
                              {result.receiverPayout} ({result.currency})
                            </Col>
                            <Col className="p-0" md="2" xs="2">
                              {result.feeRange}
                            </Col>
                          </Row>
                        );
                      })}
                    </Col>
                  </>
                  // <FeeCalculation0
                  // transferFee={state.transferFee}
                  // />
                )}
              </Col>
              <Col className="money-block">
                <Row>
                  <Col className="m-0 col-10">
                    <p className="small m-0">Sending amount</p>
                    <Row>
                      {" "}
                      <input
                        type="number"
                        name="sendCurrency"
                        style={{
                          width: "100%",
                          paddingLeft: "16px",
                          background: "transparent",
                          border: "none",
                          outline: "none",
                        }}
                        value={state.sendCurrency || ""}
                        placeholder="0"
                        onChange={handleChange}
                      />
                    </Row>
                  </Col>
                  <Col className="currency-label align-self-end pl-0 col-2 text-right">
                    USD
                  </Col>
                </Row>
                <div className="row">
                  {state.errorMessage ? (
                    <p
                      style={{ fontSize: ".8rem", width: "100%" }}
                      className="p-2 text-danger mb-1"
                    >
                      {state.errorMessage}
                    </p>
                  ) : (
                    ""
                  )}
                  {state.limitExceed ? (
                    <p
                      style={{ fontSize: ".8rem", width: "100%" }}
                      className="p-2 text-danger mb-1"
                    >
                      {state.limitExceed}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </Col>
              <Col className="money-block">
                <Row>
                  <Col className="m-0 col-10">
                    <p className="small m-0"> Receiving amount</p>
                    <Row>
                      <input
                        type="number"
                        name="receiveCurrency"
                        style={{
                          width: "100%",
                          paddingLeft: "16px",
                          background: "transparent",
                          border: "none",
                          outline: "none",
                        }}
                        value={state.receiveCurrency || ""}
                        onChange={handleChange}
                        placeholder="0"
                      />
                    </Row>
                  </Col>
                  <Col className="currency-label align-self-end pl-0 col-2 text-right">
                    {state.selectedCountry &&
                      state.selectedCountry.three_char_code}
                  </Col>
                </Row>
                <Row>
                  {state.errorMessage ? (
                    <p
                      style={{ fontSize: ".8rem", width: "100%" }}
                      className="p-2 text-danger mb-1"
                    >
                      {state.errorMessage}
                    </p>
                  ) : (
                    ""
                  )}
                </Row>
              </Col>{" "}
              <p>The exchange rate guaranteed for 30 minutes only.</p>
              <Button
                className="btn btn-secondary btn-secondary-big"
                block
                onClick={NextStep}
                disabled={state.disableButton}
              >
                Continue to Next Step
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
      {!localStorage.acceptPolicy && <Disclaimer />}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  loginStatus: state.auth.isAuthenticated,
  destinationCountry: state.miscellaneous.dest_country,
  exchange_rate: state.miscellaneous.exchange_rate,
  transferFee: state.transaction.transferFee,
  // status: state.auth.status,
  user: state.auth.user,
  senderTransactionLimit: state.senderDetail.senderTransactionLimit,
  transactionDetail: state.transaction.transactionDetail,
  acceptPolicy: state.auth.accept_policy,
});

PaymentDetail.propTypes = {
  loginStatus: PropTypes.bool,
  destinationCountry: PropTypes.array,
  exchange_rate: PropTypes.array,
  transferFee: PropTypes.array,
  status: PropTypes.object,
  senderTransactionLimit: PropTypes.object,
  history: PropTypes.object,
  getTransactionAmount: PropTypes.func,
  getTransferFee: PropTypes.func,
  clearPaymentDetail: PropTypes.func,
  getActiveAccountSideBar: PropTypes.func,
  user: PropTypes.object,
  transactionDetail: PropTypes.object,
};

const mapActionToProps = {
  getTransactionAmount,
  getTransferFee,
  clearPaymentDetail,
  getActiveAccountSideBar,
};
export default connect(
  mapStateToProps,
  mapActionToProps
)(withRouter(PaymentDetail));

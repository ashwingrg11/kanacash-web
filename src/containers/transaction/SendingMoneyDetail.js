import React from "react";
import { Row, Col, Card } from "react-bootstrap";
// import Flag from "../assets/images/nepalflag.png";
import ROUTES from "../../assets/Routes/Routes";
import COLORS from "../../assets/Color/Color";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

const imgSrc = (countryCode) =>
  `https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.2.1/flags/4x3/${countryCode?.toLowerCase()}.svg`;
const SendingMoneyDetail = (props) => {
  return (
    <Row>
      <Col>
        <Card className="summary-card">
          {props.transactionDetail && (
            <>
              {" "}
              <h2 className="sub-title">Summary</h2>{" "}
              <p className="small"> Sending money to</p>{" "}
              <div className="send-country">
                {" "}
                <span className="country-flag">
                  <img
                    alt="flag"
                    src={imgSrc(
                      props.transactionDetail?.selectedCountry?.two_char_code
                    )}
                  />
                </span>{" "}
                <span className="sub-title">
                  {props.transactionDetail?.selectedCountry?.name}
                </span>{" "}
              </div>
              <div>
                <hr style={{ borderColor: `${COLORS.BLACK_COLOR}` }} />
              </div>
              <Row>
                <Col>
                  <Row className="mt-3">
                    <Col>
                      Send Amount{" "}
                      <span
                        className="btn-link"
                        onClick={() =>
                          props.history.push(`${ROUTES.PAYMENT_DETAIL}`)
                        }
                        style={{
                          cursor: "pointer",
                          color: `${COLORS.PRIMARY_COLOR}`,
                        }}
                      >
                        edit
                      </span>
                    </Col>
                    <Col
                      className="d-flex justify-content-end"
                      style={{ fontWeight: "bold" }}
                    >
                      USD {props.transactionDetail?.senderAmount}
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col>Transaction Fee</Col>
                    <Col
                      className="d-flex justify-content-end"
                      style={{ fontWeight: "bold" }}
                    >
                      USD {props.transactionDetail.minFee}
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col>Total Amount</Col>
                    <Col
                      className="d-flex justify-content-end"
                      style={{
                        fontWeight: "bold",
                        color: `${COLORS.PRIMARY_COLOR}`,
                      }}
                    >
                      USD{" "}
                      {(
                        parseFloat(props.transactionDetail?.senderAmount) +
                        parseFloat(props.transactionDetail?.minFee)
                      ).toFixed(2)}
                    </Col>
                  </Row>
                  <Row
                    style={{
                      height: "40px",
                      backgroundColor: `${COLORS.LIGHT_BLUE}`,
                    }}
                    className="d-flex align-items-center mt-3 xchange-rate"
                  >
                    <Col>Exchange Rate</Col>
                    <Col
                      className="d-flex justify-content-end"
                      style={{ fontWeight: "bold" }}
                    >
                      USD 1 ={" "}
                      {props.transactionDetail?.selectedCountry?.currency?.code}{" "}
                      {props.transactionDetail?.exchangeRate}
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col>Receive Amount</Col>
                    <Col
                      className="d-flex justify-content-end"
                      style={{ fontWeight: "bold" }}
                    >
                      {props.transactionDetail?.selectedCountry?.currency?.code}{" "}
                      {props.transactionDetail?.recipientAmount}
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col>Payment Type</Col>
                    <Col
                      className="d-flex justify-content-end"
                      style={{ fontWeight: "bold" }}
                    >
                      {props.senderPaymentMethod.payoutMethod
                        ? props.senderPaymentMethod.payoutMethod
                        : "TBD"}
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col>Receive Type</Col>
                    <Col
                      className="d-flex justify-content-end"
                      style={{ fontWeight: "bold" }}
                    >
                      {props.receiverPaymentMethod.payoutMethod
                        ? props.receiverPaymentMethod.payoutMethod
                        : "TBD"}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </>
          )}
        </Card>
      </Col>
    </Row>
  );
};

SendingMoneyDetail.propTypes = {
  transactionDetail: PropTypes.object,
  senderPaymentMethod: PropTypes.object,
  receiverPaymentMethod: PropTypes.object,
  history: PropTypes.object,
};
const mapStateToProps = (state) => ({
  transactionDetail: state.transaction.transactionDetail,
  senderPaymentMethod: state.transaction.senderPaymentMethod,
  receiverPaymentMethod: state.transaction.receiverPaymentMethod,
});

export default connect(mapStateToProps, null)(withRouter(SendingMoneyDetail));

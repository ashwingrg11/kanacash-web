import React, { Component } from "react";
import { Row, Col, Accordion, Card, Form } from "react-bootstrap";
//import COLORS from "../../assets/Color/Color";
import DebitCardInfo from "./DebitCardInfo";
import BankInfoCard from "./BankInfoCard";
import { connect } from "react-redux";
import AddCardWidget from "../../components/Modal/WidgetModal";
import OnlineBanking from "../../assets/images/icons/onlineBanking.svg";
import DebitCardimg from "../../assets/images/icons/Debit.svg";
import { withRouter } from "react-router-dom";
import ROUTES from "../../assets/Routes/Routes";
import BackArrow from "../../assets/images/backArrow.svg";
import {
  getSenderPaymentMethod,
  clearSenderPaymentDetail,
} from "../../store/actions/TrasactionAction";
import {
  getSenderCards,
  getSenderBank,
} from "../../store/actions/senderDetail";
import PropTypes from "prop-types";

class PaymentInfomation extends Component {
  state = {
    bankInfoChange: false,
    statementInfoChange: false,
    cardInfoChange: false,
    billingInfoChange: false,
    senderPaymentMethodError: "",
    noPaymentMethodError: "",
    senderPaymentMethod: "",
    showBankWidget: false,
    showCardWidget: false,
    key: "",
  };

  toggleCheckBox = (checkboxId) => {
    this.setState({
      senderPaymentMethodError: "",
      noPaymentMethodError: "",
      senderPaymentMethod: "",
    });
    document.getElementById("bankCheckbox").checked = false;
    document.getElementById("debitCheckbox").checked = false;
    document.getElementById(`${checkboxId}`).checked = !document.getElementById(
      `${checkboxId}`
    ).checked;
    if (checkboxId === "bankCheckbox") {
      this.setState({ key: "0" });
      document.getElementById("cardValue").value = "";
    } else if (checkboxId === "debitCheckbox") {
      document.getElementById("bankValue").value = "";
      this.setState({ key: "1" });
    }
  };

  setSenderBankDetail = () => {
    this.setState({
      senderPaymentMethodError: "",
      noPaymentMethodError: "",
      key: "0",
    });
    if (document.getElementById("bankValue").value !== "") {
      const findBank = this.props.senderBanks.find(
        (item) => item.id === document.getElementById("bankValue").value
      );

      let senderPaymentMethod = {
        payoutMethod: "BANK",
        payoutDetail: findBank,
      };
      this.setState({ senderPaymentMethod });
    } else {
      this.setState({ senderPaymentMethod: "" });
    }
  };

  setSenderDebitDetail = () => {
    this.setState({
      senderPaymentMethodError: "",
      noPaymentMethodError: "",
      key: "1",
    });

    if (document.getElementById("cardValue").value !== "") {
      const findCard = this.props.senderCards.find(
        (item) => item.id === document.getElementById("cardValue").value
      );
      let senderPaymentMethod = {
        payoutMethod: "CARD",
        payoutDetail: findCard,
      };
      this.setState({ senderPaymentMethod });
    } else {
      this.setState({ senderPaymentMethod: "" });
    }
  };

  closeMessage = () => {
    this.setState({ showBankWidget: false, showCardWidget: false });
  };

  nextStep = () => {
    if (this._mount) {
      this.setState({
        senderPaymentMethodError: "",
        noPaymentMethodError: "",
      });
      if (this.state.senderPaymentMethod) {
        this.props.getSenderPaymentMethod(this.state.senderPaymentMethod);
        localStorage.setItem(
          "senderPaymentDetail",
          JSON.stringify(this.state.senderPaymentMethod)
        );

        this.props.history.push(`${ROUTES.REVIEW_DETAIL}`);
      } else {
        this.setState({
          senderPaymentMethodError: "This field cannot be empty.",
        });
      }
    }
  };
  componentDidMount = () => {
    // document.getElementById("bankCheckbox").checked = true;
    this._mount = true;
    if (this._mount) {
      if (this.props.senderPaymentInfo) {
        if (this.props.senderPaymentInfo.payoutMethod === "BANK") {
          document.getElementById(
            "bankValue"
          ).value = this.props.senderPaymentInfo.payoutDetail.id;
          document.getElementById("bankCheckbox").checked = true;
          this.setState({ key: "0" }, () => {
            this.setSenderBankDetail();
          });
        } else if (this.props.senderPaymentInfo.payoutMethod === "CARD") {
          document.getElementById(
            "cardValue"
          ).value = this.props.senderPaymentInfo.payoutDetail.id;
          document.getElementById("bankCheckbox").checked = false;
          document.getElementById("debitCheckbox").checked = true;
          this.setState({ key: "1" }, () => {
            this.setSenderDebitDetail();
          });
        }
      }
      this.props.clearSenderPaymentDetail();
    }
  };
  componentWillUnmount = () => {
    this._mount = false;
  };

  addBank = (value) => {
    this.props.getSenderBank();
    this.props.bankAdded(value);
  };

  addCard = (value) => {
    this.props.getSenderCards();
    this.props.cardAdded(value);
  };

  render() {
    return (
      <>
        <Row>
          <Col>
            <Accordion activeKey={this.state.key}>
              <div className="payment-block-wrap card-accordion">
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey="0">
                    <div
                      onClick={() => this.toggleCheckBox("bankCheckbox")}
                      className="accordion-pay-wrap checkbox-wrap"
                    >
                      <input type="checkbox" id="bankCheckbox" />
                      <label className="info" htmlFor="checkbox">
                        <img src={OnlineBanking} alt="OnlineBanking" />
                        <span className="payment-type">
                          Pay through online banking{" "}
                        </span>
                        <p className="small">
                          Your bank account will be charged
                        </p>
                      </label>
                    </div>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      <Row>
                        <Col>Please select your bank.</Col>
                      </Row>

                      <Row style={{ marginTop: "10px" }}>
                        <Col>
                          {" "}
                          <Form className="theme-form">
                            <Form.Group>
                              <Form.Control
                                as="select"
                                id="bankValue"
                                size="lg"
                                onChange={() => this.setSenderBankDetail()}
                                // value={this.state.senderPaymentMethod.payoutDetail?.id}
                              >
                                <option value="">Select the Bank</option>
                                {this.props.senderBanks.map((bank, index) => {
                                  return (
                                    <option value={bank.id} key={index}>
                                      {bank.institution_name}
                                    </option>
                                  );
                                })}
                                {this.props.presentLoader && (
                                  <option value="">LOADING...</option>
                                )}
                              </Form.Control>
                            </Form.Group>
                          </Form>
                        </Col>
                      </Row>
                      <Row>
                        {this.state.senderPaymentMethodError ? (
                          <p
                            style={{
                              fontSize: ".8rem",
                              width: "100%",
                            }}
                            className="p-2 text-danger mb-1"
                          >
                            {this.state.senderPaymentMethodError}
                          </p>
                        ) : (
                          ""
                        )}
                      </Row>
                      {this.state.senderPaymentMethod && (
                        <Row>
                          <Col className="bank-info-card">
                            <BankInfoCard
                              bankInfo={
                                this.state.senderPaymentMethod.payoutDetail
                              }
                            />
                          </Col>
                        </Row>
                      )}
                      <Row>
                        <Col>
                          or,
                          <span
                            onClick={() =>
                              this.setState({
                                showBankWidget: true,
                              })
                            }
                            style={{ cursor: "pointer" }}
                            className="btn-text"
                          >
                            {" "}
                            add bank
                          </span>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </div>
              <div className="payment-block-wrap card-accordion">
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey="1">
                    <div
                      onClick={() => this.toggleCheckBox("debitCheckbox")}
                      className="accordion-pay-wrap checkbox-wrap"
                    >
                      <input type="checkbox" id="debitCheckbox" />
                      <label className="info" htmlFor="checkbox">
                        <img
                          src={DebitCardimg}
                          alt="DetailCardImg"
                          height="20px"
                          width="25px"
                        />
                        <span className="payment-type">Use Debit Card</span>
                        <p className="small">
                          Your credit card will be charged
                        </p>
                      </label>
                    </div>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="1">
                    <Card.Body>
                      <Row>
                        <Col>Please select your Debit Card.</Col>
                      </Row>

                      <Row style={{ marginTop: "10px" }}>
                        <Col>
                          {" "}
                          <Form className="theme-form">
                            <Form.Group>
                              <Form.Control
                                as="select"
                                id="cardValue"
                                size="lg"
                                onChange={() => this.setSenderDebitDetail()}
                                value={
                                  this.state.senderPaymentMethod.payoutDetail
                                    ?.id
                                }
                              >
                                <option value="">Select the Debit Card</option>
                                {this.props.senderCards.map((bank, index) => {
                                  return (
                                    <option value={bank.id} key={index}>
                                      {bank.institution_name}
                                    </option>
                                  );
                                })}
                                {this.props.presentLoader && (
                                  <option value="">LOADING...</option>
                                )}
                              </Form.Control>
                            </Form.Group>
                          </Form>
                        </Col>
                      </Row>
                      <Row>
                        {this.state.senderPaymentMethodError ? (
                          <p
                            style={{
                              fontSize: ".8rem",
                              width: "100%",
                            }}
                            className="p-2 text-danger mb-1"
                          >
                            {this.state.senderPaymentMethodError}
                          </p>
                        ) : (
                          ""
                        )}
                      </Row>
                      {this.state.senderPaymentMethod && (
                        <Row>
                          <Col className="bank-info-card">
                            <DebitCardInfo
                              cardInfo={
                                this.state.senderPaymentMethod.payoutDetail
                              }
                            />
                          </Col>
                        </Row>
                      )}
                      <Row>
                        <Col>
                          or,
                          <span
                            onClick={() =>
                              this.setState({
                                showCardWidget: true,
                              })
                            }
                            className="btn-text"
                            style={{ cursor: "pointer" }}
                          >
                            {" "}
                            add debit card
                          </span>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </div>
            </Accordion>
          </Col>
        </Row>
        <div className="button-group">
          <button onClick={() => this.nextStep()} className="btn btn-secondary">
            {" "}
            Continue to next Step{" "}
          </button>
          <button
            className="btn btn-back-arrow float-right"
            onClick={() => {
              this.props.history.push(`${ROUTES.BENEFICIARY_DETAIL}`);
            }}
          >
            <img src={BackArrow} alt="BackArrow" />
            Back{" "}
          </button>
        </div>
        <AddCardWidget
          show={this.state.showCardWidget}
          close={this.closeMessage}
          handleChange={(e) => this.addCard(e)}
          type="card"
        />
        <AddCardWidget
          show={this.state.showBankWidget}
          close={this.closeMessage}
          handleChange={(e) => this.addBank(e)}
          type="bank"
        />
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  senderBanks: state.senderDetail.senderBanks,
  senderCards: state.senderDetail.senderCards,
  senderPaymentInfo: state.transaction.senderPaymentMethod,
  presentLoader: state.loader.presentLoader,
});
const mapActionToProps = {
  getSenderPaymentMethod,
  getSenderCards,
  getSenderBank,
  clearSenderPaymentDetail,
};

PaymentInfomation.propTypes = {
  getSenderPaymentMethod: PropTypes.func,
  getSenderCards: PropTypes.func,
  getSenderBank: PropTypes.func,
  clearSenderPaymentDetail: PropTypes.func,
  senderBanks: PropTypes.array,
  senderCards: PropTypes.array,
  senderPaymentInfo: PropTypes.object,
  bankAdded: PropTypes.func,
  cardAdded: PropTypes.func,
  history: PropTypes.object,
  presentLoader: PropTypes.bool,
};
export default connect(
  mapStateToProps,
  mapActionToProps
)(withRouter(PaymentInfomation));

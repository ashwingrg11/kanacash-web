import React, { Component } from "react";
import { Row, Col, Accordion, Card } from "react-bootstrap";
import BankForm from "./BankForm";
import BankImg from "../../assets/images/icons/BankWithArrow.svg";
import PropTypes from "prop-types";

class AddPayout extends Component {
  toggleCheckBox = (checkboxId) => {
    document.getElementById("bankCheckbox").checked = false;
    // document.getElementById("cashCheckbox").checked = false;
    document.getElementById(`${checkboxId}`).checked = !document.getElementById(
      `${checkboxId}`
    ).checked;
  };
  render() {
    return (
      <>
        <h3 className="subhead-title mt-3">Add new Payout Method</h3>

        <Row>
          <Col>
            <Accordion>
              <div className="payment-block-wrap card-accordion">
                {/* <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                  <div
                    className="accordion-pay-wrap checkbox-wrap"
                    onClick={() => this.toggleCheckBox("cashCheckbox")}
                  >
                    <input type="checkbox" id="cashCheckbox" />
                    <label className="info" htmlFor="checkbox">
                      <img src={CashPickImg} alt="CashPickImg" />
                      <span className="payment-type">
                        {" "}
                        Cash Pickup and Delivery
                      </span>
                      <p className="small">
                        Pickup cash from a bank branch location{" "}
                      </p>
                    </label>
                  </div>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                      <div
                        style={{
                          backgroundColor: `${COLORS.LIGHT_BLUE}`,
                          color: `${COLORS.BLACK_COLOR}`,
                          fontSize: "12px",
                        }}
                        className="d-flex justify-content-center p-2"
                      >
                        Cash pickup is already enabled. Please continue.
                      </div>
                    <Row className="mt-4">
                      <Col>
                        <button className="btn btn-secondary"
                          onClick={() => this.props.cashPick()}
                        >
                          Continue
                        </button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Accordion.Collapse>
              </Card> */}
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey="1">
                    <div
                      className="accordion-pay-wrap checkbox-wrap"
                      onClick={() => this.toggleCheckBox("bankCheckbox")}
                    >
                      <input type="checkbox" id="bankCheckbox" />
                      <label className="info" htmlFor="checkbox">
                        <img src={BankImg} alt="BankImg" />
                        <span className="payment-type"> Bank Deposit</span>
                        <p className="small">
                          Transfer money directly to a bank account
                        </p>
                      </label>
                    </div>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="1">
                    <Card.Body>
                      <Row>
                        <Col>
                          Please enter the account number for your beneficiary{" "}
                        </Col>
                      </Row>
                      <Row className="mt-2">
                        <Col className="theme-form">
                          <BankForm
                            country="ARM"
                            handleChange={this.props.handleChange}
                            handleBack={this.props.handleBack}
                          />
                        </Col>
                      </Row>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </div>
            </Accordion>
          </Col>
        </Row>
      </>
    );
  }
}
AddPayout.propTypes = {
  cashPick: PropTypes.func,
  handleChange: PropTypes.func,
  handleBack: PropTypes.func,
};

export default AddPayout;

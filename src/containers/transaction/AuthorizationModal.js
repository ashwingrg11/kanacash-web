import React, { Component } from "react";
import { Modal, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import COLORS from "../../assets/Color/Color";
import GoBack from "../../assets/images/backArrow.svg";
import CrossButton from "../../assets/images/Cross.svg";
import ButtonSpinner from "../../components/ButtonSpinner/ButtonSpinner";

class AuthorizationModal extends Component {
  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.close}
        keyboard={false}
        centered
        size="lg"
        className="auth-modal"
      >
        <Modal.Body className="theme-modal">
          <div
            style={{
              position: "absolute",
              top: "-10px",
              right: "-10px",
              cursor: "pointer",
            }}
            onClick={() => this.props.close()}
          >
            <img src={CrossButton} alt="CrossButton" />
          </div>
          <Row>
            <Col>
              <Row className="mb-2">
                <Col>
                  <Row>
                    <Col
                      style={{
                        color: `${COLORS.PRIMARY_COLOR}`,
                        fontSize: "30px",
                        fontWeight: "bold",
                      }}
                      className="d-flex justify-content-center mb-2"
                    >
                      Authorization
                    </Col>
                  </Row>
                  <Row>
                    <p className="text-center pl-md-3 pr-md-3">
                      <b>
                        If you have any complaint to any aspect of money
                        transmission activities conducted though this sevices,
                        you may contact:
                      </b>
                    </p>
                  </Row>
                  <Row style={{ margin: "20px 0px" }}>
                    <Col style={{ textAlign: "center", fontSize: "16px" }}>
                      California Department of Business Oversight <br />
                      1515 K Street, Suite 200, Sacramento, CA 95814-4052
                      <br />
                      Telephone:<b>1-866-275-2677 </b> or <b>916-32 7-758</b>
                      <br />
                      Website:
                      <b
                        style={{
                          color: `${COLORS.PRIMARY_COLOR}`,
                          wordBreak: "break-all",
                        }}
                      >
                        {" "}
                        <a href="http://www.dbo.ca.gov/Licensees/money_transmitters/" target="_blank" rel="noopener noreferrer">http://www.dbo.ca.gov/Licensees/money_transmitters/</a>
                      </b>
                      <br />
                      Email:{" "}
                      <b style={{ color: `${COLORS.PRIMARY_COLOR}` }}>
                        <a href="mailto:consumer.services@dbo.ca.gov">consumer.services@dbo.ca.gov</a>{" "}
                      </b>
                      <br />{" "}
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row className="d-flex justify-content-center mt-2">
                <Col>
                  <p className="text-center">
                    I authorize <b>Golden Money Transfer Inc.</b> to debit the bank account
                    indicated in this web form for the noted amount on
                    today&apos;s date. I understand that because this is an
                    electronic transaction, these funds may be withdrawn from my
                    account as soon as the noted transaction date on the
                    invoice. I will not dispute <b>Golden Money Transfer Inc.</b>debiting my
                    checking/savings account, so long as the transaction
                    corresponds to the terms indicated in this web form.
                  </p>
                  <Row className="text-center" style={{ margin: "20px 20px" }}>
                    <Col style={{ textAlign: "center", fontSize: "16px" }}>
                      Click <b>Yes</b> to continue or click <b>Cancel</b>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="d-flex justify-content-center">
                      <ButtonSpinner
                        block={false}
                        onClick={this.props.continue}
                        isSubmitting={this.props.isSubmitting}
                        title={"Click to Continue"}
                      />
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "10px" }}>
                    <Col className="d-flex justify-content-center">
                      <button
                        style={{
                          backgroundColor: "transparent",
                          color: `${COLORS.DARK_GREY}`,
                          border: "none",
                        }}
                        onClick={() => {
                          this.props.close();
                        }}
                      >
                        {" "}
                        <img src={GoBack} alt="GoBack" /> Back{" "}
                      </button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    );
  }
}
AuthorizationModal.propTypes = {
  show: PropTypes.bool,
  close: PropTypes.func,
  continue: PropTypes.func,
  isSubmitting: PropTypes.bool,
};

export default AuthorizationModal;

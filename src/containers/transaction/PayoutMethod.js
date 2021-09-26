import React, { Component } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import COLORS from "../../assets/Color/Color";
import { NavLink } from "react-router-dom";
import ROUTES from "../../assets/Routes/Routes";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

class PayoutMethod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPayment: "",
    };
  }
  componentWillUnmount = () => {
    this.setState({ selectedPayment: "" });
  };

  nextStep = () => {
    if (this.state.selectedPayment) {
      this.props.history.push({
        pathname: `${ROUTES.BENEFICIARY_ADD}`,
        state: { selectedPayment: this.state.selectedPayment },
      });
    }
  };
  toggleCheckBox = (checkboxId) => {
    document.getElementById("bankPick").checked = false;
    document.getElementById("cashPick").checked = false;
    document.getElementById("walletPick").checked = false;
    document.getElementById(`${checkboxId}`).checked = !document.getElementById(
      `${checkboxId}`
    ).checked;
    this.setState({ selectedPayment: checkboxId });
  };
  render() {
    return (
      <>
        <Row>
          <Col
            style={{
              color: `${COLORS.PRIMARY_COLOR}`,
              padding: "13px 5px 5px 15px",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            Select the Payout Method
          </Col>
        </Row>
        <Row
          style={{ marginBottom: "10px" }}
          onClick={() => this.toggleCheckBox("bankPick")}
        >
          <Col xl="6" lg="8" md="12" sm="12">
            <Card style={{ padding: "16px" }}>
              <Row>
                <Col xl="1">
                  <img alt="img" />
                </Col>
                <Col xl="10">
                  <Row>
                    <Col
                      style={{
                        color: `${COLORS.PRIMARY_COLOR}`,
                        fontSize: "22px",
                        fontWeight: "bold",
                      }}
                    >
                      Bank deposit{" "}
                    </Col>
                  </Row>
                  <Row>
                    <Col
                      style={{
                        color: `${COLORS.LICENCE_COLOR}`,
                        fontSize: "12px",
                      }}
                    >
                      Pick up money from major bank outlets{" "}
                    </Col>
                  </Row>
                </Col>
                <Col xl="1" style={{ padding: "10px" }}>
                  <input
                    type="checkbox"
                    id="bankPick"
                    name="paymentReceivedMethod"
                    value="bankPick"
                    style={{ width: "20px", height: "20px" }}
                  />{" "}
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row
          style={{ marginBottom: "10px" }}
          onClick={() => this.toggleCheckBox("cashPick")}
        >
          <Col xl="6" lg="8" md="12" sm="12">
            <Card style={{ padding: "16px" }}>
              <Row>
                <Col xl="1">
                  <img alt="img" />
                </Col>
                <Col xl="10">
                  <Row>
                    <Col
                      style={{
                        color: `${COLORS.PRIMARY_COLOR}`,
                        fontSize: "22px",
                        fontWeight: "bold",
                      }}
                    >
                      Cash Pickup and Delivery
                    </Col>
                  </Row>
                  <Row>
                    <Col
                      style={{
                        color: `${COLORS.LICENCE_COLOR}`,
                        fontSize: "12px",
                      }}
                    >
                      Pickup cash from a bank branch location{" "}
                    </Col>
                  </Row>
                </Col>
                <Col xl="1" style={{ padding: "10px" }}>
                  <input
                    type="checkbox"
                    id="cashPick"
                    name="paymentReceivedMethod"
                    value="Cash Pick"
                    style={{ width: "20px", height: "20px" }}
                  />{" "}
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        <div className="button-group">
          <button onClick={() => this.nextStep()} className="btn btn-secondary">
            {" "}
            Continue to next Step{" "}
          </button>
          <button
            className="btn btn-back-arrow float-right"
            onClick={() =>
              this.props.history.push(`${ROUTES.BENEFICIARY_LIST}`)
            }
          >
            <img src={BackArrow} alt="BackArrow" />
            Back{" "}
          </button>
        </div>
      </>
    );
  }
}
PayoutMethod.propTypes = {
  history: PropTypes.object,
};

export default withRouter(PayoutMethod);

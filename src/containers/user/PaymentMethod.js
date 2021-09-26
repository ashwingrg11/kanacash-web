import React, { Component } from "react";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";

import { withRouter } from "react-router-dom";
// import CashPickImg from "../../assets/images/icons/cashPickUp.svg";
import BackPickImg from "../../assets/images/icons/BankWithArrow.svg";
import BackArrow from "../../assets/images/backArrow.svg";
import {
  getActiveAccountPage,
  getSelectedPaymentMethodWhileCreatingBeneficiary,
} from "../../store/actions/senderDetail";
import { connect } from "react-redux";

class PayoutMethod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPayment: "",
    };
  }

  toggleCheckBox = (checkboxId) => {
    document.getElementById("bankPick").checked = false;
    // document.getElementById("cashPick").checked = false;
    document.getElementById(`${checkboxId}`).checked = !document.getElementById(
      `${checkboxId}`
    ).checked;
    this.setState({ selectedPayment: checkboxId });
  };

  render() {
    return (
      <>
        <h3 className="subhead-title">Add new Payout Method</h3>
        {/* <div
          className="payment-block-wrap "
          onClick={() => this.toggleCheckBox("cashPick")}
        >
          <Card className="checkbox-wrap">
            <input
              type="checkbox"
              id="cashPick"
              name="paymentReceivedMethod"
              value="Cash Pick"
            />{" "}
            <label className="info" htmlFor="checkbox">
              <img alt="img" src={CashPickImg} />
              <span className="payment-type">Cash Pickup and Delivery</span>
              <p className="small">
                Pick up money from major bank outlets
              </p>{" "}
            </label>
          </Card>
        </div> */}

        <div
          className="payment-block-wrap"
          onClick={() => this.toggleCheckBox("bankPick")}
        >
          <Card className="checkbox-wrap">
            <input
              type="checkbox"
              id="bankPick"
              name="paymentReceivedMethod"
              value="bankPick"
            />
            <label className="info" htmlFor="checkbox">
              <img alt="img" src={BackPickImg} />
              <span className="payment-type">Bank deposit </span>
              <p className="small">Pick up money from major bank outlets</p>
            </label>
          </Card>
        </div>

        <div className="button-group">
          <button
            onClick={() => this.props.handleChange(this.state.selectedPayment)}
            className="btn btn-secondary"
          >
            {" "}
            Continue to next Step{" "}
          </button>
          <button
            className="btn btn-back-arrow float-right"
            onClick={() => {
              this.props.handleBack();
            }}
          >
            <img src={BackArrow} alt="BackArrow" />
            Back{" "}
          </button>
        </div>
      </>
    );
  }
}

const mapActionToProps = {
  getActiveAccountPage,
  getSelectedPaymentMethodWhileCreatingBeneficiary,
};

PayoutMethod.propTypes = {
  handleChange: PropTypes.func,
  handleBack: PropTypes.func,
};

export default connect(null, mapActionToProps)(withRouter(PayoutMethod));

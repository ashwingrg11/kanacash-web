import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Card } from "react-bootstrap";
import DollerImg from "../../assets/images/icons/DollerImg.svg";
import TransactionImg from "../../assets/images/icons/transactionImg.svg";
import UsersImg from "../../assets/images/icons/userImg.svg";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

class UserTransactionBenificiary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Beneficiaries: [],
      Transaction: [],
      showKyc: false,
      deliveredAmount: 0,
    };
  }
  componentWillUnmount = () => {
    this.setState({
      Beneficiaries: [],
      Transaction: [],
      showKyc: false,
      deliveredAmount: 0,
    });
  };
  componentDidUpdate = (prevProps) => {
    if (prevProps.beneficiary !== this.props.beneficiary) {
      this.setState({ Beneficiaries: this.props.beneficiary });
    }

    if (prevProps.transactionList !== this.props.transactionList) {
      let deliveredAmount = 0;
      this.props.transactionList.map((item) => {
        // console.log("ite,", item);
        if (item.status === "DELIVERED") {
          deliveredAmount += item.senderAmount;
        }
        return true;
      });
      this.setState({ deliveredAmount });
    }
  };
  render() {
    return (
      <Card className="p-3 activity-block justify-content-between">
        <Col className="activity-block-wrap">
          <div className="activity-stat">
            <img src={DollerImg} alt="DollerImg" className="icon-activity" />
            <div className="stat-block">
              <span className="dynamic-no">{this.state.deliveredAmount}K</span>
              <p>USD Sent</p>
            </div>
          </div>
        </Col>
        <Col className="activity-block-wrap">
          <div className="activity-stat">
            <img
              src={TransactionImg}
              alt="TransactioImg"
              className="icon-activity"
            />
            <div className="stat-block">
              <span className="dynamic-no">
                {this.props.transactionList.length}
              </span>
              <p>Transaction</p>
            </div>
          </div>
        </Col>
        <Col className="activity-block-wrap last">
          <div className="activity-stat">
            <img src={UsersImg} alt="UsersImg" className="icon-activity" />
            <div className="stat-block">
              <span className="dynamic-no">
                {this.state.Beneficiaries.length}
              </span>
              <p>Beneficiaries</p>
            </div>
          </div>
        </Col>
      </Card>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.auth.user,
  status: state.auth.status,
  beneficiary: state.senderDetail.beneficiaries,
  transactionList: state.transaction.transactionList,
});

UserTransactionBenificiary.propTypes = {
  beneficiary: PropTypes.array,
  transactionList: PropTypes.array,
};

export default connect(
  mapStateToProps,
  null
)(withRouter(UserTransactionBenificiary));

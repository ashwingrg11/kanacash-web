import React, { Component } from "react";
import { Card, Row, Col, Spinner } from "react-bootstrap";
import COLORS from "../../assets/Color/Color";
import Mail from "../../assets/images/icons/mail.svg";
import Phone from "../../assets/images/icons/phone.svg";
import Address from "../../assets/images/icons/address.svg";
import Ribbon from "../../assets/images/icons/tier-white.svg";
import GreenTick from "../../assets/images/icons/greenTick.svg";
import { connect } from "react-redux";
import { getCurrentUser } from "../../store/actions/UserDetailsActions";
import PropTypes from "prop-types";
import { isEmpty } from "../../utils/isEmpty";
import CancelIcon from "../../assets/images/icons/cancelIcon.svg";

import {
  getActiveAccountPage,
  getActiveAccountSideBar,
} from "../../store/actions/senderDetail";

import KYCWidget from "../../components/Modal/WidgetModal";

import ROUTES from "../../assets/Routes/Routes";
import { withRouter } from "react-router-dom";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showKyc: false,
      status: "",
    };
  }

  componentWillUnmount = () => {
    this.setState({
      showKyc: false,
      status: "",
      loader: false,
    });
  };

  kycVerified = (value) => {
    if (value.status === "VERIFIED") {
      this.props.kycVerification();
      this.props.getCurrentUser();
    }
    // this.props.verified(value);
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.user !== this.props.user) {
      if (!isEmpty(this.props.user)) {
        this.setState({ loader: false });
      }
    }
  };

  componentDidMount = () => {
    if (isEmpty(this.props.user)) {
      this.setState({ loader: true });
    }
  };

  verifyKyc = () => {
    const user = this.props.user;
    if (user.isPhoneVerified !== 0 && user.isEmailVerified !== 0) {
      this.setState({ showKyc: true });
    } else if (user.isPhoneVerified === 0 && user.isEmailVerified === 0) {
      this.props.history.push(`${ROUTES.PHONE_VERIFICATION}`);
    } else if (user.isEmailVerified === 0 && user.isPhoneVerified !== 0) {
      this.props.history.push(`${ROUTES.EMAIL_VERIFICATION}`);
    }
  };

  closeModal = () => {
    this.setState({ showKyc: false });
  };

  addBeneficiary = () => {
    if (this.props.user.status === "VERIFIED") {
      this.props.getActiveAccountSideBar("Beneficiary");
      localStorage.setItem("activeSideBar", "Beneficiary");

      this.props.history.push(`${ROUTES.BENEFICIARY_CREATE}`);
    } else {
      this.setState({ showKyc: true });
    }
  };
  limitTransaction = () => {
    if (this.props.user.status === "VERIFIED") {
      this.props.getActiveAccountSideBar("TransactionLimit");
      localStorage.setItem("activeSideBar", "TransactionLimit");
      this.props.history.push(`${ROUTES.TRANSACTION_LIMIT}`);
    } else {
      this.setState({ showKyc: true });
    }
  };

  render() {
    const user = this.props.user;
    return (
      <>
        {this.state.loader ? (
          <Spinner animation="border" />
        ) : (
          <>
            <Row>
              <Col className="activity-title">Profile</Col>
            </Row>

            <Row className="mt-3">
              <Col sm="12" className="card-block">
                <Card className="account-card-block">
                  <div className="username">
                    {`${user.first_name} ${user.last_name}`}
                    {user.status === "VERIFIED" ? (
                      <img
                        src={GreenTick}
                        alt="GreenTick"
                        style={{
                          margin: "0px 5px 3px 10px ",
                        }}
                      />
                    ) : user.status === "SUSPENDED" ? (
                      <img
                        src={CancelIcon}
                        alt="GreenTick"
                        style={{
                          margin: "0px 5px 3px 10px ",
                        }}
                        height="20px"
                      />
                    ) : (
                      <span
                        onClick={() => {
                          this.verifyKyc();
                        }}
                        style={{
                          color: `${COLORS.SECONDARY_COLOR}`,
                          fontSize: "13px",
                          marginLeft: "10px",
                          paddingTop: "5px",
                          cursor: "pointer",
                        }}
                      >
                        verify here
                      </span>
                    )}
                  </div>
                  <div className="block-with-img">
                    <img src={Mail} alt="Mail" />
                    {user.email}
                  </div>
                  <div className="block-with-img">
                    <img src={Phone} alt="Phone" />
                    {user.mobile_phone}
                  </div>
                  <div className="block-with-img">
                    {" "}
                    <img src={Address} alt="address" />
                    {user?.state}, United States
                  </div>
                  <div className="block-with-img">
                    {" "}
                    <div className="badge">
                      <img src={Ribbon} alt="Ribbon" />
                      {user.current_tier}
                    </div>
                  </div>
                </Card>
              </Col>

              <Col sm="12" className="card-block">
                <Card className="button-card">
                  <p>To send more money, upgrade your transaction limit</p>
                  <Row>
                    <Col>
                      <button
                        className="btn btn-secondary mb-2 mb-sm-0"
                        onClick={() => this.limitTransaction()}
                      >
                        Upgrade Limit
                      </button>
                      <button
                        className="btn btn-secondary mb-2 mb-sm-0"
                        onClick={() => this.addBeneficiary()}
                      >
                        {" "}
                        Add the Beneficiary
                      </button>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </>
        )}

        <KYCWidget
          show={this.state.showKyc}
          close={this.closeModal}
          handleChange={(value) => {
            this.kycVerified(value);
          }}
          type="kyc"
        />
      </>
    );
  }
}
const mapActionToProps = {
  getActiveAccountPage,
  getCurrentUser,
  getActiveAccountSideBar,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

Profile.propTypes = {
  user: PropTypes.object,
  getCurrentUser: PropTypes.func,
  getActiveAccountSideBar: PropTypes.func,
  history: PropTypes.object,
  verified: PropTypes.func,
  kycVerification: PropTypes.func,
};

export default connect(mapStateToProps, mapActionToProps)(withRouter(Profile));

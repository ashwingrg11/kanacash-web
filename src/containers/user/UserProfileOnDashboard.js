import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Spinner } from "react-bootstrap";
import GreenTick from "../../assets/images/icons/greenTick.svg";
import UserImg from "../../assets/images/user.svg";
// import ROUTES from "../../assets/Routes/Routes";
import { withRouter } from "react-router-dom";
import KycWedget from "../../components/Modal/WidgetModal";
import { getCurrentUser } from "../../store/actions/UserDetailsActions";
import ROUTES from "../../assets/Routes/Routes";
import CancelIcon from "../../assets/images/icons/cancelIcon.svg";
import PropTypes from "prop-types";
import { isEmpty } from "../../utils/isEmpty";

class UserProfileOnDashboard extends Component {
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
    });
  };
  closeModal = () => {
    this.setState({ showKyc: false });
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
  kycVerified = (value) => {
    if (value.status === "VERIFIED") {
      this.props.getCurrentUser();
    }
    this.props.verified(value);
  };
  componentDidUpdate = (prevProps) => {
    if (prevProps.status !== this.props.status) {
      this.setState({ status: this.props.status });
    }
  };
  render() {
    return (
      <>
        <Card className="profile-card">
          <div className="profile-name">
            <img src={UserImg} alt="UserImg" className="profile-icon" />{" "}
            {isEmpty(this.props.user) ? (
              <span className="user-name">
                {" "}
                <Spinner animation="border" size="sm" />
              </span>
            ) : (
              <>
                {" "}
                <div className="user-info">
                  {isEmpty(this.props.user) ? (
                    <span className="user-name">
                      {" "}
                      <Spinner animation="border" size="sm" />
                    </span>
                  ) : (
                    <span
                      className="user-name"
                      onClick={() =>
                        this.props.history.push(`${ROUTES.ACCOUNT_DETAIL}`)
                      }
                    >
                      {`${this.props.user?.first_name} ${this.props.user?.last_name}`}
                    </span>
                  )}

                  <div className="user-verification">
                    {this.props.user.status === "VERIFIED" ? (
                      <img src={GreenTick} alt="GreenTick" />
                    ) : this.props.user.status === "SUSPENDED" ? (
                      <img src={CancelIcon} alt="redtick" height="20px" />
                    ) : (
                      <span
                        onClick={() => {
                          this.verifyKyc();
                        }}
                      >
                        verify here{" "}
                      </span>
                    )}
                  </div>
                </div>
                <p>{this.props.user && this.props.user.email}</p>
                <p>{this.props.user.state}, United States</p>
                <p>
                  {this.props.user &&
                    this.props.user.address !== undefined &&
                    this.props.user.address.state +
                      "," +
                      this.props.user.address.country}{" "}
                </p>
              </>
            )}
          </div>
        </Card>

        <KycWedget
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
const mapStateToProps = (state) => ({
  user: state.auth.user,
  beneficiary: state.senderDetail.beneficiaries,
  transactionList: state.transaction.transactionList,
});

const mapActionToProps = {
  getCurrentUser,
};
UserProfileOnDashboard.propTypes = {
  status: PropTypes.object,
  history: PropTypes.object,
  getCurrentUser: PropTypes.func,
  verified: PropTypes.func,
  user: PropTypes.object,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withRouter(UserProfileOnDashboard));

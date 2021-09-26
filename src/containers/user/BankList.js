import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import PlusImg from "../../assets/images/icons/Plus.svg";
import CustomSpinner from "../../components/CustomSpinner";
import ROUTES from "../../assets/Routes/Routes";
import SenderBankList from "./SenderBankCard";
import { withRouter } from "react-router-dom";
import { getSenderBank } from "../../store/actions/senderDetail";
import { connect } from "react-redux";
import WidgetModal from "../../components/Modal/WidgetModal";
import { getCurrentUser } from "../../store/actions/UserDetailsActions";

import PropTypes from "prop-types";

class BankList extends Component {
  state = {
    SenderBankList: [],
    showModal: false,
  };

  OpenModal = () => {
    //VERIFIED , UNVERIFIED , SUSPENDED , RETRY , REVIEW_PENDING
    if (
      this.props.user.status !== "UNVERIFIED" &&
      this.props.user.status !== "SUSPENDED"
    ) {
      this.setState({ showModal: true });
    } else {
      if (
        this.props.user.isPhoneVerified !== 0 &&
        this.props.user.isEmailVerified !== 0
      ) {
        this.setState({ showKyc: true });
      } else if (
        this.props.user.isPhoneVerified === 0 &&
        this.props.user.isEmailVerified === 0
      ) {
        this.props.history.push(`${ROUTES.PHONE_VERIFICATION}`);
      } else if (
        this.props.user.isEmailVerified === 0 &&
        this.props.user.isPhoneVerified !== 0
      ) {
        this.props.history.push(`${ROUTES.EMAIL_VERIFICATION}`);
      }
    }
  };

  verifyKyc = (value) => {
    if (value.status === "VERIFIED") {
      if (this._mount) {
        this.props.kycVerification();
        this.props.getCurrentUser();
      }
    }
  };

  closeMessage = () => {
    this.setState({ showModal: false });
  };

  componentDidMount = () => {
    this._mount = true;
    if (this._mount) {
      this.props.getSenderBank();
    }
  };
  componentWillUnmount = () => {
    this._mount = false;
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.senderBankList !== this.props.senderBankList) {
      this.setState({ SenderBankList: this.props.senderBankList });
    }
  };

  addBank = (e) => {
    this.props.addBank(e);
    this.props.getSenderBank();
  };

  deleteBank = (id) => {
    this.props.bankDeletedSuccess();
    let filteredBank = this.state.SenderBankList.filter(
      (bank) => bank.id !== id.id
    );
    this.setState({ SenderBankList: filteredBank });
    this.props.getSenderBank();
  };
  render() {
    return (
      <React.Fragment>
        <Row>
          <Col className="activity-title">Bank Accounts</Col>
          <Col
            className="d-flex justify-content-end align-items-center pl-0 anchor-plus"
            onClick={() => this.OpenModal()}
          >
            <img src={PlusImg} alt="PlusImg" />
            Add Bank
          </Col>
        </Row>
        <Row>
          <Col className="mt-3 d-flex flex-wrap p-0">
            {this.props.loader ? (
              <div style={{ height: "50vh" }}>
                {" "}
                <CustomSpinner />
              </div>
            ) : this.state.SenderBankList.length !== 0 ? (
              this.state.SenderBankList.map((card, index) => {
                return (
                  <SenderBankList
                    detail={card}
                    key={index}
                    deleteBank={this.deleteBank}
                    errorWhileDeletingBank={this.props.errorWhileDeletingBank}
                  />
                );
              })
            ) : (
              <Col className="no-items" key="1">
                <p>There are no records to be shown.</p>
              </Col>
            )}
          </Col>
        </Row>
        {this._mount && (
          <>
            {" "}
            <WidgetModal
              show={this.state.showModal}
              close={this.closeMessage}
              type="bank"
              handleChange={(e) => this.addBank(e)}
              // showAlert={()=>this.showAlert}
            />
            <WidgetModal
              show={this.state.showKyc}
              close={() => this.setState({ showKyc: false })}
              type="kyc"
              handleChange={(e) => this.verifyKyc(e)}
              // showAlert={()=>this.showAlert}
            />
          </>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  senderBankList: state.senderDetail.senderBanks,
  user: state.auth.user,
  loader: state.loader.presentLoader,
});

const mapActionToProps = { getSenderBank, getCurrentUser };

BankList.propTypes = {
  user: PropTypes.object,
  senderBankList: PropTypes.array,
  getSenderBank: PropTypes.func,
  history: PropTypes.object,
  bankDeletedSuccess: PropTypes.func,
  errorWhileDeletingBank: PropTypes.func,
  addBank: PropTypes.func,
  loader: PropTypes.bool,
  getCurrentUser: PropTypes.func,
  kycVerification: PropTypes.func,
};

export default connect(mapStateToProps, mapActionToProps)(withRouter(BankList));

import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import ROUTES from "../../assets/Routes/Routes";
import PlusImg from "../../assets/images/icons/Plus.svg";
import CustomSpinner from "../../components/CustomSpinner";
import SenderCardList from "./senderDebitCard";
import { getSenderCards } from "../../store/actions/senderDetail";
import { getCurrentUser } from "../../store/actions/UserDetailsActions";

import WidgetModal from "../../components/Modal/WidgetModal";

class CardList extends Component {
  state = {
    SenderCardList: [],
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
  closeMessage = () => {
    this.setState({ showModal: false });
  };

  componentDidMount = () => {
    this._mount = true;
    if (this._mount) {
      this.props.getSenderCards();
    }
  };
  componentWillUnmount = () => {
    this._mount = false;
  };

  verifyKyc = (value) => {
    if (value.status === "VERIFIED") {
      if (this._mount) {
        this.props.kycVerification();
        this.props.getCurrentUser();
      }
    }
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.senderCards !== this.props.senderCards) {
      this.setState({ SenderCardList: this.props.senderCards });
    }
  };
  addCard = (e) => {
    this.props.addCard(e);
    this.props.getSenderCards();
  };

  deleteCard = (id) => {
    this.props.bankDeletedSuccess();
    let filteredCard = this.state.SenderCardList.filter(
      (item) => item.id !== id
    );
    this.setState({ SenderCardList: filteredCard });
  };

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col className="activity-title">Debit Cards</Col>
          <Col
            className="d-flex justify-content-end align-items-center pl-0 anchor-plus"
            onClick={() => this.OpenModal()}
          >
            <img src={PlusImg} alt="PlusImg" />
            Add debit card
          </Col>
        </Row>
        <Row>
          <Col className="mt-3 d-flex flex-wrap p-0">
            {this.props.loader ? (
              <div style={{ height: "50vh" }}>
                {" "}
                <CustomSpinner />
              </div>
            ) : this.state.SenderCardList.length !== 0 ? (
              this.state.SenderCardList.map((card, index) => {
                return (
                  <SenderCardList
                    detail={card}
                    key={index}
                    deleteCard={this.deleteCard}
                    errorWhileDeletingCard={this.props.errorWhileDeletingCard}
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
            <WidgetModal
              show={this?.state?.showModal}
              close={this.closeMessage}
              type="card"
              handleChange={(e) => this.addCard(e)}
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
  senderCards: state.senderDetail.senderCards,
  user: state.auth.user,
  loader: state.loader.presentLoader,
});
const mapDispatchToProps = { getSenderCards, getCurrentUser };

CardList.propTypes = {
  user: PropTypes.object,
  senderCards: PropTypes.array,
  getSenderCards: PropTypes.func,
  history: PropTypes.object,
  bankDeletedSuccess: PropTypes.func,
  errorWhileDeletingBank: PropTypes.func,
  addCard: PropTypes.func,
  errorWhileDeletingCard: PropTypes.func,
  loader: PropTypes.bool,
  getCurrentUser: PropTypes.func,
  kycVerification: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CardList));

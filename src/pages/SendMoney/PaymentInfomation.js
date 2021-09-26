import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";

import { withRouter } from "react-router-dom";
import Header from "../../containers/layout/Header";
import { connect } from "react-redux";
import Footer from "../../containers/layout/Footer";
import {
  getSenderPaymentMethod,
  clearSenderPaymentDetail,
} from "../../store/actions/TrasactionAction";
import CustomAlert from "../../components/Alert/CustomAlert";

import SendMoneyHeader from "../../containers/transaction/SendMoneyHeader";
import SendingMoneyDetail from "../../containers/transaction/SendingMoneyDetail";
import PaymentInfomation from "../../containers/transaction/PaymentInfomation";
import Disclaimer from "../../components/Disclaimer/Disclaimer";
class PaymentInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
      message: "",
      variant: "",
    };
  }
  componentWillUnmount = () => {
    this.setState({
      showAlert: false,
      message: "",
      variant: "",
    });
  };

  bankAdded = (value) => {
    if (value.status === "BANK_ADDED") {
      this.setState({
        showAlert: true,
        message: value.message,
        variant: "success",
      });
    } else if (value.status === "BANK_ERROR") {
      this.setState({
        showAlert: true,
        message: value.message,
        variant: "danger",
      });
    }
  };
  cardAdded = (value) => {
    if (value.status === "CARD_ADDED	") {
      this.setState({
        showAlert: true,
        message: value.message,
        variant: "success",
      });
    } else if (value.status === "CARD_ERROR") {
      this.setState({
        showAlert: true,
        message: value.message,
        variant: "danger",
      });
    }
  };
  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="shadow-line"></div>
        <section className="theme-inner">
          <Container>
            <SendMoneyHeader />
            <Row>
              <Col className="steps-content-block">
                <h2 className="sub-title text-md-center text-lg-left">
                  {" "}
                  How would you want to pay for this transaction?
                </h2>

                <Row>
                  <Col
                    md={{ span: 8, offset: 2 }}
                    sm="12"
                    lg={{ span: 6, offset: 0 }}
                    className="pr-lg-0 mb-md-5 mb-lg-0"
                  >
                    <PaymentInfomation
                      bankAdded={this.bankAdded}
                      cardAdded={this.cardAdded}
                    />
                  </Col>
                  <Col
                    md={{ span: 8, offset: 2 }}
                    sm="12"
                    lg={{ span: 5, offset: 1 }}
                    className="sumary-bar"
                  >
                    <SendingMoneyDetail />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
        <Footer />
        {!localStorage.acceptPolicy && <Disclaimer />}

        <CustomAlert
          message={this.state.message}
          show={this.state.showAlert}
          variant={this.state.variant}
          close={() => this.setState({ showAlert: false })}
        />
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  senderBanks: state.senderDetail.senderBanks,
  senderCards: state.senderDetail.senderCards,
  acceptPolicy: state.auth.accept_policy,
});
const mapActionToProps = { getSenderPaymentMethod, clearSenderPaymentDetail };

export default connect(
  mapStateToProps,
  mapActionToProps
)(withRouter(PaymentInformation));

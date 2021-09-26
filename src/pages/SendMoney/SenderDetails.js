import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";

import { withRouter } from "react-router-dom";
import Header from "../../containers/layout/Header";
import { connect } from "react-redux";
import Footer from "../../containers/layout/Footer";
import SignupForm from "../../containers/user/SignupForm";
import LoginModal from "../../pages/Login/Login";
import ROUTES from "../../assets/Routes/Routes";
import PropTypes from "prop-types";

import SendMoneyHeader from "../../containers/transaction/SendMoneyHeader";
import SendingMoneyDetail from "../../containers/transaction/SendingMoneyDetail";
import CustomAlert from "../../components/Alert/CustomAlert";
import Disclaimer from "../../components/Disclaimer/Disclaimer";
class SenderDetails extends Component {
  state = {
    beneficiaryList: [],
    showLoginModal: false,
    errorMessage: "",
    variant: "",
    showAlert: false,
  };

  componentWillUnmount = () => {
    this.setState({
      beneficiaryList: [],
      showLoginModal: false,
      errorMessage: "",
      variant: "",
      showAlert: false,
    });
  };

  closeModal = () => {
    this.setState({ showAlert: false, errorMessage: "", variant: "" });
  };

  login = () => {
    this.setState({ showLoginModal: true });
  };

  closeMessage = () => {
    this.setState({ showLoginModal: false });
  };

  register = () => {
    localStorage.setItem("signUpFromTransaction", true);
    this.props.history.push(`${ROUTES.PHONE_VERIFICATION}`);
  };

  render() {
    return (
      <>
        <Header />
        <div className="shadow-line"></div>
        <section className="theme-inner">
          <Container>
            <SendMoneyHeader />
            <Row>
              <Col className="steps-content-block">
                <h2 className="sub-title">Sign Up</h2>

                <Row>
                  <Col md="6" sm="12" className="pr-md-0">
                    <SignupForm
                      successfullySignup={this.register}
                      showLogin
                      login={this.login}
                    />
                  </Col>
                  <Col
                    md="6"
                    sm="12"
                    xl={{ span: 5, offset: 1 }}
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

        <LoginModal
          show={this.state.showLoginModal}
          close={this.closeMessage}
        />
        <CustomAlert
          show={this.state.showAlert}
          message={this.state.errorMessage}
          variant={this.state.variant}
          close={this.closeModal}
        />
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  beneficiary: state.senderDetail.beneficiaries,
  acceptPolicy: state.auth.accept_policy,
});

SenderDetails.propTypes = {
  history: PropTypes.object,
};

export default connect(mapStateToProps, null)(withRouter(SenderDetails));

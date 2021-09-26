import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";

import MyAccountSidebar from "../../components/MyAccountSidebar";
import { withRouter } from "react-router-dom";
import Header from "../../containers/layout/Header";
import Footer from "../../containers/layout/Footer";

import Profile from "../../containers/user/Profile";
import AccountHeader from "../../containers/user/AccountHeader";
import CustomAlert from "../../components/Alert/CustomAlert";
import Disclaimer from "../../components/Disclaimer/Disclaimer";
import { connect } from "react-redux";

class AccountDetail extends Component {
  state = {
    message: "",
    variant: "",
    showAlert: false,
  };
  verified = (value) => {
    if (value.status === "VERIFIED") {
      this.setState({
        showAlert: true,
        message: value.message,
        variant: "success",
      });
    } else if (value.status === "FAILED") {
      this.setState({
        showAlert: true,
        message: value.message,
        variant: "danger",
      });
    }
  };

  render() {
    return (
      <>
        <Header />
        <div className="shadow-line"></div>
        <section className="admin-wrapper">
          <Container>
            <Row>
              <Col>
                <AccountHeader />
                <Row className="admin-content">
                  <Col xl="3" lg="4" md="5" sm="12">
                    <MyAccountSidebar />
                  </Col>
                  <Col xl="9" lg="8" md="7" sm="12">
                    <Profile
                      verified={(value) => this.verified(value)}
                      kycVerification={() =>
                        this.setState({
                          message: "Your KYC has been verified successfully.",
                          showAlert: true,
                          variant: "success",
                        })
                      }
                    />
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
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  acceptPolicy: state.auth.accept_policy,
});

export default connect(mapStateToProps)(withRouter(AccountDetail));

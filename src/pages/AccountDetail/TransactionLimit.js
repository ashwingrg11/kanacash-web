import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";

import MyAccountSidebar from "../../components/MyAccountSidebar";
import { withRouter } from "react-router-dom";
import Header from "../../containers/layout/Header";
import { getBeneficiaries } from "../../store/actions/senderDetail";
import { connect } from "react-redux";
import Footer from "../../containers/layout/Footer";
import AccountHeader from "../../containers/user/AccountHeader";
import TransactionLimit from "../../containers/user/TransactionLimit";
import Disclaimer from "../../components/Disclaimer/Disclaimer";
class AccountDetail extends Component {
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
                    <TransactionLimit />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
        <Footer />
        {!localStorage.acceptPolicy && <Disclaimer />}
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  beneficiary: state.senderDetail.beneficiaries,
  activePage: state.senderDetail.activePage,
  acceptPolicy: state.auth.accept_policy,
});
const mapActionToProps = { getBeneficiaries };

export default connect(
  mapStateToProps,
  mapActionToProps
)(withRouter(AccountDetail));

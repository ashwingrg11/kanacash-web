import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";

import { withRouter } from "react-router-dom";
import Header from "../../containers/layout/Header";
import { connect } from "react-redux";
import Footer from "../../containers/layout/Footer";

import SendMoneyHeader from "../../containers/transaction/SendMoneyHeader";
import SendingMoneyDetail from "../../containers/transaction/SendingMoneyDetail";
import ChooseBeneficiary from "../../containers/transaction/ChooseBeneficiary";
import Disclaimer from "../../components/Disclaimer/Disclaimer";
class BeneficiaryDetails extends Component {
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
                <h2 className="sub-title text-md-center text-lg-left">
                  Beneficiary details
                </h2>
                <Row className="select-special">
                  <Col
                    md={{ span: 8, offset: 2 }}
                    sm="12"
                    lg={{ span: 6, offset: 0 }}
                    className="pr-lg-0 mb-md-5 mb-lg-0"
                  >
                    <ChooseBeneficiary />
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
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  beneficiary: state.senderDetail.beneficiaries,
  acceptPolicy: state.auth.accept_policy,
});

export default connect(mapStateToProps, null)(withRouter(BeneficiaryDetails));

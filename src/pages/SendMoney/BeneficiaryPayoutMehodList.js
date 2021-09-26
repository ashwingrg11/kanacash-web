import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";

import { withRouter } from "react-router-dom";
import Header from "../../containers/layout/Header";
import { connect } from "react-redux";
import Footer from "../../containers/layout/Footer";
import ROUTES from "../../assets/Routes/Routes";
import PropTypes from "prop-types";

import SendMoneyHeader from "../../containers/transaction/SendMoneyHeader";
import SendingMoneyDetail from "../../containers/transaction/SendingMoneyDetail";
import PaymentMethod from "../../containers/user/PaymentMethod";
import { getSelectedPaymentMethodWhileCreatingBeneficiary } from "../../store/actions/senderDetail";
import Disclaimer from "../../components/Disclaimer/Disclaimer";
class BeneficiaryPayoutMehodList extends Component {
  nextStep = (value) => {
    if (value) {
      this.props.getSelectedPaymentMethodWhileCreatingBeneficiary(value);
      this.props.history.push(`${ROUTES.BENEFICIARY_CREATE_TRANSACTION}`);
    }
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
                <h2 className="sub-title text-md-center text-lg-left">
                  {" "}
                  Payout Method
                </h2>

                <Row className="mt-4">
                  <Col
                    md={{ span: 8, offset: 2 }}
                    sm="12"
                    lg={{ span: 6, offset: 0 }}
                    className="pr-lg-0 mb-md-5 mb-lg-0"
                  >
                    <Row>
                      <Col>
                        {" "}
                        <PaymentMethod
                          handleBack={() =>
                            this.props.history.push(
                              `${ROUTES.BENEFICIARY_DETAIL}`
                            )
                          }
                          handleChange={this.nextStep}
                        />
                      </Col>
                    </Row>
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

BeneficiaryPayoutMehodList.propTypes = {
  getSelectedPaymentMethodWhileCreatingBeneficiary: PropTypes.func,
  history: PropTypes.object,
};
const mapStateToProps = (state) => ({
  beneficiary: state.senderDetail.beneficiaries,
  acceptPolicy: state.auth.accept_policy,
});
const mapActionToProps = { getSelectedPaymentMethodWhileCreatingBeneficiary };

export default connect(
  mapStateToProps,
  mapActionToProps
)(withRouter(BeneficiaryPayoutMehodList));

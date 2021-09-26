import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ROUTES from "../../../assets/Routes/Routes";

import MyAccountSidebar from "../../../components/MyAccountSidebar";
import { withRouter } from "react-router-dom";
import Header from "../../../containers/layout/Header";
import { getSelectedPaymentMethodWhileCreatingBeneficiary } from "../../../store/actions/senderDetail";
import { connect } from "react-redux";
import Footer from "../../../containers/layout/Footer";

import PaymentMethod from "../../../containers/user/PaymentMethod";
import AccountHeader from "../../../containers/user/AccountHeader";
import PropTypes from "prop-types";
import Disclaimer from "../../../components/Disclaimer/Disclaimer";

class BeneficiaryPayout extends Component {
  state = {
    beneficiaryList: [],
    activePage: "",
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.beneficiary !== this.props.beneficiary) {
      this.setState({ beneficiaryList: this.props.beneficiary });
    }
    if (prevProps.activePage !== this.props.activePage) {
      this.setState({ activePage: this.props.activePage });
    }
  };

  nextStep = (value) => {
    if (value) {
      this.props.getSelectedPaymentMethodWhileCreatingBeneficiary(value);
      this.props.history.push(`${ROUTES.BENEFICIARY_ADD}`);
      // this.props.getActiveAccountPage("AddNewBeneficiaryForm")
      // localStorage.setItem("activePage","AddNewBeneficiaryForm")
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
                    <Row>
                      <Col className="activity-title mb-2">
                        {" "}
                        New Beneficiary
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <PaymentMethod
                          handleChange={this.nextStep}
                          handleBack={() =>
                            this.props.history.push(
                              `${ROUTES.BENEFICIARY_LIST}`
                            )
                          }
                        />
                      </Col>
                    </Row>
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
const mapActionToProps = { getSelectedPaymentMethodWhileCreatingBeneficiary };

BeneficiaryPayout.propTypes = {
  beneficiary: PropTypes.array,
  activePage: PropTypes.string,
  getSelectedPaymentMethodWhileCreatingBeneficiary: PropTypes.func,
  history: PropTypes.object,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withRouter(BeneficiaryPayout));

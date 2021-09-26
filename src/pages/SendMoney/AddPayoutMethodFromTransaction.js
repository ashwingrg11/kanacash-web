import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import PropTypes from "prop-types";

import { withRouter } from "react-router-dom";
import Header from "../../containers/layout/Header";
import { getReciverPaymentMethod } from "../../store/actions/TrasactionAction";
import { connect } from "react-redux";
import Footer from "../../containers/layout/Footer";
import { getBeneficiaries } from "../../store/actions/senderDetail";
import SendMoneyHeader from "../../containers/transaction/SendMoneyHeader";
import SendingMoneyDetail from "../../containers/transaction/SendingMoneyDetail";
import * as api from "../../services/axios/auxApi";
import Disclaimer from "../../components/Disclaimer/Disclaimer";
import ROUTES from "../../assets/Routes/Routes";
import AddPayout from "../../containers/user/AddPayout";

class AddPayoutMethodFromTransaction extends Component {
  addBank = (values) => {
    let body = {
      beneficiaryId: this.props.location.state.beneficiaryReferenceId,
      bank_id: parseInt(values.bank),
      account_number: JSON.stringify(values.accountNumber),
    };
    api
      .createBeneficiariesBank(body)
      .then((res) => {
        this.props.getBeneficiaries();
        this.props.history.push(`${ROUTES.BENEFICIARY_DETAIL}`);
      })
      .catch((err) => {
        // console.log("error while creating beneficiary bank", err);
      });
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
                  Beneficiary details
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
                        <AddPayout
                          handleChange={(value) => this.addBank(value)}
                          handleBack={() =>
                            this.props.history.push(
                              `${ROUTES.BENEFICIARY_DETAIL}`
                            )
                          }
                          cashPick={() =>
                            this.props.history.push(
                              `${ROUTES.BENEFICIARY_DETAIL}`
                            )
                          }
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
AddPayoutMethodFromTransaction.propTypes = {
  getBeneficiaries: PropTypes.func,
  history: PropTypes.object,
  location: PropTypes.object,
};

const mapActionToProps = {
  getReciverPaymentMethod,
  getBeneficiaries,
};
const mapStateToProps = (state) => ({
  acceptPolicy: state.auth.accept_policy,
});

export default connect(
  mapStateToProps,
  mapActionToProps
)(withRouter(AddPayoutMethodFromTransaction));

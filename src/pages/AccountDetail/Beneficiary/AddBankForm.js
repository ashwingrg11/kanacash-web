import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ROUTES from "../../../assets/Routes/Routes";
import MyAccountSidebar from "../../../components/MyAccountSidebar";
import { withRouter } from "react-router-dom";
import Header from "../../../containers/layout/Header";
import { getBeneficiaries } from "../../../store/actions/senderDetail";
import { connect } from "react-redux";
import Footer from "../../../containers/layout/Footer";

import AccountHeader from "../../../containers/user/AccountHeader";
import BankForm from "../../../containers/user/BankForm";
import * as api from "../../../services/axios/auxApi";
import PropTypes from "prop-types";
import Disclaimer from "../../../components/Disclaimer/Disclaimer";

class AddBankForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beneficiaryList: [],
      activePage: "",
    };
  }

  addBank = (values) => {
    let body = {
      beneficiaryId: this.props.location.state.beneficiaryReferenceId,
      bank_id: parseInt(values.bank),
      account_number: JSON.stringify(values.accountNumber),
    };
    api
      .createBeneficiariesBank(body)
      .then((res) => {
        this.props.history.push({
          pathname: `${ROUTES.BENEFICIARY_LIST}`,
          state: {
            showAlert: true,
            message: "New beneficiary information has been added successfully.",
            variant: "success",
          },
        });
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
                      <Col className="activity-title mb-2">New Beneficiary</Col>
                    </Row>
                    <Row>
                      <Col>
                        <div className="payment-block-wrap">
                          <h3 className="subhead-title">
                            Add beneficiary bank
                          </h3>
                          <Row>
                            <Col className="theme-form">
                              <BankForm
                                handleChange={this.addBank}
                                country={this.props?.location?.state?.country}
                                handleBack={() =>
                                  this.props.history.push(
                                    `${ROUTES.BENEFICIARY_LIST}`
                                  )
                                }
                              />
                            </Col>
                          </Row>
                        </div>
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
const mapActionToProps = { getBeneficiaries };

AddBankForm.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withRouter(AddBankForm));

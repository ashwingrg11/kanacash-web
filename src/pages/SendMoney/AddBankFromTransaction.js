import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";

import { withRouter } from "react-router-dom";
import Header from "../../containers/layout/Header";
import {
  getReciverPaymentMethod,
  getReceiverInfo,
} from "../../store/actions/TrasactionAction";
import { connect } from "react-redux";
import Footer from "../../containers/layout/Footer";
import { getBeneficiaries } from "../../store/actions/senderDetail";
import SendMoneyHeader from "../../containers/transaction/SendMoneyHeader";
import SendingMoneyDetail from "../../containers/transaction/SendingMoneyDetail";
import BankForm from "../../containers/user/BankForm";
import * as api from "../../services/axios/auxApi";
import ROUTES from "../../assets/Routes/Routes";
import PropTypes from "prop-types";
import Disclaimer from "../../components/Disclaimer/Disclaimer";
class AddBankFromTransaction extends Component {
  state = {
    beneficiaryList: [],
  };
  addBank = (values) => {
    let body = {
      beneficiaryId: this.props.location.state.beneficiary.beneficiaryId,
      bank_id: parseInt(values.bank),
      branchLocation: "string",
      account_number: JSON.stringify(values.accountNumber),
      accountType: "CHECKING",
    };
    let receiverPayment;
    api
      .createBeneficiariesBank(body)
      .then((res) => {
        // console.log(res.data, "ben bank data");debugger;
        let beneficiaryBankInfo = {
          account_number: res.data.account_number,
          bank_id: res.data.bank_id,
          branch_id: res.data.branch_id,
          created_at: res.data.created_at,
          beneficiaryAccountId: res.data.id,
          test_field: res.data.test_field,
        };
        receiverPayment = {
          payoutMethod: "BANK_DEPOSIT",
          payoutDetail: beneficiaryBankInfo,
        };

        this.props.getBeneficiaries().then(() => {
          this.props.getReciverPaymentMethod(receiverPayment);
          localStorage.setItem(
            "beneficiaryDetail",
            JSON.stringify(receiverPayment)
          );
          this.props.getReceiverInfo(this.props.location.state.beneficiary);
          this.props.history.push(`${ROUTES.PAYMENT_INFO}`);
        });
      })
      .catch((err) => {
        console.log("error while creating beneficiary bank", err);
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
                    <BankForm
                      handleChange={this.addBank}
                      country={this.props?.location?.state?.country}
                      handleBack={() =>
                        this.props.history.push(
                          `${ROUTES.BENEFICIARY_PAYMENT_METHOD}`
                        )
                      }
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
      </>
    );
  }
}
AddBankFromTransaction.propTypes = {
  location: PropTypes.object,
  getReciverPaymentMethod: PropTypes.func,
  getBeneficiaries: PropTypes.func,
  history: PropTypes.object,
  getReceiverInfo: PropTypes.func,
};

const mapDispatchToProps = {
  getReciverPaymentMethod,
  getBeneficiaries,
  getReceiverInfo,
};

const mapStateToProps = (state) => ({
  acceptPolicy: state.auth.accept_policy,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddBankFromTransaction));

import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ROUTES from "../../../assets/Routes/Routes";

import PropTypes from "prop-types";
import MyAccountSidebar from "../../../components/MyAccountSidebar";
import { withRouter } from "react-router-dom";
import Header from "../../../containers/layout/Header";
import {
  getBeneficiaries,
  setBeneficiary,
} from "../../../store/actions/senderDetail";
import CustomAlert from "../../../components/Alert/CustomAlert";
import { connect } from "react-redux";
import Footer from "../../../containers/layout/Footer";

import AddBeneficiaryForm from "../../../containers/user/AddBeneficiaryForm";
import AccountHeader from "../../../containers/user/AccountHeader";
import * as api from "../../../services/axios/senderApi";
import Disclaimer from "../../../components/Disclaimer/Disclaimer";

class AccountDetail extends Component {
  state = {
    beneficiaryList: [],
    showAlert: false,
    errorMessage: "",
    variant: "",
  };
  componentDidMount = () => {
    this._mount = true;
  };

  componentWillUnmount = () => {
    this._mount = false;
  };

  createBeneficiary = (values, { setSubmitting }) => {
    if (this._mount) {
      const body = {
        first_name: values.firstName,
        middle_name: values.middleName,
        last_name: values.lastName,
        country: values.country,
        province: values.state,
        city: values.city,
        address_line1: values.addressLine1,
        postal_code: values.postalCode + "",
        mobile_phone: values.phoneNumber + "",
        // TODO: set it dynamic
        sender_relationship: "Sister",
      };
      setSubmitting(true);
      api
        .createBeneficiary(body)
        .then((response) => {
          if (this._mount) {
            setSubmitting(false);
            if (response.status === 200) {
              this.props.setBeneficiary();
              // if (this.props.payoutMehod === "bankPick") {
              this.props.history.push({
                pathname: `${ROUTES.ADD_BANK}`,
                state: {
                  country: `${values.country}`,
                  beneficiaryReferenceId: `${response.data.id}`,
                },
              });
            } else {
              setSubmitting(false);
              this.setState({
                errorMessage: `${response.data.message}`,
                showAlert: true,
                variant: "danger",
              });
            }
          }
        })
        .catch((err) => {
          setSubmitting(false);
        });
    }
  };

  render() {
    return (
      <>
        <CustomAlert
          message={this.state.errorMessage}
          show={this.state.showAlert}
          variant={this.state.variant}
          close={() => this.setState({ showAlert: false })}
        />
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
                    <AddBeneficiaryForm
                      handleChange={this.createBeneficiary}
                      handleBack={() =>
                        this.props.history.push(`${ROUTES.BENEFICIARY_LIST}`)
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
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  beneficiary: state.senderDetail.beneficiaries,
  payoutMehod: state.senderDetail.payoutMehod,
  acceptPolicy: state.auth.accept_policy,
});
const mapActionToProps = { getBeneficiaries, setBeneficiary };

AccountDetail.propTypes = {
  setBeneficiary: PropTypes.func,
  payoutMehod: PropTypes.string,
  beneficiary: PropTypes.array,
  history: PropTypes.object,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withRouter(AccountDetail));

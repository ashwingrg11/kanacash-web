import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import MyAccountSidebar from "../../../components/MyAccountSidebar";
import { withRouter } from "react-router-dom";
import Header from "../../../containers/layout/Header";
import { getBeneficiaries } from "../../../store/actions/senderDetail";
import { connect } from "react-redux";
import CustomAlert from "../../../components/Alert/CustomAlert";
import Footer from "../../../containers/layout/Footer";
import BeneficiaryList from "../../../containers/user/BenificiaryList";
import AccountHeader from "../../../containers/user/AccountHeader";
import Disclaimer from "../../../components/Disclaimer/Disclaimer";

class BeneficiaryLists extends Component {
  state = {
    beneficiaryList: [],
    showAlert: false,
    message: "",
    variant: "",
  };

  componentDidMount = () => {
    this.props.getBeneficiaries();
    if (this.props.location.state?.showAlert) {
      this.setState({
        showAlert: true,
        message: this.props.location.state?.message,
        variant: this.props.location.state?.variant,
      });
    }
  };

  editedBeneficiary = (value) => {
    this.setState(value);
  };
  componentDidUpdate = (prevProps) => {
    if (prevProps.beneficiary !== this.props.beneficiary) {
      this.setState({ beneficiaryList: this.props.beneficiary });
    }
    if (prevProps.activePage !== this.props.activePage) {
      this.setState({ activePage: this.props.activePage });
    }
  };

  payoutMethodAdded = () => {
    this.props.getBeneficiaries();
    this.setState({
      showAlert: true,
      message: "Beneficiary's bank has been added as a new payout method.",
      variant: "success",
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
                    <BeneficiaryList
                      editedBeneficiary={(value) =>
                        this.editedBeneficiary(value)
                      }
                      handleChange={this.payoutMethodAdded}
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
  beneficiary: state.senderDetail.beneficiaries,
  activePage: state.senderDetail.activePage,
  acceptPolicy: state.auth.accept_policy,
});
const mapActionToProps = { getBeneficiaries };

BeneficiaryLists.propTypes = {
  getBeneficiaries: PropTypes.func,
  location: PropTypes.object,
  beneficiary: PropTypes.array,
  activePage: PropTypes.string,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withRouter(BeneficiaryLists));

import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import MyAccountSidebar from "../../components/MyAccountSidebar";
import { withRouter } from "react-router-dom";
import Header from "../../containers/layout/Header";
import { getBeneficiaries } from "../../store/actions/senderDetail";
import { connect } from "react-redux";
import Footer from "../../containers/layout/Footer";

import AccountHeader from "../../containers/user/AccountHeader";
import Setting from "../../containers/user/Setting";
import CustomAlert from "../../components/Alert/CustomAlert";
import Disclaimer from "../../components/Disclaimer/Disclaimer";
const Settings = () => {
  const [state, setState] = React.useState({
    showAlert: false,
    message: "",
    variant: "",
  });

  const changePassword = (value) => {
    if (value.success) {
      setState({
        showAlert: true,
        message: "Your password has been reset successfully.",
        variant: "success",
      });
    } else {
      setState({
        showAlert: true,
        message: value.data.message,
        // message: "The old password you have entered is incorrect. Please try again.",
        variant: "danger",
      });
    }
  };
  return (
    <React.Fragment>
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
                  <Setting handleChange={(value) => changePassword(value)} />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
      {!localStorage.acceptPolicy && <Disclaimer />}

      <CustomAlert
        show={state.showAlert}
        variant={state.variant}
        message={state.message}
        close={() => setState({ showAlert: false })}
      />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  beneficiary: state.senderDetail.beneficiaries,
  activePage: state.senderDetail.activePage,
  acceptPolicy: state.auth.accept_policy,
});
const mapActionToProps = { getBeneficiaries };

export default connect(mapStateToProps, mapActionToProps)(withRouter(Settings));

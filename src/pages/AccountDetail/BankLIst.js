import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import MyAccountSidebar from "../../components/MyAccountSidebar";
import { withRouter } from "react-router-dom";
import Header from "../../containers/layout/Header";
import Footer from "../../containers/layout/Footer";
import BankList from "../../containers/user/BankList";
import CustomAlert from "../../components/Alert/CustomAlert";
import AccountHeader from "../../containers/user/AccountHeader";
import Disclaimer from "../../components/Disclaimer/Disclaimer";
import { connect } from "react-redux";
class BankLists extends Component {
  state = {
    showAlert: false,
    message: "",
    variant: "",
  };

  bankDeletedSuccess = () => {
    this.setState({
      showAlert: true,
      message: "Selected bank has been deleted successfully.",
      variant: "success",
    });
  };
  errorWhileDeletingBank = (value) => {
    console.log(value);
    this.setState({
      showAlert: true,
      message: `${value.response.message}`,
      variant: "danger",
    });
  };

  bankAdded = (value) => {
    if (value.status === "BANK_ADDED") {
      this.setState({
        showAlert: true,
        message: value.message,
        variant: "success",
      });
    } else if (value.status === "BANK_ERROR") {
      this.setState({
        showAlert: true,
        message: value.message,
        variant: "danger",
      });
    }
  };
  render() {
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
                    <BankList
                      addBank={(e) => this.bankAdded(e)}
                      bankDeletedSuccess={this.bankDeletedSuccess}
                      errorWhileDeletingBank={(value) =>
                        this.errorWhileDeletingBank(value)
                      }
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
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  acceptPolicy: state.auth.accept_policy,
});

export default connect(mapStateToProps)(withRouter(BankLists));

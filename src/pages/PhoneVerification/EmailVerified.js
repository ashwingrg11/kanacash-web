import React, { Component } from "react";
import { Row, Col, Button, Card, Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import ROUTES from "../../assets/Routes/Routes";
import PhoneVerifiedImg from "../../assets/images/phoneVerified.svg";
import Header from "../../containers/layout/Header";
import Footer from "../../containers/layout/Footer";
import { getCurrentUser } from "../../store/actions/UserDetailsActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Disclaimer from "../../components/Disclaimer/Disclaimer";
class EmailVerified extends Component {
  nextStep = () => {
    this.props.getCurrentUser();
    if (localStorage.signUpFromTransaction) {
      this.props.history.push(`${ROUTES.SENDER_DETAIL_KYC_TRANSACTION}`);
    } else {
      this.props.history.push(`${ROUTES.PAYMENT_DETAIL}`);
    }
    localStorage.removeItem("signUpFromTransaction");
  };

  render() {
    return (
      <>
        <Header />
        <section className="front-background">
          <div className="w-100 circle-stroke form-up-wrap">
            <Container>
              <Row>
                <Col className="m-auto theme-form phone-verification-form">
                  <Card className="text-center">
                    <Card.Body>
                      <Col className="mb-4 justify-content-center p-0 pt-md-4">
                        <img src={PhoneVerifiedImg} alt="PhoneVerifiedImg" />
                      </Col>
                      <div className="mb-1 justify-content-center">
                        <h2 className="sub-title title-success mb-1">
                          Congratulations!!!
                        </h2>
                        <p>Your account has been activated.</p>
                      </div>

                      <Row>
                        <Col>
                          <Button
                            block
                            onClick={() => this.nextStep()}
                            className="btn btn-secondary btn-secondary-big"
                          >
                            Click to continue!{" "}
                          </Button>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        </section>
        <Footer />
        {!localStorage.acceptPolicy && <Disclaimer />}
      </>
    );
  }
}
EmailVerified.propTypes = {
  history: PropTypes.object,
  getCurrentUser: PropTypes.func,
};

const mapStateToProps = (state) => ({
  acceptPolicy: state.auth.accept_policy,
});

const mapDispatchToProps = {
  getCurrentUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EmailVerified));

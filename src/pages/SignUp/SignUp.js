import React, { Component } from "react";
import { Row, Col, Card, Container } from "react-bootstrap";

import "./index.css";

import ROUTES from "../../assets/Routes/Routes";
import Header from "../../containers/layout/Header";
import SignupForm from "../../containers/user/SignupForm";
import Footer from "../../containers/layout/Footer";
import CustomAlert from "../../components/Alert/CustomAlert";
import PropTypes from "prop-types";
import Disclaimer from "../../components/Disclaimer/Disclaimer";
import { connect } from "react-redux";
class SignUp extends Component {
  state = {
    errorMessage: "",
    variant: "",
    showAlert: false,
  };

  register = () => {
    this.props.history.push(`${ROUTES.PHONE_VERIFICATION}`);
  };

  closeModal = () => {
    this.setState({ showAlert: false, variant: "", errorMessage: "" });
  };

  render() {
    return (
      <React.Fragment>
        <Header />
        <section className="front-background">
          <Container>
            <Row>
              <div className="circle-stroke form-up-wrap">
                <Col className="m-auto theme-form signup-form">
                  <Card>
                    <Card.Body>
                      <h2 className="sub-title">Sign up for free!</h2>
                      <Row>
                        <Col>
                          <SignupForm
                            successfullySignup={() => this.register()}
                          />
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </div>
            </Row>
            <CustomAlert
              show={this.state.showAlert}
              message={this.state.errorMessage}
              variant={this.state.variant}
              close={this.closeModal}
            />
          </Container>
        </section>

        <Footer />
        {!localStorage.acceptPolicy && <Disclaimer />}
      </React.Fragment>
    );
  }
}

SignUp.propTypes = {
  history: PropTypes.object,
};

const mapStateToProps = (state) => ({
  acceptPolicy: state.auth.accept_policy,
});

export default connect(mapStateToProps)(SignUp);

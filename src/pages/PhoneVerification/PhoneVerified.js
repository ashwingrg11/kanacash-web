import React from "react";
import { Row, Col, Button, Card, Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import ROUTES from "../../assets/Routes/Routes";
import PhoneVerifiedImg from "../../assets/images/phoneVerified.svg";
import Header from "../../containers/layout/Header";
import Footer from "../../containers/layout/Footer";
import Disclaimer from "../../components/Disclaimer/Disclaimer";
import { connect } from "react-redux";
const PhoneVerified = (props) => {
  return (
    <React.Fragment>
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
                      <h2 className="sub-title title-success mb-1">Verified</h2>
                      <p>Your phone number has been verified</p>
                    </div>
                    <Row>
                      <Col>
                        <Button
                          block
                          onClick={() =>
                            props.history.push(`${ROUTES.EMAIL_VERIFICATION}`)
                          }
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
    </React.Fragment>
  );
};

PhoneVerified.propTypes = {
  history: PropTypes.object,
};
const mapStateToProps = (state) => ({
  acceptPolicy: state.auth.accept_policy,
});

export default connect(mapStateToProps)(withRouter(PhoneVerified));

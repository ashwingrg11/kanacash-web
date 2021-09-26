import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Confetti from "react-confetti";
import ROUTES from "../../assets/Routes/Routes";
import CongratulationImg from "../../assets/images/congratulation.svg";
import Header from "../../containers/layout/Header";
import Footer from "../../containers/layout/Footer";
import { clearTransactionData } from "../../store/actions/TrasactionAction";
import Disclaimer from "../../components/Disclaimer/Disclaimer";
class CongratulationPage extends React.Component {
  render() {
    const receiverInfo = this.props.location.state;
    return (
      <React.Fragment>
        <Header />
        <div className="shadow-line"></div>
        <section className="front-background-no-bg">
          <Container>
            <Row>
              <Col className="col-md-6 offset-md-3 d-flex justify-content-center mt-5 mb-4">
                <Row>
                  <Col className="d-flex  flex-column align-items-center justify-align-center">
                    <Confetti
                      recycle={false}
                      width={"300px"}
                      height={"400px"}
                      numberOfPieces={200}
                      style={{ margin: "0 auto" }}
                      drawShape={(ctx) => {
                        ctx.beginPath();
                        for (let i = 0; i < 22; i++) {
                          const angle = 0.2 * i;
                          const x = (0.2 + 1.5 * angle) * Math.cos(angle);
                          const y = (0.2 + 1.5 * angle) * Math.sin(angle);
                          ctx.lineTo(x, y);
                        }
                        ctx.stroke();
                        ctx.closePath();
                      }}
                      opacity={3.0}
                    />{" "}
                    <img
                      src={CongratulationImg}
                      alt="CongratulationImg"
                      className="mt-2"
                    />
                    <div className="mb-1 justify-content-center text-center">
                      <h2 className="sub-title title-success mb-1">
                        {" "}
                        Congratulations!
                      </h2>
                      <p>Your money transfer is on its way to</p>
                      <span className="account-title mb-3 d-block">
                        {receiverInfo?.first_name} {receiverInfo?.last_name}
                      </span>
                      <p>
                        {" "}
                        Please go to your dashboard to view your receipt and
                        other details. We will send you an email with your
                        recipt and notification agter the transaction is
                        delivered
                      </p>
                    </div>
                    <div className="button-group text-center">
                      <button
                        className="btn btn-secondary m-2"
                        onClick={() => {
                          this.props.history.push(`${ROUTES.DASHBOARD}`);
                        }}
                      >
                        Go to Dashboard
                      </button>
                      <button className="btn btn-primary btn-primary-border m-2">
                        Notify Beneficary
                      </button>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
        <Footer />
        {!localStorage.acceptPolicy && <Disclaimer />}
      </React.Fragment>
    );
  }
}

CongratulationPage.propTypes = {
  receiverInfo: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object,
};

const mapStateToProps = (state) => ({
  receiverInfo: state.transaction.receiverInfo,
  acceptPolicy: state.auth.accept_policy,
});

const mapActionToProps = { clearTransactionData };

export default connect(
  mapStateToProps,
  mapActionToProps
)(withRouter(CongratulationPage));

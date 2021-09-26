import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";

import Header from "../../containers/layout/Header";
import { connect } from "react-redux";

import Footer from "../../containers/layout/Footer";
import Disclaimer from "../../components/Disclaimer/Disclaimer";

class AboutUs extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="shadow-line"></div>
        <section className="theme-inner">
          <Container className="static-content">
            <Row>
              <Col className="mt-5">
                <h2 className="sub-title">About Us</h2>
                <p>
                  Transfer pay Ltd is a safe, convenient, and secure online
                  platform to transfer funds to Africa. Whether it be funding
                  for the business, expenses for home, or donations for charity,
                  Transfer Pay Ltd is the one-stop-shop for your money transfer
                  concerns. We work with banks and mobile money operators to
                  streamline the money transfer process, ensuring not only a
                  speedy transfer but also providing a vast network across the
                  country for receiving the money.
                </p>
                <p>
                  Transfer Pay Ltd is dedicated to providing safe and secure
                  money transfer services to the people of Sierra Leone, from
                  the people residing in the USA, Europe and the United Kingdom.
                  Our company is native to the United Kingdom, and we serve to
                  provide the best money transfer services by offering minimal
                  transfer charges and fast transactions.
                </p>
                <p>
                  We facilitate our clients in their transactions by allowing
                  bank transfer, Cash pickup and transfer to mobile money
                  accounts, to all parts of Sierra Leone, making it accessible
                  and convenient for the receivers.
                </p>
                <h3 className="subhead-title mt-4">OUR VISION</h3>
                <p>
                  Transfer pay ltd. Is dedicated to expanding its money
                  transferring services across the globe. We desire to
                  streamline the money transfer process and make it easier for
                  people to move money across the borders.
                </p>
                <h3 className="subhead-title mt-4">OUR MISSION</h3>
                <p>
                  We aim to maximize client satisfaction, and we achieve that by
                  offering the best conversion rates. We realize the importance
                  of transfer, and urgency of the cause, and we work with
                  different service providers to produce the maximum output.
                </p>
              </Col>
            </Row>
            {/* Contain For About Page Here !! */}
          </Container>
        </section>

        <Footer />
        {!localStorage.acceptPolicy && <Disclaimer />}
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  acceptPolicy: state.auth.accept_policy,
});

export default connect(mapStateToProps)(AboutUs);

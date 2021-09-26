import React, { Component } from "react";
import { Row, Col, Container, Accordion, Card } from "react-bootstrap";

import Header from "../../containers/layout/Header";
import { connect } from "react-redux";

import Footer from "../../containers/layout/Footer";
import Disclaimer from "../../components/Disclaimer/Disclaimer";

class ContactPage extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="shadow-line"></div>
        <section className="theme-inner">
          <Container className="d-flex justify-content-center static-content">
            <Row>
              <Col className="mt-5">
                <h2 className="sub-title text-center">Contact Us</h2>
                <Row className="mt-4">
                  <Col>
                    <Accordion defaultActiveKey="0">
                      <Card xl="12">
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                          Shelton Street, Covent Garden, London
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                          <Card.Body>
                            <Row>
                              <Col>
                                <Row>
                                  <Col md="4" className="text-muted">
                                    Address
                                  </Col>
                                  <Col md="8">
                                    71-75, Shelton Street, Covent Garden,
                                    London, United Kingdom, WC2H 9JQ
                                  </Col>
                                </Row>
                                <Row className="mt-3">
                                  <Col md="4" className="text-muted">
                                    Phone Number USA
                                  </Col>
                                  <Col md="8">
                                    <a href="tel:+12055573200">+12055573200</a>
                                  </Col>
                                </Row>
                                <Row className="mt-3">
                                  <Col md="4" className="text-muted">
                                    Phone Number Sierra Leone
                                  </Col>
                                  <Col md="8">
                                    <a href="tel:232 75 168817">
                                      +232 75 168817
                                    </a>
                                  </Col>
                                </Row>
                                <Row className="mt-3">
                                  <Col md="4" className="text-muted">
                                    Email
                                  </Col>
                                  <Col md="8">
                                    <a href="mailto:hello@transfapay.com">
                                      hello@transfapay.com
                                    </a>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    </Accordion>
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
  acceptPolicy: state.auth.accept_policy,
});

export default connect(mapStateToProps)(ContactPage);

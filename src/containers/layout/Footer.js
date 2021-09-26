import React, { Component } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import ROUTES from "../../assets/Routes/Routes";
import "./index.css";

class Footer extends Component {
  render() {
    return (
      <footer className="footer-section text-center">
        <Container>
          <Row>
            <Col xs="12">
              {localStorage.role !== "ADMIN" && (
                <div className="foot-nav">
                  <NavLink
                    to={{ pathname: `${ROUTES.WELCOME}` }}
                    className="link"
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to={{ pathname: `${ROUTES.ABOUT_US}` }}
                    className="link"
                  >
                    About Us
                  </NavLink>
                  <NavLink
                    to={{ pathname: `${ROUTES.TERM_SERVICES}` }}
                    className="link"
                  >
                    Terms
                  </NavLink>
                  <NavLink
                    to={{ pathname: `${ROUTES.PRIVACY_POLICY}` }}
                    className="link"
                  >
                    Privacy Policy
                  </NavLink>
                  <NavLink
                    to={{ pathname: `${ROUTES.COPY_RIGHT}` }}
                    className="link"
                  >
                    Copyright
                  </NavLink>
                  <NavLink to={{ pathname: "/contact-us" }} className="link">
                    Contact
                  </NavLink>
                </div>
              )}
            </Col>
            <Col sm="12" className="copyright">
              <p>
                © Golden Money Transfer Inc. 2020. All Rights Reserved.{" "}
                <b>Licensed by</b> Department of Financial Institutions, Nevada
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
    );
  }
}

export default Footer;

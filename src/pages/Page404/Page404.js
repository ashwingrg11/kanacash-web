import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import star from "../../assets/images/star.svg";
import Header from "../../containers/layout/Header";
import Footer from "../../containers/layout/Footer";
import COLORS from "../../assets/Color/Color";
import Disclaimer from "../../components/Disclaimer/Disclaimer";
import { connect } from "react-redux";
const Page404 = () => {
  return (
    <React.Fragment>
      <Header />
      <section className="front-background">
        <Container>
          <Row>
            <div className="circle-stroke country-circle">
              <Col>
                <Row>
                  <Col className="text-center p-0">
                    <h2 className="title">
                      <img src={star} alt="star-icon" className="ml-1" />
                      <span style={{ color: `${COLORS.PRIMARY_COLOR}` }}>
                        {" "}
                        &nbsp; Oops! &nbsp;{" "}
                      </span>
                      <img src={star} alt="star-icon" className="mr-1" />
                    </h2>
                    <p className="tagline">404 PAGE NOT FOUND</p>
                  </Col>
                </Row>
              </Col>
            </div>
          </Row>
        </Container>
      </section>
      <Footer />
      {!localStorage.acceptPolicy && <Disclaimer />}
    </React.Fragment>
  );
};
const mapStateToProps = (state) => ({
  acceptPolicy: state.auth.accept_policy,
});

export default connect(mapStateToProps)(Page404);

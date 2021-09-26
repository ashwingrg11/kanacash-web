import React, { Component } from "react";
import Header from "../../containers/layout/Header";
import { Container, Row, Col } from "react-bootstrap";
import Footer from "../../containers/layout/Footer";
import AdminSideBar from "../../containers/admin/AdminSideBar";
import Dashboard from "../../containers/admin/AdminDashboard";
import Disclaimer from "../../components/Disclaimer/Disclaimer";
import { connect } from "react-redux";
class AdminDashboard extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="shadow-line"></div>
        <Container>
          <Row
            style={{
              minHeight: "900px",
            }}
          >
            <Col>
              <Row>
                <Col xl="3" lg="4" md="5" sm="12" style={{ marginTop: "40px" }}>
                  <AdminSideBar />
                </Col>
                <Col xl="9" lg="8" md="7" sm="12" style={{ marginTop: "40px" }}>
                  <Dashboard />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>

        <Footer />
        {!localStorage.acceptPolicy && <Disclaimer />}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  acceptPolicy: state.auth.accept_policy,
});

export default connect(mapStateToProps)(AdminDashboard);

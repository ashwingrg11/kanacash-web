import React, { Component } from "react";
import Header from "../../containers/layout/Header";
import { Container, Row, Col } from "react-bootstrap";
import Footer from "../../containers/layout/Footer";
import AdminSideBar from "../../containers/admin/AdminSideBar";
import AddFeeSetContain from "../../containers/admin/AddFeeSet";
import CustomAlert from "../../components/Alert/CustomAlert";
import Disclaimer from "../../components/Disclaimer/Disclaimer";
import { connect } from "react-redux";
class AddFeeSet extends Component {
  state = { showAlert: false, message: "", variant: "" };
  addEditFeeStructure = (value) => {
    this.setState(value);
  };
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
                <Col xl="3" lg="3" md="3" sm="12" style={{ marginTop: "40px" }}>
                  <AdminSideBar />
                </Col>
                <Col xl="9" lg="9" md="9" sm="12" style={{ marginTop: "40px" }}>
                  <AddFeeSetContain
                    handleChange={(value) => this.addEditFeeStructure(value)}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>

        <Footer />
        {!localStorage.acceptPolicy && <Disclaimer />}

        <CustomAlert
          show={this.state.showAlert}
          variant={this.state.variant}
          message={this.state.message}
          close={() => this.setState({ showAlert: false })}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  acceptPolicy: state.auth.accept_policy,
});

export default connect(mapStateToProps)(AddFeeSet);

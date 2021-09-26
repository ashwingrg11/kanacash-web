import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";

import { withRouter } from "react-router-dom";
import Header from "../../containers/layout/Header";
import Footer from "../../containers/layout/Footer";

import ROUTES from "../../assets/Routes/Routes";
import * as api from "../../services/axios/authApi";
import PropTypes from "prop-types";

import SendMoneyHeader from "../../containers/transaction/SendMoneyHeader";
import SendingMoneyDetail from "../../containers/transaction/SendingMoneyDetail";
import InnerHTML from "dangerously-set-html-content";
import { getCurrentUser } from "../../store/actions/UserDetailsActions";
import { connect } from "react-redux";
import Disclaimer from "../../components/Disclaimer/Disclaimer";
class SenderDetailsKYC extends Component {
  constructor(props) {
    super(props);
    this.state = { widgetToken: {} };
    window.addEventListener("message", function (e) {
      if (
        e.data.status !== "UNVERIFIED" &&
        e.data.status !== "SUSPENDED" &&
        e.data.status !== undefined
      ) {
        // if (e.data.status) {
        if (
          e.data.status !== "RETRY" &&
          e.data.status !== "REVIEW_PENDING" &&
          e.data.type.toLowerCase() === "kyc"
        ) {
          console.log(e.data.status);
          props.getCurrentUser();
          props.history.push(`${ROUTES.BENEFICIARY_DETAIL}`);
        }
      }
    });
  }

  widget = () => {
    return `<div id="widget-root"></div>
      <script id="myScript"
      src="https://sandbox.api.machpay.com/v2/widget/widget.js"
      charset="utf-8"
      ></script>
      <script id="myScript">
      var widget = new MachnetWidget({
        elementId: 'widget-root',
        senderId: "${this.state.widgetToken.sender_id}",
        width: '100%',
        height: '600px',
        type: "kyc",
        locale: 'en',
        multiStep: true,
        stylesheet: 'https://example.com/mystyle.css',
        token:
         "${this.state.widgetToken.token}"
      });
      widget.init();
      </script>`;
  };

  componentDidMount = () => {
    api
      .getWidgetToken()
      .then((res) => {
        this.setState({ widgetToken: res.data });
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  render() {
    return (
      <>
        <Header />
        <div className="shadow-line"></div>
        <Container>
          <Row
            style={{
              minHeight: "800px",
            }}
          >
            <Col>
              <SendMoneyHeader />

              <Row className="mt-4">
                <Col xl="6" md="6" sm="12">
                  <Row>
                    <Col className="p-0">
                      <InnerHTML html={this.widget()} />
                    </Col>
                  </Row>
                </Col>
                <Col
                  md="6"
                  sm="12"
                  xl={{ span: 5, offset: 1 }}
                  className="sumary-bar"
                >
                  <SendingMoneyDetail />
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

SenderDetailsKYC.propTypes = {
  history: PropTypes.object,
  getCurrentUser: PropTypes.func,
};

const mapDispatchToProps = { getCurrentUser };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SenderDetailsKYC));

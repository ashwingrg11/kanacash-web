import React, { Component } from "react";
import { Row, Col, Card, Accordion } from "react-bootstrap";
import PropTypes from "prop-types";

import InnerHTML from "dangerously-set-html-content";
import * as api from "../../services/axios/authApi";
import { connect } from "react-redux";
import { isEmpty } from "../../utils/isEmpty";

class TransactionLimit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      widgetToken: "",
      key: "",
    };
  }

  componentDidMount = () => {
    this._mount = true;
    if (this._mount) {
      api
        .getWidgetToken()
        .then((res) => {
          this.setState({ widgetToken: res.data });
        })
        .catch((err) => {
          // console.log(err);
        });
      if (!isEmpty(this.props.user)) {
        if (this.props.user.current_tier === "LEVEL1") {
          this.setState({ key: "0" });
        } else if (this.props.user.current_tier === "LEVEL2") {
          this.setState({ key: "1" });
        } else {
          this.setState({ key: "2" });
        }
      }
    }
  };
  componentWillUnmount = () => {
    this._mount = false;
  };
  componentDidUpdate = (prevProps) => {
    if (prevProps.user !== this.props.user) {
      if (this.props.user.current_tier === "LEVEL1") {
        this.setState({ key: "0" });
      } else if (this.props.user.current_tier === "LEVEL2") {
        this.setState({ key: "1" });
      } else {
        this.setState({ key: "2" });
      }
    }
  };

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
        height: '400px',
        type: "tier",
        locale: 'en',
        multiStep: true,
        stylesheet: 'https://example.com/mystyle.css',
        token:
         "${this.state.widgetToken.token}"
      });
      widget.init();
      </script>`;
  };
  render() {
    return (
      <>
        <Row>
          <Col className="activity-title">Upgrade Limit</Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <Card className="p-3">
              <Row>
                <Col>
                  All customers are categorized under three (3) transaction
                  limits based on the amount they can send. If you want to
                  transfer more funds your current transaction limit allows,
                  then you will need to a higher transaction limit. To upgrade,
                  you will be required to provide additional information.
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col lg="7">
            <InnerHTML html={this.widget()} />

            {/* <Card
              className="p-3"
              style={{
                backgroundColor: `${COLORS.LIGHT_BLUE}`,
                border: `1px solid ${COLORS.BLUE_COLOR}`,
              }}
            >
              <Row>
                <Col>
                  Your tier upgrade request is being processed. You will be
                  notified once approved. You can still create a transaction in
                  your current tier.
                </Col>
              </Row>
            </Card> */}
          </Col>
          <Col lg="5" className="mt-2 level-accordion">
            <Accordion activeKey={this.state.key}>
              <Card className="mb-2">
                <Accordion.Toggle
                  as={Card.Header}
                  eventKey="0"
                  onClick={() => this.setState({ key: "0" })}
                >
                  Level 1{" "}
                  {this.props.user.current_tier === "LEVEL1" && (
                    <span>(Current Limit)</span>
                  )}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <p>
                      <b>Requirement</b>
                    </p>
                    <ul className="mb-3">
                      <li>Full Name</li>
                      <li>Gender</li>
                      <li>Full Address (Street, City, State, Zip Code)</li>
                      <li>Date of Birth</li>
                      <li>Phone Number</li>
                      <li>OFAC and Sanction List Checks</li>
                    </ul>
                    <p>
                      <b>Note: </b>Limit for Level 1 customers
                    </p>
                    <ul>
                      <li> upto $500 per transaction</li>
                      <li>upto $500 per day</li>
                      <li>upto $500 per 15 days</li>
                      <li>upto $1,000 per 30 days</li>
                      <li>upto $3,000 per 6 months</li>
                    </ul>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card className="mb-2">
                <Accordion.Toggle
                  as={Card.Header}
                  eventKey="1"
                  onClick={() => this.setState({ key: "1" })}
                >
                  Level 2{" "}
                  {this.props.user.current_tier === "LEVEL2" && (
                    <span>(Current Limit)</span>
                  )}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>
                    <p>
                      <b>Requirement</b>
                    </p>
                    <ul className="mb-3">
                      <li>Id Number</li>
                      <li>ID issuing Authority</li>
                      <li>ID Expiry Date</li>
                      <li>Copy of Customer Id</li>
                    </ul>
                    <p>
                      <b>Note: </b>Limit for Level 2 customers
                    </p>
                    <ul>
                      <li> upto $1,000 per transaction</li>
                      <li>upto $2,999 per day</li>
                      <li>upto $2,999 per 15 days</li>
                      <li>upto $5,000 per 30 days</li>
                      <li>upto $9,999 per 6 months</li>
                    </ul>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card className="mb-2">
                <Accordion.Toggle
                  as={Card.Header}
                  eventKey="2"
                  onClick={() => this.setState({ key: "2" })}
                >
                  Level 3{" "}
                  {this.props.user.current_tier === "LEVEL3" && (
                    <span>(Current Limit)</span>
                  )}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="2">
                  <Card.Body>
                    <p>
                      <b>Requirement</b>
                    </p>
                    <ul className="mb-3">
                      <li> Full SSN</li>
                      <li>Occupation</li>
                      <li>Company Details</li>
                      <li>Purpose of Remittance</li>
                      <li>Sender Beneficiary Relationship</li>
                      <li>Source of Funds:</li>
                      <li>1. Bank Statement 2. Pay Slip</li>
                    </ul>
                    <p>
                      <b>Note: </b>Limit for Level 3 customers
                    </p>
                    <ul>
                      <li> upto $2,000 per transaction</li>
                      <li>upto $3,000 per day</li>
                      <li>upto $6,000 per 15 days</li>
                      <li>upto $10,000 per 30 days</li>
                      <li>upto $30,000 per 6 months</li>
                    </ul>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Col>
        </Row>
      </>
    );
  }
}

// const mapDispatchToProps = {
// getActiveAccountPage,
// getCurrentUser,
// getActiveAccountSideBar,
// };

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

TransactionLimit.propTypes = {
  user: PropTypes.object,
};
export default connect(mapStateToProps, null)(TransactionLimit);

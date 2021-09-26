import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import COLORS from "../../assets/Color/Color";
import { withRouter } from "react-router-dom";
import PropTypes from 'prop-types'

class ReciverCashPickUpInfo extends Component {
  render() {
    // let addressInfo = { ...this.props.receiverInfo.address };
    return (
      <Row>
        <Col>
          <Row>
            <Col
              style={{
                color: `${COLORS.LICENCE_COLOR}`,
                fontSize: "16px",
                fontWeight: "Bold",
                marginTop: "15px",
              }}
            >
              {" "}
              {this.props.cashPickUpInfo.name} 
            </Col>
          </Row>
          <Row>
            <Col
              style={{
                color: `${COLORS.LICENCE_COLOR}`,
                fontSize: "16px",
              }}
            >
              {" "}
              {this.props.cashPickUpInfo.phoneNumber}{" "}
            </Col>
          </Row>

        

          <Row style={{marginTop:"20px"}}>
            <Col
              style={{
                color: `${COLORS.LICENCE_COLOR}`,
                fontSize: "16px",
                fontWeight:"bold"
              }}
            >
Address            </Col>
          </Row>
          <Row>
            <Col
              style={{
                color: `${COLORS.LICENCE_COLOR}`,
                fontSize: "16px",
              }}
            >
              {this.props.cashPickUpInfo.address}{" "}
            </Col>
          </Row>

          <Row style={{marginTop:"20px"}}>
            <Col
              style={{
                color: `${COLORS.LICENCE_COLOR}`,
                fontSize: "16px",
                fontWeight:"bold"
              }}
            >
              Branch Code
            </Col>
          </Row>
          <Row>
            <Col
              style={{
                color: `${COLORS.LICENCE_COLOR}`,
                fontSize: "16px",
              }}
            >
              {this.props.cashPickUpInfo.code}{" "}
            </Col>
          </Row>
        
        </Col>
      </Row>
    );
  }
}

ReciverCashPickUpInfo.propTypes ={
  cashPickUpInfo:PropTypes.object
}
export default withRouter(ReciverCashPickUpInfo);

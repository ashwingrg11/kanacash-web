import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card, Row, Col } from "react-bootstrap";

class DebitCardInfo extends Component {
  render() {
    return (
<Card className="show-bank-info">
        <Row>
          <Col>
              <p> Nick Name :{" "}
              <b>{this.props.cardInfo?.nick_name}{" "}</b></p>
              <p>Card :{" "}
              <b>{this.props.cardInfo?.funding_source_name}{" "}</b></p>
              <p>Network :{" "}
              <b>{this.props.cardInfo?.institution_name}{" "}</b></p>
          </Col>
        </Row>
      </Card>
    );
  }
}
DebitCardInfo.propTypes = {
  cardInfo: PropTypes.object,
};

export default DebitCardInfo;

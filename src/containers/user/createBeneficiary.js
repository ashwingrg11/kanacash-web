import React, { Component } from 'react';
import {Col , Row } from 'react-bootstrap'
import PaymentMethod from './PaymentMethod';

class CrateBeneficary extends Component {
    render() {
        return (
          <>
        <Row>
        <Col className="activity-title">New Beneficiary</Col>
          </Row>
          <Row>
              <Col>
              <PaymentMethod/>
              </Col>
          </Row>
          </>
        );
    }
}


export default CrateBeneficary;
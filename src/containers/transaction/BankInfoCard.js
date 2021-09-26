import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";

const BankInfoCard = (props) => {
  return (
    <Card className="show-bank-info">
      <Row>
        <Col>
          <p>
            Bank Name :{" "}
            <b>
              {props.bankInfo.bank_name
                ? props.bankInfo.bank_name
                : props.bankInfo.institution_name}
            </b>
          </p>
          <p>
            Account Number :{" "}
            <b>
              {props.bankInfo.account_number
                ? props.bankInfo.account_number
                : props.bankInfo.account_holder_name}
            </b>
          </p>
          <p>
            Account Type :{" "}
            <b>
              {props.bankInfo.type
                ? props.bankInfo.type
                : props.bankInfo.account_type}{" "}
            </b>
          </p>
        </Col>
      </Row>
    </Card>
  );
};

BankInfoCard.propTypes = {
  bankInfo: PropTypes.object,
};

export default BankInfoCard;

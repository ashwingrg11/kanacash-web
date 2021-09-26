import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

const SenderBankInfo = (props) => {
  return (
    <div className="user-detail-review bankinfo-sender">
      <p> {props.bankInfo?.bank_name} </p>
      <p>
        <span>Account Number</span>
        {props.bankInfo?.account_number}
      </p>
      {/* <p>
        <span>Account Type</span> {props.bankInfo?.type}
      </p>
      <p>
        <span>Branch Code</span>
        {props.bankInfo?.branch_id}
      </p> */}
    </div>
  );
};

SenderBankInfo.propTypes = {
  bankInfo: PropTypes.object,
};

export default withRouter(SenderBankInfo);

import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

const SenderBankInfo = (props) => {
  return (
    <div className="user-detail-review bankinfo-sender">
      <p> {props.bankInfo?.institution_name} </p>
      <p>
        {" "}
        <span>Account Holder</span>
        {props.bankInfo?.account_holder_name}{" "}
        <span>{props.bankInfo?.verification_status} </span>
      </p>
      <p>
        <span>Account Type</span>
        {props.bankInfo?.account_type}{" "}
      </p>
      {/* <p>
        <span>Branch Code</span>
        {props.bankInfo?.id}{" "}
      </p> */}
    </div>
  );
};

SenderBankInfo.propTypes = {
  bankInfo: PropTypes.object,
};

export default withRouter(SenderBankInfo);

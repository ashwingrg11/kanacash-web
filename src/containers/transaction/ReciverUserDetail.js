import React from "react";
import ROUTES from "../../assets/Routes/Routes";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

const SenderUserDetail = (props) => {
  return (
    <div className="user-detail-review transaction-pty">
      <h4>
        {props.receiverInfo.first_name} {props.receiverInfo.last_name}
        <span
          className="change"
          onClick={() => props.history.push(`${ROUTES.BENEFICIARY_DETAIL}`)}
        >
          (Change)
        </span>
      </h4>
      <p>
        {props.receiverInfo?.province}{props.receiverInfo?.postal_code},{" "}
        {props.receiverInfo.country}
      </p>
    </div>
  );
};

SenderUserDetail.propTypes = {
  history: PropTypes.object,
  receiverInfo: PropTypes.object,
};

export default withRouter(SenderUserDetail);

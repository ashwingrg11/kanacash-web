import React from "react";
import PropTypes from "prop-types";

const SenderUserDetail = (props) => {
  let user = props.userDetail;
  return (
    <div className="user-detail-review transaction-pty">
      <h4>
        {user?.first_name} {user.last_name}
      </h4>
      <p>
        {user.state}
        {/* , {user.stateCode}, {user.country} */}
      </p>
    </div>
  );
};
SenderUserDetail.propTypes = {
  userDetail: PropTypes.object,
};

export default SenderUserDetail;

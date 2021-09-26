import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from 'prop-types'

class SenderCardInfo extends Component {
  render() {
    // let addressInfo = { ...this.props.receiverInfo.address };
    return (
      <div className="user-detail-review">
          <p className="mt-0">{this.props.cardInfo.funding_source_name}{" "}</p>
          <p><span>Nick Name</span>{this.props.cardInfo.nick_name}</p>
          <p><span>Network</span>{this.props.cardInfo.institution_name}{" "}</p>
          {/* <p><span>Account Number</span>{this.props.cardInfo}{" "}</p> */}
          {/* <p><span>Branch Code</span>{this.props.cardInfo.id}{" "}</p> */}
        </div>
    );
  }
}
SenderCardInfo.propTypes = {
  cardInfo:PropTypes.object
}

export default withRouter(SenderCardInfo);

import React, { Component } from 'react';
import COLORS from '../../assets/Color/Color'
import PropTypes from "prop-types";
class ErrorMessage extends Component {
    render() {
        return (
            <div style={{color:`${COLORS.RED_COLOR}`}}>
                {this.props.errorMessage}
            </div>
        );
    }
}
ErrorMessage.propTypes = {
    errorMessage:PropTypes.string
}

export default ErrorMessage;
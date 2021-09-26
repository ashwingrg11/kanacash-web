import React from "react";
import { Alert } from "react-bootstrap";
import PropTypes from "prop-types";

const CustomAlert = ({ close, show, variant, message }) => {
  React.useEffect(() => {
    if (show) {
      setTimeout(() => {
        close();
      }, 5000);
    }
  }, [show, close]);

  return (
    <React.Fragment>
      {show && (
        <Alert
          className="custom-alert"
          variant={variant}
          onClose={() => close()}
          dismissible
        >
          <Alert.Heading>{message}</Alert.Heading>
        </Alert>
      )}
    </React.Fragment>
  );
};

CustomAlert.defaultProps = {
  variant: "success",
};

CustomAlert.propTypes = {
  close: PropTypes.func,
  show: PropTypes.bool,
  variant: PropTypes.oneOf(["danger", "success", ""]),
  message: PropTypes.string,
};

export default CustomAlert;

import React from "react";
import { Spinner, Button } from "react-bootstrap";
import PropTypes from "prop-types";

export default function ButtonSpinner({ isSubmitting, title, ...props }) {
  return (
    <Button
      disabled={isSubmitting}
      type="submit"
      className="bt btn-secondary btn-secondary-big"
      {...props}
    >
      {isSubmitting ? (
        <div className="d-flex justify-content-center align-items-center">
          {title}
          <Spinner style={{ marginLeft: 10 }} animation="border" size="sm" />
        </div>
      ) : (
        title
      )}
    </Button>
  );
}

ButtonSpinner.defaultProps = {
  title: "Button",
  block: true,
  isSubmitting: false,
};

ButtonSpinner.propTypes = {
  isSubmitting: PropTypes.bool,
  title: PropTypes.string,
};

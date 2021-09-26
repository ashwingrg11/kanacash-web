import React from "react";
import { useDispatch } from "react-redux";
// import { Button } from "react-bootstrap";
import { getPolicy } from "../../store/actions/Auth";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import ROUTES from "../../assets/Routes/Routes";
import { Container } from "react-bootstrap";

const Disclaimer = (props) => {
  const dispatch = useDispatch();

  return (
    <div className="disclaimer text-center">
      <Container>
        {/* <Row> */}
        <div className="policy">
          {" "}
          This website uses cookies to ensure you get the best experience on our
          website, as described in our{" "}
          <span
            className="btn-link"
            onClick={() => props.history.push(`${ROUTES.PRIVACY_POLICY}`)}
            style={{ cursor: "pointer" }}
          >
            {" "}
            &nbsp; privacy policy.
          </span>
        </div>
        <div className="policy1">
          This website uses cookies,
          <span
            className="btn-link"
            style={{ cursor: "pointer" }}
            onClick={() => props.history.push(`${ROUTES.PRIVACY_POLICY}`)}
          >
            {" "}
            &nbsp; learn more.
          </span>
        </div>
        <div className="buttonDiv">
          <button
            className="btn-outline-warning"
            style={{
              borderRadius: "50px",
              color: "black",
              border: "none",
              padding: "5px 15px",
            }}
            onClick={() => {
              localStorage.setItem("acceptPolicy", "true");
              dispatch(getPolicy());
            }}
          >
            Accept
          </button>
        </div>
        {/* </Row> */}
      </Container>
    </div>
  );
};
Disclaimer.propTypes = {
  history: PropTypes.object,
};
export default withRouter(Disclaimer);

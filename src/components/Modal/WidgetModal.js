import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import InnerHTML from "dangerously-set-html-content";
import * as api from "../../services/axios/authApi";
import CrossButton from "../../assets/images/Cross.svg";
import PropTypes from "prop-types";

class WidgetModal extends Component {
  constructor(props) {
    super(props);
    this.state = { widgetToken: {} };
    window.addEventListener("message", function (e) {
      if (
        e.data.status !== "UNVERIFIED" &&
        e.data.status !== "SUSPENDED" &&
        e.data.status !== undefined
      ) {
        // if (e.data.status) {
        if (e.data.status !== "RETRY" && e.data.status !== "REVIEW_PENDING") {

          props.handleChange(e.data);
          props.close();
        }
      }
    });
  }

  widget = () => {
    return `<div id="widget-root"></div>
      <script id="myScript"
      src="https://sandbox.api.machpay.com/v2/widget/widget.js"
      charset="utf-8"
      ></script>
      <script id="myScript">
      var widget = new MachnetWidget({
        elementId: 'widget-root',
        senderId: "${this.state.widgetToken.sender_id}",
        width: '100%',
        height: '600px',
        type: "${this.props.type}",
        locale: 'en',
        multiStep: true,
        stylesheet: 'https://example.com/mystyle.css',
        token:
     "${this.state.widgetToken.token}"
  });
  widget.init();

  </script>`;
  };

  componentDidMount = () => {
    this._mount = true;
    if (this._mount) {
      api
        .getWidgetToken()
        .then((res) => {
          this.setState({ widgetToken: res.data });
        })
        .catch((err) => {
          // console.log(err);
        });
    }
  };
  componentWillUnmount = () => {
    this._mount = false;
  };
  render() {
    return (
      <div>
        <Modal
          show={this.props.show}
          onHide={this.props.close}
          keyboard={false}
          centered
        >
          <Modal.Body>
            <div
              style={{
                position: "absolute",
                top: "-10px",
                right: "-10px",
                cursor: "pointer",
              }}
              onClick={() => this.props.close()}
            >
              <img src={CrossButton} alt="CrossButton" />
            </div>
            {this._mount && <InnerHTML html={this.widget()} />}
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
WidgetModal.propTypes = {
  handleChange: PropTypes.func,
  close: PropTypes.func,
  type: PropTypes.string,
  show: PropTypes.bool,
};

export default WidgetModal;

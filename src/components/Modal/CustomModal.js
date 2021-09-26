import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import CrossButton from "../../assets/images/Cross.svg";
import ButtonSpinner from "../../components/ButtonSpinner/ButtonSpinner";

class CustomModal extends Component {
  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.close}
        keyboard={false}
        centered
        className="p-3"
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
            <img src={CrossButton} alt="crossButton" />
          </div>
          <div className="d-flex  flex-column ">
            <div className="d-flex  justify-content-center activity-title">
              {" "}
              {this.props.detail.title}{" "}
            </div>
            <div className="d-flex  justify-content-center mt-2">
              {this.props.detail.body}
            </div>
            <div className=" d-flex justify-content-center sub-title mt-2">
              <ButtonSpinner
                block={false}
                isSubmitting={this.props.isSubmitting}
                title={"Yes"}
                onClick={() => this.props.handleDelete()}
                className="btn btn-danger"
                style={{ width: "100px" }}
              />
              <button
                className="btn btn-secondary btn-secondary-big ml-2"
                onClick={() => this.props.close()}
                style={{ width: "100px" }}
              >
                {" "}
                No
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}
CustomModal.propTypes = {
  close: PropTypes.func,
  show: PropTypes.bool,
  isSubmitting: PropTypes.bool,
  detail: PropTypes.object,
  handleDelete: PropTypes.func,
};

export default CustomModal;

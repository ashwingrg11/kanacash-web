import React from "react";
import { Modal } from "react-bootstrap";

import CrossButton from "../../assets/images/Cross.svg";
import PropTypes from "prop-types";

import AddPayout from "./AddPayout";

const AddPayoutModal = (props) => {
  return (
    <Modal
      show={props.show}
      onHide={props.close}
      keyboard={false}
      centered
      size="md"
      className="modal-add-block"
    >
      <Modal.Body>
        <div
          style={{
            position: "absolute",
            top: "-10px",
            right: "-10px",
            cursor: "pointer",
          }}
          onClick={() => props.close()}
        >
          <img src={CrossButton} alt="CrossButton" />
        </div>
        <AddPayout
          handleChange={props.handleChange}
          handleBack={props.close}
          cashPick={props.close}
        />
      </Modal.Body>
    </Modal>
  );
};

AddPayoutModal.propTypes = {
  handleChange: PropTypes.func,
  close: PropTypes.func,
  show: PropTypes.bool,
};

export default AddPayoutModal;

import React from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";

const ReceiptInvoiceModal = (props) => {
  return (
    <Modal
      show={props.show}
      onHide={props.close}
      keyboard={false}
      centered
      size="xl"
      id="receiptModal"
    >
      <Modal.Body>
        <embed
          src={props.receiptDetail?.frontImageLink}
          width="650px"
          height="800px"
          type="application/pdf"
        />
      </Modal.Body>
    </Modal>
  );
};

ReceiptInvoiceModal.propTypes = {
  close: PropTypes.func,
  show: PropTypes.bool,
  receiptDetail: PropTypes.object,
};

export default ReceiptInvoiceModal;

import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import UpdateBeneficiaryForm from "./UpdateBeneficiaryForm";
import * as api from "../../services/axios/senderApi";
import { connect } from "react-redux";
import CrossButton from "../../assets/images/Cross.svg";

import {
  getBeneficiaries,
  setBeneficiary,
} from "../../store/actions/senderDetail";
class UpdateBeneficiaryModal extends Component {
  updateBeneficiary = (values, { setSubmitting }) => {
    this._mount = true;
    if (this._mount) {
      const data = {
        body: {
          first_name: values.firstName,
          middle_name: values.middleName,
          last_name: values.lastName,
          country: values.country,
          province: values.state,
          city: values.city,
          address_line1: values.addressLine1,
          postal_code: values.postalCode + "",
          mobile_phone: values.phoneNumber + "",
          // TODO: set it dynamic
          sender_relationship: "Sister",
        },
        id: values.beneficiaryId,
      };

      setSubmitting(true);
      api
        .updateBeneficiary(data)
        .then((response) => {
          setSubmitting(false);
          if (response.status === 200) {
            let responseMessage = {
              message: "Beneficiary has been successfully updated.",
              showAlert: true,
              variant: "success",
            };
            this.props.editedBeneficiary(responseMessage);
            this.props.getBeneficiaries();

            this.props.close();
            setSubmitting(false);

            // if (this.props.payoutMehod === "bankPick") {
          } else {
            setSubmitting(false);
            let responseMessage = {
              message:
                "Given recipient cannot be edited because a transaction has already been initiated to the recipient.",
              showAlert: true,
              variant: "danger",
            };
            this.props.close();

            this.props.editedBeneficiary(responseMessage);
          }
        })
        .catch((err) => {
          setSubmitting(false);
        });
    }
  };
  componentDidMount = () => {
    this._mount = true;
  };

  componentWillUnmount = () => {
    this._mount = false;
  };

  render() {
    return (
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
          {this._mount && (
            <UpdateBeneficiaryForm
              beneficiaryDetail={this.props.beneficiaryDetail}
              handleChange={this.updateBeneficiary}
            />
          )}{" "}
        </Modal.Body>
      </Modal>
    );
  }
}
UpdateBeneficiaryModal.propTypes = {
  close: PropTypes.func,
  show: PropTypes.bool,
  getBeneficiaries: PropTypes.func,
  editedBeneficiary: PropTypes.func,
  beneficiaryDetail: PropTypes.object,
};

const mapDispatchToProps = { setBeneficiary, getBeneficiaries };
export default connect(null, mapDispatchToProps)(UpdateBeneficiaryModal);

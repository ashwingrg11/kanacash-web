import React, { Component } from "react";
import { Card, Row, Col } from "react-bootstrap";
import COLORS from "../../assets/Color/Color";
import Phone from "../../assets/images/icons/phone.svg";
import Address from "../../assets/images/icons/address.svg";
import Bank from "../../assets/images/icons/bank.svg";
// import CashPickUp from "../../assets/images/icons/cashPickUp.svg";
// import HomeDelivery from "../../assets/images/icons/homeDelivery.svg";
// import GreenTick from "../../assets/images/icons/greenTick.svg";
// import YellowIll from "../../assets/images/icons/yellowIll.svg";
import { connect } from "react-redux";
import "../../assets/css/style.css";
import PlusImg from "../../assets/images/icons/Plus.svg";
import AddPayout from "./AddPayoutModal";
import * as api from "../../services/axios/auxApi";
import PropTypes from "prop-types";
import UpdateBeneficiaryModal from "./UpdateBeneficiaryModal";

class BeneficiaryCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailShowingId: "",
      addPayout: false,
      showUpdateModal: false,
    };
    this._mount = true;
  }
  componentWillUnmount = () => {
    this._mount = false;
  };

  showDetail = (beneficiaryId) => {
    this.setState({ detailShowingId: beneficiaryId });
  };

  closeModal = () => {
    this.setState({ addPayout: false });
  };

  addBank = (values, { setSubmitting }) => {
    const body = {
      beneficiaryId: this.props.detail.beneficiaryId,
      account_number: JSON.stringify(values.accountNumber),
      bank_id: parseInt(values.bank),
    };
    setSubmitting(true);
    api
      .createBeneficiariesBank(body)
      .then((res) => {
        setSubmitting(false);
        this.setState({ addPayout: false });
        this.props.handleChange();
      })
      .catch((err) => {
        setSubmitting(false);
        // console.log("error while creating beneficiary bank", err.response);
      });
  };

  render() {
    const detail = this.props.detail;
    return (
      <>
        <Col sm="12" className="card-block">
          <Card className="account-card-block">
            <div className="user-edit">
              {`${detail.first_name} ${detail.middle_name} ${detail.last_name}`}{" "}
              <span
                className="btn-link"
                onClick={() => {
                  this.setState({ showUpdateModal: true });
                }}
                style={{ cursor: "pointer", fontSize: "14px" }}
              >
                edit
              </span>
            </div>

            {this.state.detailShowingId !== "" ? (
              <span
                style={{ color: `${COLORS.PRIMARY_COLOR}` }}
                className="show-hide"
                onClick={() => this.setState({ detailShowingId: "" })}
              >
                Hide detail
              </span>
            ) : (
              <span
                style={{ color: `${COLORS.PRIMARY_COLOR}` }}
                className="show-hide"
                onClick={() => this.showDetail(detail.id)}
              >
                Show detail
              </span>
            )}
            {detail.id === this.state.detailShowingId && (
              <Row className="hidden-content">
                <Col md="12" xl="6">
                  {/* <div className="block-with-img">
                    <img src={Mail} alt="Mail" />
                    {detail.email}{" "}
                  </div> */}
                  <div className="block-with-img">
                    <img src={Phone} alt="Phone" />
                    {detail.mobile_phone ? detail.mobile_phone : "N/A"}{" "}
                  </div>
                  <div className="block-with-img with-address">
                    <img src={Address} alt="address" />
                    <Col className="p-0">
                      <p>
                        {" "}
                        {detail.address_line1 +
                          ", " +
                          detail.city +
                          ", " +
                          detail.postal_code}{" "}
                      </p>
                      <p> {detail.province + ", " + detail.country} </p>
                    </Col>
                  </div>
                </Col>
                <Col md="12" xl="6" className="mt-4 mt-xl-0">
                  <Row className="justify-content-md-end mr-0">
                    <Col className="text-center payment-hidden">
                      <img src={Bank} alt="Bank" />
                      <h3>Bank Deposit</h3> <b>{detail.banks?.length}</b>
                    </Col>
                    {/* <Col className="text-center payment-hidden">
                      <img src={CashPickUp} alt="CashPickUp" />
                      <h3>Cash PickUp</h3>{" "}
                      {detail.isCashPickupEnabled ? (
                        <img src={GreenTick} alt="GreenTick" />
                      ) : (
                        <img src={YellowIll} alt="YellowIll" />
                      )}
                    </Col> */}
                    {/* <Col className="text-center payment-hidden">
                      <img src={HomeDelivery} alt="HomeDelivery" />
                      <h3>Home Delivery</h3>{" "}
                      {!detail.isCashPickupEnabled ? (
                        <img src={GreenTick} alt="GreenTick" />
                      ) : (
                        <img src={YellowIll} alt="YellowIll" />
                      )}
                    </Col> */}
                  </Row>
                  <Row className="mt-3">
                    {" "}
                    <Col
                      style={{
                        color: `${COLORS.PRIMARY_COLOR}`,
                        fontWeight: "bold",
                        fontSize: "16px",
                        cursor: "pointer",
                      }}
                      className="d-flex justify-content-md-end align-items-center"
                      onClick={() => {
                        this.setState({ addPayout: true });
                      }}
                    >
                      <img
                        src={PlusImg}
                        alt="PlusImg"
                        style={{ marginRight: "10px" }}
                      />
                      Add new payout method{" "}
                    </Col>
                  </Row>
                </Col>
              </Row>
            )}
          </Card>
        </Col>
        {this._mount && (
          <>
            {" "}
            <AddPayout
              show={this.state.addPayout}
              close={this.closeModal}
              handleChange={this.addBank}
            />
            <UpdateBeneficiaryModal
              show={this.state.showUpdateModal}
              close={() => this.setState({ showUpdateModal: false })}
              beneficiaryDetail={this.props.detail}
              editedBeneficiary={this.props.editedBeneficiary}
            />
          </>
        )}
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  beneficiary: state.senderDetail.beneficiaries,
});
BeneficiaryCard.propTypes = {
  detail: PropTypes.object,
  handleChange: PropTypes.func,
  editedBeneficiary: PropTypes.func,
};

export default connect(mapStateToProps, null)(BeneficiaryCard);

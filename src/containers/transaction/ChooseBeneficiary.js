import React, { Component } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { getBeneficiaries } from "../../store/actions/senderDetail";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import SelectBeneficiaryIcon from "../../assets/images/icons/selectBeneficiary.svg";
import plusCircle from "../../assets/images/icons/plus-circle.svg";
import COLORS from "../../assets/Color/Color";
import {
  getReceiverInfo,
  getReciverPaymentMethod,
  clearReceiverPaymentDetail,
} from "../../store/actions/TrasactionAction";
// import BankIconBlack from "../../assets/images/icons/bankIconInCircle.svg";
// import CashIconBlue from "../../assets/images/icons/cashIconInCircle.svg";
import BankIconBlue from "../../assets/images/icons/bankIconBlueInCircle.svg";
// import CashIconBlack from "../../assets/images/icons/cashIconBlackInCircle.svg";
import CustomDropdown from "../../components/Dropdown/Dropdown";
import BankInfoCard from "./BankInfoCard";
import BackArrow from "../../assets/images/backArrow.svg";
import ROUTES from "../../assets/Routes/Routes";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import PropTypes from "prop-types";
import { isEmpty } from "../../utils/isEmpty";
class ChooseBeneficiary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beneficiaryError: "",
      receiverPaymentMethodError: "",
      benificiaryReferenceId: "",
      noPaymentMethodError: "",
      cashPickup: false,
      bankPickup: false,
      cashPickupPoint: [],
      receiverPaymentMethod: {},
      activeKey: "1",
      beneficiarySelect: false,
      selectedBeneficiary: {},
      bankOptionShow: false,
    };
  }
  selectedBeneficiary = () => {
    this.setState(
      {
        receiverPaymentMethod: {},
        beneficiaryError: "",
        bankOptionShow: false,
        receiverPaymentMethodError: "",
        noPaymentMethodError: "",
        cashPickup: true,
        bankPickup: false,
        benificiaryReferenceId: "",
        selectedBeneficiary: "",
      },
      () => {
        if (document.getElementById("beneficiary").value !== "") {
          const findBeneficiary = this.props.beneficiary.find(
            (item) =>
              item.beneficiaryId ===
              document.getElementById("beneficiary").value
          );
          this.props.getReceiverInfo(findBeneficiary);
          localStorage.setItem(
            "beneficiaryInfo",
            JSON.stringify(findBeneficiary)
          );
          this.setState({
            bankPickup: true,
            selectedBeneficiary: findBeneficiary,
          });
        }
      }
    );
  };
  componentDidUpdate = (prevProps) => {
    if (prevProps.beneficiary !== this.props.beneficiary) {
      if (this.props.beneficiary) {
        // this.selectedBeneficiary();
        const filterBeneficairy = this.props.beneficiary.find(
          (item) =>
            item.beneficiaryId === document.getElementById("beneficiary").value
        );
        if (!!filterBeneficairy) {
          this.setState({ selectedBeneficiary: filterBeneficairy });
        }
      }
    }
  };
  nextStep = () => {
    this.setState({
      beneficiaryError: "",
      receiverPaymentMethodError: "",
      noPaymentMethodError: "",
      benificiaryReferenceId: document.getElementById("beneficiary").value,
    });
    if (document.getElementById("beneficiary").value !== "") {
      if (isEmpty(this.state.receiverPaymentMethod)) {
        this.setState({
          receiverPaymentMethodError: "This field cannot be empty.",
        });
      } else {
        this.props.getReceiverInfo(this.state.selectedBeneficiary);
        this.props.getReciverPaymentMethod(this.state.receiverPaymentMethod);
        localStorage.setItem(
          "beneficiaryDetail",
          JSON.stringify(this.state.receiverPaymentMethod)
        );
        this.props.history.push(`${ROUTES.PAYMENT_INFO}`);
      }
    } else {
      this.setState({ beneficiaryError: "This field cannot be empty." });
    }
  };
  setReceiverBankDetail = () => {
    if (document.getElementById("bankInfoId").value !== "") {
      this.setState({ receiverPaymentMethodError: "" });
      const findBank = this.state.selectedBeneficiary.banks.find((item) => {
        return (
          parseInt(item.bank_id) ===
          parseInt(document.getElementById("bankInfoId").value)
        );
      });
      let receiverPaymentMethod = {
        payoutMethod: "BANK_DEPOSIT",
        payoutDetail: findBank,
      };
      this.setState({ receiverPaymentMethod: receiverPaymentMethod });
    } else {
      this.setState({ receiverPaymentMethod: {} });
    }
  };

  componentDidMount = () => {
    this._mount = true;
    if (this._mount) {
      if (!isEmpty(this.props.receiverInfo)) {
        // this.selectedBeneficiary();
        if (this.props.beneficiary) {
          const findBeneficiary = this.props.beneficiary.find(
            (item) =>
              item.beneficiaryId === this.props.receiverInfo.beneficiaryId
          );

          if (!!findBeneficiary) {
            let receiverPaymentDetail;
            if (!isEmpty(this.props.receiverPaymentMethod)) {
              let payoutDetail = findBeneficiary.banks.find(
                (item) =>
                  item.bank_id ===
                  this.props.receiverPaymentMethod.payoutDetail.bank_id
              );
              receiverPaymentDetail = {
                payoutDetail: payoutDetail,
                payoutMethod: this.props.receiverPaymentMethod.payoutMethod,
              };
            } else {
              receiverPaymentDetail = {};
            }

            this.props.getReceiverInfo(findBeneficiary);
            localStorage.setItem(
              "beneficiaryInfo",
              JSON.stringify(findBeneficiary)
            );
            this.setState({
              selectedBeneficiary: findBeneficiary,
              bankPickup: true,
              receiverPaymentMethod: receiverPaymentDetail,
            });
          }
        }
      }

      this.props.clearReceiverPaymentDetail();
      localStorage.removeItem("beneficiaryDetail");
      localStorage.removeItem("beneficiaryInfo");
    }
  };
  componentWillUnmount = () => {
    this._mount = false;
  };
  render() {
    return (
      <div className="transaction-card">
        <Row>
          <Col>
            <div className="payment-block-wrap">
              <Card>
                <div className="info info-select">
                  <img
                    src={SelectBeneficiaryIcon}
                    alt="SelectBeneficairyIcon"
                  />
                  <CustomDropdown
                    pickerValue={"beneficiaryId"}
                    id="beneficiary"
                    handleChange={this.selectedBeneficiary}
                    options={this.props.beneficiary}
                    title="Select Beneficary"
                    optionValue="first_name"
                    optionValue2="last_name"
                    value={{
                      value: this.state.selectedBeneficiary?.beneficiaryId,
                    }}
                    loading={this.props.presentLoader}
                  />
                </div>
              </Card>
            </div>
          </Col>
        </Row>
        {this.state.beneficiaryError && (
          <ErrorMessage errorMessage={this.state.beneficiaryError} />
        )}
        <Row className="add-section in-steps">
          <Col
            className="add-button-block"
            style={{ cursor: "pointer" }}
            onClick={() => {
              this.props.history.push(`${ROUTES.BENEFICIARY_PAYMENT_METHOD}`);
            }}
          >
            <img src={plusCircle} alt="plusCircle" /> Add the Beneficiary
          </Col>
          {this.state.bankPickup && (
            <Col
              onClick={() => {
                this.props.history.push({
                  pathname: `${ROUTES.BENEFICIARY_ADD_PAYOUT_TRANSACTION}`,
                  state: {
                    beneficiaryReferenceId: `${this.props.receiverInfo.beneficiaryId}`,
                  },
                });
              }}
              className="add-button-block d-flex justify-content-end"
              style={{ cursor: "pointer" }}
            >
              <img src={plusCircle} alt="PlusIMg" /> Add payout Method
            </Col>
          )}
        </Row>
        {this.state.bankPickup && (
          <Row className="payout-block">
            <Col>
              <Row>
                <Col
                  className="mb-3"
                  style={{ fontSize: "20px", fontWeight: "bold" }}
                >
                  Beneficiary payout method
                </Col>
              </Row>
              <Row>
                <Col>
                  <span
                    className="mr-4"
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: `${COLORS.PRIMARY_COLOR}`,
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      this.setState({ bankPickup: true }, () => {
                        this.setState({ receiverPaymentMethod: "" });
                      })
                    }
                  >
                    <img src={BankIconBlue} alt="BankIconBlue" /> Bank deposit
                  </span>
                </Col>
              </Row>
              <Row className="mt-4">
                <Col>
                  <div className="payment-block-wrap">
                    <Card>
                      <div className="info info-select info-without-img">
                        <CustomDropdown
                          id="bankInfoId"
                          handleChange={this.setReceiverBankDetail}
                          options={this.state.selectedBeneficiary.banks}
                          title={"Select the bank"}
                          optionValue={"bank_name"}
                          pickerValue={"bank_id"}
                          value={{
                            value: this.state.receiverPaymentMethod.payoutDetail
                              ?.bank_id,
                          }}
                        />
                        {!isEmpty(this.state.receiverPaymentMethod) && (
                          <Row>
                            <Col className="mt-3">
                              <BankInfoCard
                                bankInfo={
                                  this.state.receiverPaymentMethod.payoutDetail
                                }
                              />
                            </Col>
                          </Row>
                        )}
                        {this.state.receiverPaymentMethodError && (
                          <ErrorMessage
                            errorMessage={this.state.receiverPaymentMethodError}
                          />
                        )}
                      </div>
                    </Card>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        )}
        <div className="button-group">
          <button onClick={() => this.nextStep()} className="btn btn-secondary">
            {" "}
            Continue to next Step
          </button>
          <button
            className="btn btn-back-arrow float-right"
            onClick={() => {
              this.props.history.push(`${ROUTES.PAYMENT_DETAIL}`);
            }}
          >
            <img src={BackArrow} alt="BackArrow" />
            Back{" "}
          </button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  beneficiary: state.senderDetail.beneficiaries,
  receiverInfo: state.transaction.receiverInfo,
  receiverPaymentMethod: state.transaction.receiverPaymentMethod,
  presentLoader: state.loader.presentLoader,
});
const mapActionToProps = {
  getBeneficiaries,
  getReceiverInfo,
  getReciverPaymentMethod,
  clearReceiverPaymentDetail,
};
ChooseBeneficiary.propTypes = {
  getBeneficiaries: PropTypes.func,
  getReceiverInfo: PropTypes.func,
  getReciverPaymentMethod: PropTypes.func,
  clearReceiverPaymentDetail: PropTypes.func,
  beneficiary: PropTypes.array,
  receiverInfo: PropTypes.object,
  receiverPaymentMethod: PropTypes.object,
  history: PropTypes.object,
  presentLoader: PropTypes.bool,
};
export default connect(
  mapStateToProps,
  mapActionToProps
)(withRouter(ChooseBeneficiary));

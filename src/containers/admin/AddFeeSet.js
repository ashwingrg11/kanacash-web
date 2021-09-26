import React, { Component } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import COLORS from "../../assets/Color/Color";
import { Dropdown } from "../../components/CustomDropdown";
import AdminDropdown from "../../components/CustomDropdown/AdminDropdown";
import { InputField } from "../../components/CustomInput";
import plusRound from "../../assets/images/admin/plus-round.svg";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { isEmpty } from "../../utils/isEmpty";
import ButtonSpinner from "../../components/ButtonSpinner/ButtonSpinner";
import * as api from "../../services/axios/adminApi";
import PropTypes from "prop-types";
import { getFeeStructure } from "../../store/actions/adminAction";
import deleteImg from "../../assets/images/icons/delete.png";
import ROUTES from "../../assets/Routes/Routes";
import { getActiveAccountSideBar } from "../../store/actions/senderDetail";

class AddFeeSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sourceDestination: [],
      paymentPayout: [
        {
          paymentMethod: "BANK",
          payoutMethod: "BANK_DEPOSIT",
        },
        {
          paymentMethod: "CARD",
          payoutMethod: "BANK_DEPOSIT",
        },
      ],
      currency: [{ threeCharCode: "USD" }, { threeCharCode: "NGA" }],
      selectedSourceDestination: {},
      selectedPaymentPayout: {},
      isSubmitting: false,
      selectedCurrency: {},
      feeSet: [
        { minAmount: "", maxAmount: "", flatFee: "", percentageFee: "" },
      ],
      edited: false,
      showAlert: false,
      message: "",
      variant: "",
      errorMessage: "",
      errorKey: "",
      errorIndex: "",
    };
  }
  componentDidMount = () => {
    if (this.props.location.data) {
      let data = this.props.location.data;
      this.setState({
        selectedSourceDestination: {
          destName: "nigeria",
          destThreeCharCode: data.destinationCountry,
          destTwoCharCode: "ng",
          destFlagUrl: `https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.2.1/flags/4x3/ng.svg`,
          sourceName: "United Stage",
          sourceThreeCharCode: "USA",
          sourceTwoCharCode: "US",
          sourceFlagUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.2.1/flags/4x3/us.svg",
        },
        selectedPaymentPayout: {
          paymentMethod: data.paymentMethod,
          payoutMethod: data.payoutMethod,
        },
        isSubmitting: false,
        selectedCurrency: { threeCharCode: data.currency },
        feeSet: data.feeRanges,
        edited: true,
      });
    } else {
    }
    this.getSourceDestination(this.props.countries);
  };

  getSourceDestination = (data) => {
    let sourceDestination = [];
    data.map((item) => {
      if (item.three_char_code !== "USA") {
        sourceDestination.push({
          destName: item.name,
          destThreeCharCode: item.three_char_code,
          destTwoCharCode: item.two_char_code,
          destFlagUrl: `https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.2.1/flags/4x3/${item.two_char_code.toLowerCase()}.svg`,
          sourceName: "United Stage",
          sourceThreeCharCode: "USA",
          sourceTwoCharCode: "US",
          sourceFlagUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.2.1/flags/4x3/us.svg",
        });
      }
      return true;
    });
    this.setState({ sourceDestination });
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.countries !== this.props.countries) {
      this.getSourceDestination(this.props.countries);
    }
  };

  handleChange = (values) => {
    let { name, value } = values;
    this.setState({ [name]: value });
  };
  addFeeStructure = () => {
    this.error = false;
    this.maxAmount = 0;
    this.setState({ isSubmitting: true });
    this.state.feeSet.map((item, index) => {
      if (!this.error) {
        for (const key in item) {
          // console.log(item[key] === "");
          if (item[key] === "" || item[key] === isNaN) {
            this.error = true;

            return this.setState({
              errorMessage: "This field cannot be empty.",
              errorKey: key,
              errorIndex: index,
              isSubmitting: false,
            });
          }
        }
        if (item.minAmount >= item.maxAmount) {
          this.error = true;
          this.setState({ isSubmitting: false });

          this.setState({
            errorMessage: `Amount must be greater than ${item.minAmount}.`,
            errorKey: "maxAmount",
            errorIndex: index,
          });
        }
      }
      if (item.minAmount <= this.maxAmount) {
        this.error = true;
        this.setState({ isSubmitting: false });

        this.setState({
          errorMessage: `Amount must be greater than ${this.maxAmount}.`,
          errorKey: "minAmount",
          errorIndex: index,
        });
      }

      this.maxAmount = item.maxAmount;

      return true;
    });
    if (!this.error) {
      let feeStructure = {
        paymentMethod: this.state.selectedPaymentPayout.paymentMethod,
        payoutMethod: this.state.selectedPaymentPayout.payoutMethod,
        currency: this.state.selectedCurrency.threeCharCode,
        sourceCountry: this.state.selectedSourceDestination.sourceThreeCharCode,
        destinationCountry: this.state.selectedSourceDestination
          .destThreeCharCode,
        feeRanges: this.state.feeSet,
      };
      if (this.state.edited) {
        let body = {
          id: this.props.location.data.feeSetId,
          feeStructure: feeStructure,
        };
        api
          .editFeeStructure(body)
          .then((res) => {
            this.setState({
              isSubmitting: false,
            });
            this.props.getFeeStructure();
            if (res.status === 400) {
              this.props.handleChange({
                showAlert: true,
                message: res.data.message,
                variant: "danger",
              });
            }
            else {
              this.props.handleChange({
                showAlert: true,
                message: "Fee set has been updated successfully.",
                variant: "success",
              });
            }
          })
          .catch((err) => {
            this.setState({
              isSubmitting: false,
            });
            this.props.handleChange({
              showAlert: true,
              message: "There was an error while updating fee set.",
              variant: "danger",
            });
          });
      } else {
        api
          .addFeeStructure(feeStructure)
          .then((res) => {
            this.setState({
              isSubmitting: false,
            });
            this.props.getFeeStructure();
            if (res.status === 400) {
              this.props.handleChange({
                showAlert: true,
                message: res.data.message,
                variant: "danger",
              });  
            }
            else {
              this.resetValue();
              this.props.handleChange({
                showAlert: true,
                message: "Fee set has been saved successfully.",
                variant: "success",
              });
            }
          })
          .catch((err) => {
            this.setState({
              isSubmitting: false,
            });
            this.props.handleChange({
              showAlert: true,
              message: "There was an error while saving fee set.",
              variant: "danger",
            });
          });
      }
    }
  };
  handleFeeSet = (values, index) => {
    let { name, value } = values;

    let feeSet = [...this.state.feeSet];
    feeSet[index] = {
      ...feeSet[index],
      [name]: value,
    };
    this.setState((prevState) => ({
      ...prevState,
      feeSet,
      errorMessage: "",
      errorKey: "",
      errorIndex: "",
    }));
  };
  addRow = () => {
    let item = { minAmount: "", maxAmount: "", flatFee: "", percentageFee: "" };
    this.setState({
      feeSet: [...this.state.feeSet, item],
    });
  };

  deleteRow = (deletedIndex) => {
    let filteredBank = this.state.feeSet.filter(
      (item, index) => index !== deletedIndex
    );

    this.setState({
      feeSet: filteredBank,
      errorMessage: "",
      errorKey: "",
      errorIndex: "",
    });
  };

  resetValue = () => {
    this.setState({
      selectedSourceDestination: {},
      selectedPaymentPayout: {},
      isSubmitting: false,
      selectedCurrency: {},
      feeSet: [
        { minAmount: "", maxAmount: "", flatFee: "", percentageFee: "" },
      ],
      edited: false,
      showAlert: false,
      message: "",
      variant: "",
      errorMessage: "",
      errorKey: "",
      errorIndex: "",
    });
  };
  render() {
    return (
      <>
        <Row>
          <Col
            style={{
              color: `${COLORS.BLACK_COLOR}`,
              fontWeight: "bold",
              fontSize: "22px",
            }}
          >
            {this.state.edited ? "Update Fee Set" : "Add Fee Set"}
            {/* Add Fee Set */}
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <Card className="p-3">
              <Row>
                <Col>
                  <Col
                    style={{
                      height: "50px",
                      backgroundColor: `${COLORS.LIGHT_BLUE}`,
                      border: ` 1px solid ${COLORS.BLUE_COLOR}`,
                    }}
                    className="d-flex align-items-center"
                  >
                    Select fee set parameter to set new fee range.{" "}
                  </Col>
                  <Row>
                    <Col>
                      <div className="mt-2 add-fee-structure">
                        <div className="add-fee-equal-w">
                          <label>Source destination</label>{" "}
                          <AdminDropdown
                            option={this.state.sourceDestination}
                            placeHolder="Select source destination"
                            pickerOption1="sourceName"
                            pickerOption2="destName"
                            onChangeOption={(value) => this.handleChange(value)}
                            customName="selectedSourceDestination"
                            customValue={this.state.selectedSourceDestination}
                          />
                        </div>
                        <div className="add-fee-equal-w add-fee-mid">
                          <label>Payment payout</label>{" "}
                          <AdminDropdown
                            option={this.state.paymentPayout}
                            placeHolder="Select source destination"
                            pickerOption1="paymentMethod"
                            pickerOption2="payoutMethod"
                            onChangeOption={(value) => this.handleChange(value)}
                            customName="selectedPaymentPayout"
                            customValue={this.state.selectedPaymentPayout}
                          />
                        </div>
                        <div className="add-fee-currency">
                          <label>Currency</label>
                          <Dropdown
                            option={this.state.currency}
                            placeHolder="Currency"
                            pickerOption="threeCharCode"
                            onChangeOption={(value) => this.handleChange(value)}
                            customName="selectedCurrency"
                            customValue={this.state.selectedCurrency}
                          />
                        </div>
                      </div>
                      {this.state.errorMessage && (
                        <div
                          style={{
                            color: "#dc3545",
                            backgroundColor: "rgba(255,0,0,.27)",
                            fontSize: "13px",
                            padding: "5px",
                            marginTop: "5px",
                          }}
                          className="d-flex justify-content-center"
                        >
                          {this.state.errorMessage}
                        </div>
                      )}

                      {!isEmpty(this.state.selectedSourceDestination) &&
                        !isEmpty(this.state.selectedPaymentPayout) &&
                        !isEmpty(this.state.selectedCurrency) && (
                          <>
                            <hr style={{ width: "100%", margin: "10px 0px" }} />

                            <Row className="rate-stat">
                              <Col>Min Amount</Col>
                              <Col>Max Amount</Col>
                              <Col>Flat Fee</Col>
                              <Col>Percentage Fee</Col>
                            </Row>
                            <Row>
                              <Col>
                                <hr
                                  style={{
                                    width: "100%",
                                    margin: "10px 0 15px 0",
                                  }}
                                />
                              </Col>
                            </Row>
                            {this.state.feeSet.map((item, index) => {
                              return (
                                <Row className="amount-field-wrap" key={index}>
                                  <Col className="amount-field">
                                    <InputField
                                      type="number"
                                      customWidth="100%"
                                      onChangeValue={(value) =>
                                        this.handleFeeSet(value, index)
                                      }
                                      customName="minAmount"
                                      customValue={item.minAmount}
                                      placeHolder={"0"}
                                      style={
                                        index === this.state.errorIndex &&
                                        "minAmount" === this.state.errorKey
                                          ? {
                                              border: "1px solid red",
                                            }
                                          : {}
                                      }
                                    />
                                  </Col>
                                  <Col className="amount-field">
                                    <InputField
                                      type="number"
                                      customWidth="100%"
                                      onChangeValue={(value) =>
                                        this.handleFeeSet(value, index)
                                      }
                                      customName="maxAmount"
                                      customValue={item.maxAmount}
                                      placeHolder={"0"}
                                      style={
                                        index === this.state.errorIndex &&
                                        "maxAmount" === this.state.errorKey
                                          ? {
                                              border: "1px solid red",
                                            }
                                          : {}
                                      }
                                    />
                                  </Col>
                                  <Col className="amount-field">
                                    <InputField
                                      type="number"
                                      customWidth="100%"
                                      onChangeValue={(value) =>
                                        this.handleFeeSet(value, index)
                                      }
                                      customName="flatFee"
                                      customValue={item.flatFee}
                                      placeHolder={"0"}
                                      style={
                                        index === this.state.errorIndex &&
                                        "flatFee" === this.state.errorKey
                                          ? {
                                              border: "1px solid red",
                                            }
                                          : {}
                                      }
                                    />
                                  </Col>
                                  <Col className="amount-field">
                                    <InputField
                                      type="number"
                                      customWidth={
                                        this.state.feeSet.length > 1
                                          ? "75%"
                                          : "100%"
                                      }
                                      onChangeValue={(value) =>
                                        this.handleFeeSet(value, index)
                                      }
                                      customName="percentageFee"
                                      customValue={item.percentageFee}
                                      placeHolder={"0"}
                                      style={
                                        index === this.state.errorIndex &&
                                        "percentageFee" === this.state.errorKey
                                          ? {
                                              border: "1px solid red",
                                            }
                                          : {}
                                      }
                                    />
                                    {this.state.feeSet.length > 1 && (
                                      <span className="ml-2">
                                        <button
                                          style={{
                                            backgroundColor: "transparent",
                                            border: "none",
                                          }}
                                          onClick={() => {
                                            this.deleteRow(index);
                                          }}
                                        >
                                          <img
                                            src={deleteImg}
                                            alt="deleteImg"
                                            height="20px"
                                            width="20px"
                                          />
                                        </button>
                                      </span>
                                    )}
                                  </Col>
                                </Row>
                              );
                            })}
                            <Row className="mt-4 mb-4">
                              <Col>
                                <Button
                                  variant="light"
                                  style={{
                                    border: `1px solid ${COLORS.GREY_COLOR}`,
                                  }}
                                  className="mr-3"
                                  onClick={() => this.addRow()}
                                >
                                  <img alt="icon" src={plusRound} />
                                </Button>
                                <ButtonSpinner
                                  block={false}
                                  isSubmitting={this.state.isSubmitting}
                                  title={" Save Fee Structure"}
                                  onClick={() => this.addFeeStructure()}
                                />
                                {this.state.edited && (
                                  <Button
                                    variant="danger"
                                    style={{
                                      border: `1px solid ${COLORS.WHITE_COLOR}`,
                                    }}
                                    className="ml-3"
                                    onClick={() => {
                                      this.props.getActiveAccountSideBar("FeeSet");                                      
                                      this.props.history.push(`${ROUTES.FEE_SET}`);
                                    }}
                                  >
                                    Cancel{" "}
                                  </Button>
                                )}
                              </Col>
                            </Row>
                          </>
                        )}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          </Col>{" "}
        </Row>
      </>
    );
  }
}
AddFeeSet.propTypes = {
  countries: PropTypes.array,
  location: PropTypes.object,
  handleChange: PropTypes.func,
  getFeeStructure: PropTypes.func,
  getActiveAccountSideBar: PropTypes.func,
  history: PropTypes.object,
};
const mapStateToProps = (state) => ({
  countries: state.miscellaneous.dest_country,
});
  
const mapDispatchToProps = { getFeeStructure, getActiveAccountSideBar };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddFeeSet));

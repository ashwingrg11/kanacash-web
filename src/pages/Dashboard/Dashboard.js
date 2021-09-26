import React, { Component } from "react";
import {
  Row,
  Col,
  Container,
  Button,
  Spinner,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import COLORS from "../../assets/Color/Color";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getCurrentUser } from "../../store/actions/UserDetailsActions";
import CustomSpinner from "../../components/CustomSpinner";
import Disclaimer from "../../components/Disclaimer/Disclaimer";
import {
  getAllTransaction,
  clearTransactionData,
  getTransactionAmount,
  getReciverPaymentMethod,
  getSenderPaymentMethod,
  getReceiverInfo,
} from "../../store/actions/TrasactionAction";
import CustomAlert from "../../components/Alert/CustomAlert";
import ROUTES from "../../assets/Routes/Routes";
import {
  getActiveAccountSideBar,
  getBeneficiaries,
} from "../../store/actions/senderDetail";
import PropTypes from "prop-types";

import * as api from "../../services/axios/transactionApi";
import Header from "../../containers/layout/Header";
import Footer from "../../containers/layout/Footer";
import ClientDashboardTable from "../../components/Table/ClientDashboardTable";
import ReciptIcon from "../../assets/images/icons/reciptIcon.svg";
import CancelIcon from "../../assets/images/icons/cancelIcon.svg";
import ReturnIcon from "../../assets/images/icons/returnIcon.svg";
import ReceiptInvoiceModal from "../../containers/user/ReceiptInvoiceModal";
import UserProfileOnDashboard from "../../containers/user/UserProfileOnDashboard";
import UserTransactionBenificiary from "../../containers/user/UserTransactionBenificiary";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      receiptLoadingId: "",
      cancelLoadingId: "",
      receiptLoading: false,
      cancelLoading: false,
      resendLoadingId: "",
      resendLoading: false,
      dataTable: [],
      tableHeader: [],
      key: [
        "date",
        "transferNumber",
        "beneficiary",
        "amount",
        "transactionStatus",
        "serviceRequested",
        "action",
      ],
      message: "",
      variant: "success",
      showAlert: false,
      receiptDetail: {},
      showReceipt: false,
      transactionRange: {
        initial: 0,
        end: 20,
        next: 0,
      },
      filterTransaction: [],
    };
  }

  verified = (value) => {
    if (value.status === "VERIFIED") {
      this.setState({
        showAlert: true,
        message: value.message,
        variant: "success",
      });
    } else if (value.status === "FAILED") {
      this.setState({
        showAlert: true,
        message: value.message,
        variant: "danger",
      });
    }
  };

  calculateTranserFee = (sendCurrency) => {
    let transferFee = [];
    let minFees = [];
    this.props.transferFee.map((result) => {
      const feeRanges = result.feeRanges.find(
        (element) =>
          sendCurrency >= element.minAmount && sendCurrency <= element.maxAmount
      );
      if (feeRanges !== undefined) {
        transferFee.push({
          senderPayment: result.paymentMethod,
          receiverPayout: result.payoutMethod,
          currency: result.currency,
          feeRange: (
            feeRanges.flatFee +
            (sendCurrency * feeRanges.percentageFee) / 100
          ).toFixed(2),
        });
        minFees.push(
          (
            feeRanges.flatFee +
            (sendCurrency * feeRanges.percentageFee) / 100
          ).toFixed(2)
        );
      }
      return true;
    });
    let calculatedValue = {
      minFee: Math.min(...minFees),
      trasferFee: transferFee,
    };
    return calculatedValue;
    // this.setState({ minFee: Math.min(...minFees) });
    // this.setState({ transferFee });
  };
  showReceipt = (transactionId) => {
    this.setState({ receiptLoadingId: transactionId, receiptLoading: true });

    api
      .getReceiptOfTransaction(transactionId)
      .then((res) => {
        this.setState({
          receiptDetail: res.data,
          showReceipt: true,
          receiptLoadingId: "",
          receiptLoading: false,
        });
      })
      .catch((err) => {
        // console.log("receipt error", err);
      });
  };

  cancelTransaction = (transactionId) => {
    this.setState({ cancelLoadingId: transactionId, cancelLoading: true });

    api
      .cancelTransaction(transactionId)
      .then((res) => {
        if (res.status === 400) {
          this.setState({
            cancelLoadingId: "",
            cancelLoading: false,
            showAlert: true,
            message: res.data.message,
            variant: "danger",
          });
        } else {
          this.props.getAllTransaction(this.state.transactionRange);

          this.setState({
            cancelLoadingId: "",
            cancelLoading: false,
            showAlert: true,
            message: "Transaction has been canceled successfully.",
            variant: "success",
          });
        }
      })
      .catch((err) => {
        console.log("error cancel transaction");
      });
  };

  resendTransaction = (referenceId) => {
    this.setState({ resendLoadingId: referenceId, resendLoading: true });
    api
      .getSingleTransaction(referenceId)
      .then((resendTransactionDetail) => {
        let calculatedValue = this.calculateTranserFee(
          resendTransactionDetail.data.senderAmount
        );

        if (resendTransactionDetail.data.fundingSource === "BANK") {
          let isBankAvailable = this.props.senderBankList.find((bank) => {
            return (
              bank.id === resendTransactionDetail.data.senderFundingAccountId
            );
          });
          if (!!isBankAvailable) {
            let senderPaymentDetail = {
              payoutDetail: {
                id: resendTransactionDetail.data.senderFundingAccountId,
              },
              payoutMethod: resendTransactionDetail.data.fundingSource,
            };

            this.props.getSenderPaymentMethod(senderPaymentDetail);
            localStorage.setItem(
              "senderPaymentDetail",
              JSON.stringify(senderPaymentDetail)
            );
          }
        } else {
          let isCardAvailable = this.props.senderCards.find((card) => {
            return (
              card.id === resendTransactionDetail.data.senderFundingAccountId
            );
          });
          if (!!isCardAvailable) {
            let senderPaymentDetail = {
              payoutDetail: {
                id: resendTransactionDetail.data.senderFundingAccountId,
              },
              payoutMethod: resendTransactionDetail.data.fundingSource,
            };

            this.props.getSenderPaymentMethod(senderPaymentDetail);
            localStorage.setItem(
              "senderPaymentDetail",
              JSON.stringify(senderPaymentDetail)
            );
          }
        }

        let receiverInfo = {
          province: resendTransactionDetail.data.beneficiary.province,
          bank_id: resendTransactionDetail.data.beneficiary.bank.bank_id,
          first_name: resendTransactionDetail.data.beneficiary.first_name,
          last_name: resendTransactionDetail.data.beneficiary.last_name,
          country: resendTransactionDetail.data.beneficiary.country,
          city: resendTransactionDetail.data.beneficiary.city,
          beneficiaryId: resendTransactionDetail.data.beneficiary.beneficiaryId,
        };
        this.props.getReceiverInfo(receiverInfo);

        localStorage.setItem("beneficiaryInfo", JSON.stringify(receiverInfo));
        let receiverPaymentDetail;
        if (resendTransactionDetail.data.payoutMethod === "BANK_DEPOSIT") {
          receiverPaymentDetail = {
            payoutDetail: {
              bank_id: resendTransactionDetail.data.beneficiary.bank.bank_id,
            },
            payoutMethod: resendTransactionDetail.data.payoutMethod,
          };
        } else {
          receiverPaymentDetail = {
            payoutDetail: resendTransactionDetail.data.beneficiary.payer,
            payoutMethod: resendTransactionDetail.data.payoutMethod,
          };
        }

        this.props.getReciverPaymentMethod(receiverPaymentDetail);
        localStorage.setItem(
          "beneficiaryDetail",
          JSON.stringify(receiverPaymentDetail)
        );

        let transactionDetail;

        if (resendTransactionDetail.data.recipientCurrency === "SLL") {
          localStorage.setItem(
            "selectedCountry",
            JSON.stringify(this.props.destinationCountry[2])
          );
          transactionDetail = {
            recipientCurrency: resendTransactionDetail.data.recipientCurrency,
            recipientAmount: resendTransactionDetail.data.recipientAmount,
            minFee: calculatedValue.minFee,
            feeAmount: calculatedValue.trasferFee,
            exchangeRate: resendTransactionDetail.data.exchangeRate,
            senderAmount: resendTransactionDetail.data.senderAmount,
            selectedCountry: this.props.destinationCountry[2],
            destinationCountry: "SLA",
          };
        } else {
          localStorage.setItem(
            "selectedCountry",
            JSON.stringify(this.props.destinationCountry[1])
          );

          transactionDetail = {
            recipientCurrency: resendTransactionDetail.data.recipientCurrency,
            recipientAmount: resendTransactionDetail.data.recipientAmount,
            minFee: calculatedValue.minFee,
            feeAmount: calculatedValue.trasferFee,
            exchangeRate: resendTransactionDetail.data.exchangeRate,
            senderAmount: resendTransactionDetail.data.senderAmount,
            selectedCountry: this.props.destinationCountry[1],
            destinationCountry: "NGA",
          };
        }

        this.props.getTransactionAmount(transactionDetail);
        localStorage.setItem(
          "transactionDetail",
          JSON.stringify(transactionDetail)
        );
        this.setState({ resendLoadingId: "", resendLoading: false });

        this.props.history.push(`${ROUTES.BENEFICIARY_DETAIL}`);
      })
      .catch((err) => {
        // console.log("err", err);
      });
  };

  componentDidMount = () => {
    localStorage.removeItem("signUpFromTransaction");
    this._mount = true;
    if (this._mount) {
      this.props.getAllTransaction(this.state.transactionRange);
      this.props.getCurrentUser();
      this.props.clearTransactionData();
      this.props.getBeneficiaries();
      localStorage.setItem("activeSideBar", "Profile");
      this.props.getActiveAccountSideBar("Profile");

      this.setState({
        tableHeader: [
          "DATE",
          "RECEIPT NUMBER",
          "BENEFICIARY",
          "Amount",
          "TRANSACTION STATUS",
          "SERVICE REQUESTED",
          "Actions",
        ],
      });
    }
  };

  componentWillUnmount = () => {
    this._mount = false;
  };
  componentDidUpdate = (prevProps) => {
    if (prevProps.transactionList !== this.props.transactionList) {
      this.getFilterTransaction();
    }
  };

  getFilterTransaction = () => {
    this.setState({
      filterTransaction: this.props.transactionList.slice(
        this.state.transactionRange.initial,
        this.state.transactionRange.end
      ),
    });
  };

  renderDataTabe = () => {
    const renderTooltip = (props) => (
      <Tooltip id="button-tooltip" {...props}>
        {props.label}
      </Tooltip>
    );
    let dataTableData = [];
    this.state.filterTransaction.forEach((result) => {
      dataTableData.push({
        date: result.createdAt
          ? new Date(parseInt(result.createdAt)).toLocaleDateString()
          : "",
        transferNumber: result.referenceNumber ? (
          result.referenceNumber
        ) : (
          <div>Pending</div>
        ),
        // beneficiary: `${result.beneficiary.first_name} ${result.beneficiary?.last_name}`,
        beneficiary:
          result.beneficiary.length !== 0 &&
          `${result.beneficiary.first_name} ${result.beneficiary?.last_name}`,
        amount: result.senderAmount,
        transactionStatus:
          result.status === "INITIATED" ? (
            <div style={{ color: `${COLORS.DARK_GREEN}` }}>{result.status}</div>
          ) : result.status === "PENDING" ? (
            <div style={{ color: `${COLORS.DARK_YELLOW}` }}>
              {result.status}
            </div>
          ) : result.status === "CANCELED" ? (
            <div style={{ color: `${COLORS.RED_COLOR}` }}>{result.status}</div>
          ) : (
            <div style={{ color: `${COLORS.PRIMARY_COLOR}` }}>
              {result.status}
            </div>
          ),

        serviceRequested:
          result.payoutMethod === "BANK_DEPOSIT" ? "Bank Deposit" : "",
        action: (
          <>
            {result.transactionId === this.state.resendLoadingId &&
            this.state.resendLoading ? (
              <span style={{ paddingRight: "10px", paddingLeft: "5px" }}>
                <Spinner animation="border" size="sm" />
              </span>
            ) : (
              <OverlayTrigger
                placement="top"
                delay={{ show: 100, hide: 100 }}
                overlay={renderTooltip({ label: "Resend" })}
              >
                <span
                  onClick={() => {
                    this.resendTransaction(result.transactionId);
                    // alert(result.referenceId);
                  }}
                  style={{
                    cursor: "pointer",
                    paddingRight: "10px",
                    paddingLeft: "5px",
                  }}
                >
                  <img src={ReturnIcon} alt="ReturnIcon" />{" "}
                </span>
              </OverlayTrigger>
            )}
            {result.status !== "PENDING" && result.status !== "INITIATED" ? (
              result.transactionId === this.state.receiptLoadingId &&
              this.state.receiptLoadingId ? (
                <span style={{ paddingRight: "10px" }}>
                  <Spinner animation="border" size="sm" />
                </span>
              ) : (
                <OverlayTrigger
                  placement="right"
                  delay={{ show: 100, hide: 100 }}
                  overlay={renderTooltip({ label: "View Receipt" })}
                >
                  <span
                    onClick={() => {
                      this.showReceipt(result.transactionId);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {" "}
                    <img src={ReciptIcon} alt="ReciptIcon" />
                  </span>
                </OverlayTrigger>
              )
            ) : result.transactionId === this.state.cancelLoadingId &&
              this.state.cancelLoadingId ? (
              <span style={{ paddingRight: "10px" }}>
                <Spinner animation="border" size="sm" />
              </span>
            ) : (
              <OverlayTrigger
                placement="right"
                delay={{ show: 100, hide: 100 }}
                overlay={renderTooltip({ label: "Cancel" })}
              >
                <span
                  onClick={() => {
                    this.cancelTransaction(result.transactionId);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {" "}
                  <img
                    style={{ width: "18px" }}
                    src={CancelIcon}
                    alt="CancelIcon"
                  />
                </span>
              </OverlayTrigger>
            )}
          </>
        ),
      });
    });
    return dataTableData;
  };

  render() {
    return (
      <>
        <Header />
        <div className="shadow-line"></div>
        <section className="admin-wrapper">
          <Container>
            <Row className="mt-md-2">
              <Col>
                <Row>
                  <Col sm="12" md="5" lg="4">
                    <UserProfileOnDashboard
                      verified={(value) => this.verified(value)}
                    />
                  </Col>
                  <Col
                    sm="12"
                    md="7"
                    lg="8"
                    className="md-3 mt-3 md-md-0 mt-md-0"
                  >
                    <UserTransactionBenificiary />
                  </Col>
                </Row>
                <Row className="mt-md-4 mt-2">
                  <Col>
                    <h2 className="activity-title">My Recent Transactions</h2>
                    {this.props.loader ? (
                      <div style={{ height: "50vh" }}>
                        {" "}
                        <CustomSpinner />
                      </div>
                    ) : this.props.transactionList.length !== 0 ? (
                      <>
                        <div className="table-responsive">
                          <ClientDashboardTable
                            dataTableData={this.renderDataTabe()}
                            tableHeader={this.state.tableHeader}
                            keys={this.state.key}
                          />
                        </div>
                        {this.props.transactionList.length > 19 ? (
                          this.state.transactionRange.next * 20 +
                            this.state.filterTransaction.length ===
                          this.props.transactionList.length ? (
                            <div
                              className="btn-link d-flex justify-content-end mt-3"
                              style={{
                                cursor: "pointer",
                                fontWeight: "bold",
                                color: `${COLORS.PRIMARY_COLOR}`,
                              }}
                              onClick={() => {
                                this.setState(
                                  {
                                    transactionRange: {
                                      initial:
                                        this.state.transactionRange.initial -
                                        20,
                                      end: this.state.transactionRange.end - 20,
                                      next:
                                        this.state.transactionRange.next - 1,
                                    },
                                  },
                                  () => {
                                    this.getFilterTransaction();
                                  }
                                );
                              }}
                            >
                              {" "}
                              Previous
                            </div>
                          ) : this.state.transactionRange.next !== 0 ? (
                            <Col className="d-flex justify-content-end mt-3">
                              <div
                                className="btn-link mr-4"
                                style={{
                                  cursor: "pointer",
                                  fontWeight: "bold",
                                  color: `${COLORS.PRIMARY_COLOR}`,
                                }}
                                onClick={() => {
                                  this.setState(
                                    {
                                      transactionRange: {
                                        initial:
                                          this.state.transactionRange.initial -
                                          20,
                                        end:
                                          this.state.transactionRange.end - 20,
                                        next:
                                          this.state.transactionRange.next - 1,
                                      },
                                    },
                                    () => {
                                      this.getFilterTransaction();
                                    }
                                  );
                                }}
                              >
                                {" "}
                                Previous{" "}
                              </div>
                              <div
                                className="btn-link "
                                style={{
                                  cursor: "pointer",
                                  fontWeight: "bold",
                                  color: `${COLORS.PRIMARY_COLOR}`,
                                }}
                                onClick={() => {
                                  this.setState(
                                    {
                                      transactionRange: {
                                        initial:
                                          this.state.transactionRange.initial +
                                          20,
                                        end:
                                          this.state.transactionRange.end + 20,
                                        next:
                                          this.state.transactionRange.next + 1,
                                      },
                                    },
                                    () => {
                                      this.getFilterTransaction();
                                    }
                                  );
                                }}
                              >
                                {" "}
                                Next{" "}
                              </div>
                            </Col>
                          ) : (
                            <div
                              className="btn-link d-flex justify-content-end mt-3"
                              style={{
                                cursor: "pointer",
                                fontWeight: "bold",
                                color: `${COLORS.PRIMARY_COLOR}`,
                              }}
                              onClick={() => {
                                this.setState(
                                  {
                                    transactionRange: {
                                      initial:
                                        this.state.transactionRange.initial +
                                        20,
                                      end: this.state.transactionRange.end + 20,
                                      next:
                                        this.state.transactionRange.next + 1,
                                    },
                                  },
                                  () => {
                                    this.getFilterTransaction();
                                  }
                                );
                              }}
                            >
                              {" "}
                              Show next 20 transactions
                            </div>
                          )
                        ) : (
                          ""
                        )}
                      </>
                    ) : (
                      <Col className=" my-3 no-transaction text-center">
                        <h3 className="sub-title">No transactions</h3>
                        <p>There are no records to be shown.</p>
                        <Row>
                          <Col
                            style={{ width: "100%" }}
                            className="d-flex justify-content-center"
                          >
                            <Button
                              className="btn btn-secondary btn-theme"
                              onClick={() =>
                                this.props.history.push(
                                  `${ROUTES.PAYMENT_DETAIL}`
                                )
                              }
                            >
                              Send Money
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                    )}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
        <Footer />
        {!localStorage.acceptPolicy && <Disclaimer />}

        <CustomAlert
          message={this.state.message}
          show={this.state.showAlert}
          variant={this.state.variant}
          close={() => this.setState({ showAlert: false })}
        />
        <ReceiptInvoiceModal
          receiptDetail={this.state.receiptDetail}
          show={this.state.showReceipt}
          close={() => this.setState({ showReceipt: false })}
        />
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  transactionList: state.transaction.transactionList,
  destinationCountry: state.miscellaneous.dest_country,
  transferFee: state.transaction.transferFee,
  loader: state.loader.presentLoader,
  senderBankList: state.senderDetail.senderBanks,
  senderCards: state.senderDetail.senderCards,
  acceptPolicy: state.auth.accept_policy,
});

const mapActionToProps = {
  getCurrentUser,
  getAllTransaction,
  clearTransactionData,
  getActiveAccountSideBar,
  getBeneficiaries,
  getTransactionAmount,
  getReciverPaymentMethod,
  getSenderPaymentMethod,
  getReceiverInfo,
};

Dashboard.propTypes = {
  transferFee: PropTypes.array,
  destinationCountry: PropTypes.array,
  transactionList: PropTypes.array,
  getCurrentUser: PropTypes.func,
  getSenderPaymentMethod: PropTypes.func,
  getReceiverInfo: PropTypes.func,
  getReciverPaymentMethod: PropTypes.func,
  getAllTransaction: PropTypes.func,
  beneficiary: PropTypes.array,
  getActiveAccountSideBar: PropTypes.func,
  history: PropTypes.object,
  clearTransactionData: PropTypes.func,
  getBeneficiaries: PropTypes.func,
  getTransactionAmount: PropTypes.func,
  loader: PropTypes.bool,
  senderBankList: PropTypes.array,
  senderCards: PropTypes.array,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withRouter(Dashboard));

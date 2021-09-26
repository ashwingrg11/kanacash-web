import React, { Component } from "react";
import {
  Row,
  Col,
  Card,
  Spinner,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import PropTypes from "prop-types";
import ClientDashboardTable from "../../components/Table/ClientDashboardTable";

import COLORS from "../../assets/Color/Color";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// import { isEmpty } from "../../utils/isEmpty";
import { getAllTransaction } from "../../store/actions/TrasactionAction";
// import * as api from "../../services/axios/";
class FeeSet extends Component {
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

  componentDidMount = () => {
    this._mount = true;
    if (this._mount) {
      this.props.getAllTransaction(this.state.transactionRange);

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

  delivery = () => {
    console.log("delivery");
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

        serviceRequested: result.payoutMethod,
        action:
          result.transactionId === this.state.resendLoadingId &&
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
                  this.delivery(result.transactionId);
                  // alert(result.referenceId);
                }}
                style={{
                  cursor: "pointer",
                  paddingRight: "10px",
                  paddingLeft: "5px",
                }}
              >
                Delivery
                {/* <img src={ReturnIcon} alt="ReturnIcon" />{" "} */}
              </span>
            </OverlayTrigger>
          ),
      });
    });
    return dataTableData;
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
            Transaction Detail
          </Col>
        </Row>

        <Row className="mt-4">
          <Col className="">
            <Card className="p-4">
              <Row>
                <Col
                  style={{
                    height: "50px",
                    backgroundColor: `${COLORS.LIGHT_BLUE}`,
                    border: ` 1px solid ${COLORS.BLUE_COLOR}`,
                  }}
                  className="d-flex align-items-center mr-2 ml-2"
                >
                  Transaction Detail{" "}
                </Col>
              </Row>
              <Row>
                <Col className="p-2">
                  <div className="table-responsive">
                    <ClientDashboardTable
                      dataTableData={this.renderDataTabe()}
                      tableHeader={this.state.tableHeader}
                      keys={this.state.key}
                    />
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}
FeeSet.propTypes = {
  getAllTransaction: PropTypes.func,
  transactionList: PropTypes.array,
};

// const mapStateToProps = (state) => ({
//   feeStructure: state.admin.feeStructure,
// });

const mapDispatchToProps = { getAllTransaction };
export default connect(null, mapDispatchToProps)(withRouter(FeeSet));

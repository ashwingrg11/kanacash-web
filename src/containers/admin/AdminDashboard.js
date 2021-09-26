import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row, Col, Card } from "react-bootstrap";
import COLORS from "../../assets/Color/Color";
import FeeSetIcon from "../../assets/images/FeeSetIcon.svg";
import UnlockSenderImg from "../../assets/images/admin/unlockSenderImg.svg";
import CustomTable from "../../components/Table/CustomTable";
import { getActiveAccountSideBar } from "../../store/actions/senderDetail";

// import * as api from "../../services/axios/adminApi";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { isEmpty } from "../../utils/isEmpty";
import ROUTES from "../../assets/Routes/Routes";
class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabelData: [],
      tableHeader: [
        "PAYMENT METHOD",
        "PAYOUT METHOD",
        "CURRENCY",
        "MIN AMOUNT",
        "MAX AMOUNT",
        "FLAT FEE",
        "% FEE",
        "Action",
      ],
    };
  }

  componentDidMount = () => {
    if (!isEmpty(this.props.feeStructure))
      this.setState({ tabelData: this.props.feeStructure });
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.feeStructure !== this.props.feeStructure) {
      this.setState({ tabelData: this.props.feeStructure });
    }
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
            Dashboard
          </Col>
        </Row>

        <Row className="mt-3">
          <Col lg="6 mb-3 mb-lg-0">
            <div
              className="blue-bg"
              onClick={() => {
                this.props.getActiveAccountSideBar("AddFeeSet");
                localStorage.setItem("activeSideBar", "AddFeeSet");

                this.props.history.push(`${ROUTES.ADD_FEE_SET}`);
              }}
            >
              <img src={FeeSetIcon} alt="FeeSetIcon" />
              <h3>Add Fee Set</h3>
            </div>
          </Col>
          <Col lg="6 mb-1 mb-lg-0">
            <div
              className="blue-bg"
              onClick={() => {
                this.props.getActiveAccountSideBar("UnlockSender");
                localStorage.setItem("activeSideBar", "UnlockSender");

                this.props.history.push(`${ROUTES.UNLOCK_SENDER}`);
              }}
            >
              <img src={UnlockSenderImg} alt="UnlockSenderImg" />
              <h3> Unlock Senders </h3>
            </div>
          </Col>{" "}
        </Row>
        <Row className="mt-4">
          <Col className="subhead-title">Fee Set</Col>
          <Col className="d-flex justify-content-end ">
            {" "}
            {/* <div className="btn-link">View all</div> */}
          </Col>
        </Row>
        <Col className="mt-2 p-0">
          <Card className="p-3">
            <div className="table-responsive">
              <CustomTable
                dataTableData={this.state.tabelData}
                tableHeader={this.state.tableHeader}
                keys={this.state.keys}
                feeRangesKey={this.state.feeRangesKey}
              ></CustomTable>
            </div>
          </Card>
        </Col>
      </>
    );
  }
}

AdminDashboard.propTypes = {
  feeStructure: PropTypes.array,
  history: PropTypes.object,
  getActiveAccountSideBar: PropTypes.func,
};

const mapStateToProps = (state) => ({
  feeStructure: state.admin.feeStructure,
});

const mapDispatchToProps = { getActiveAccountSideBar };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AdminDashboard));

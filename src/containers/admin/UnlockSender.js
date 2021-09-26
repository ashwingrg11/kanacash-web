import React, { Component } from "react";
import { Row, Col, Card, Spinner } from "react-bootstrap";
import COLORS from "../../assets/Color/Color";
import Redlock from "../../assets/images/admin/redLock.svg";
import ClientDashboardTable from "../../components/Table/ClientDashboardTable";
import { getLockedSenders } from "../../store/actions/adminAction";
import * as api from "../../services/axios/adminApi";
import { connect } from "react-redux";
import PropTypes from "prop-types";
class UnlockSender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loackedSenderList: [],
      tableHeader: ["Name", "Email", "Locked Reason", "Action"],
      keys: ["name", "email", "lockedReason", "action"],
      loading: false,
    };
  }
  unlockUser = (id) => {
    this.setState({ loading: true, unlockId: id });
    api
      .unlockLockedSenderById(id)
      .then((res) => {
        this.setState({ loading: false, unlockId: "" });
        this.props.getLockedSenders();
        this.props.handleChange({
          showAlert: true,
          message: "Sender has been unlocked successfully.",
          variant: "success",
        });
      })
      .catch((err) => {
        this.setState({ loading: false });
        this.props.handleChange({
          showAlert: true,
          message: "Failed to unlock the sender. Please try again.",
          variant: "success",
        });
      });
  };
  renderData = () => {
    let dataTableData = [];
    this.props.lockedSender.forEach((item) => {
      dataTableData.push({
        name: `${item?.firstName} ${item?.lastName}`,
        email: item?.email,
        lockedReason:
          item.failedLoginAttempts === 4
            ? "User locked due to max login attempts."
            : "Other reason",
        action: (
          <>
            {this.state.unlockId === item.userId && this.state.loading ? (
              <div>
                <Spinner animation="border" size="sm" />
              </div>
            ) : (
              <div
                onClick={() => this.unlockUser(item.userId)}
                style={{
                  color: `${COLORS.DARK_RED}`,
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                <img
                  src={Redlock}
                  alt="RedLock"
                  style={{ margin: "0px 4px 3px 0px" }}
                />
                Unlock
              </div>
            )}
          </>
        ),
      });
    });
    return dataTableData;
  };

  componentDidMount = () => {
    this.props.getLockedSenders();
  };
  componentDidUpdate = (prevProps) => {
    if (prevProps.lockedSender !== this.props.lockedSender) {
      this.setState({ loackedSenderList: this.props.lockedSender });
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
            Unlock Senders{" "}
          </Col>
        </Row>

        <Row className="mt-3">
          <Col>
            <Card className="p-2 p-md-3">
              <div className="table-responsive">
                {this.props.lockedSender.length !== 0 ? (
                  <ClientDashboardTable
                    dataTableData={this.renderData()}
                    tableHeader={this.state.tableHeader}
                    keys={this.state.keys}
                  />
                ) : (
                  <ClientDashboardTable
                    dataTableData={[]}
                    tableHeader={this.state.tableHeader}
                    keys={this.state.keys}
                  />
                )}
              </div>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}

const mapStateToprops = (state) => ({
  lockedSender: state.admin.lockedSender,
});

const mapDispatchToProps = { getLockedSenders };

UnlockSender.propTypes = {
  getLockedSenders: PropTypes.func,
  lockedSender: PropTypes.array,
  handleChange: PropTypes.func,
};

export default connect(mapStateToprops, mapDispatchToProps)(UnlockSender);

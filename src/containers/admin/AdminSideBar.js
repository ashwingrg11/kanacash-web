import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import COLORS from "../../assets/Color/Color";
import adminDashboardIcon from "../../assets/images/icons/adminDashboardIcon.svg";
import adminDashboardBlue from "../../assets/images/icons/adminDashboardBlue.svg";
import addFeeSetIcon from "../../assets/images/icons/addFeeSetIcon.svg";
import addFeeSetBlueIcon from "../../assets/images/icons/addFeeSetBlueIcon.svg";
import feeSet from "../../assets/images/icons/feeSet.svg";
import feeSetBlueIcon from "../../assets/images/icons/feeSetBlueIcon.svg";
import unlockSenderIcon from "../../assets/images/icons/UnlockSenderIcon.svg";
import unlockSenderBlueIcon from "../../assets/images/icons/unlockSenderBlueIcon.svg";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getActiveAccountSideBar } from "../../store/actions/senderDetail";
import ROUTES from "../../assets/Routes/Routes";
import { withRouter } from "react-router-dom";

class MyAccountSidebar extends Component {
  state = {
    list: [
      {
        img: adminDashboardIcon,
        activeImg: adminDashboardBlue,
        displayName: "Dashboard",
        name: "AdminDashboard",
        route: ROUTES.ADMIN_DASHBOARD,
      },
      {
        img: addFeeSetIcon,
        activeImg: addFeeSetBlueIcon,
        displayName: "Add Fee Set",
        name: "AddFeeSet",
        route: ROUTES.ADD_FEE_SET,
      },
      {
        img: feeSet,
        activeImg: feeSetBlueIcon,
        displayName: "Fee Set",
        name: "FeeSet",
        route: ROUTES.FEE_SET,
      },
      {
        img: unlockSenderIcon,
        activeImg: unlockSenderBlueIcon,
        name: "UnlockSender",
        displayName: "Unlock Sender",
        route: ROUTES.UNLOCK_SENDER,
      },
      // {
      //   img: unlockSenderIcon,
      //   activeImg: unlockSenderBlueIcon,
      //   name: "Transaction",
      //   displayName: "Transaction",
      //   route: ROUTES.TRANSACTION,
      // },
    ],
  };
  handleChange = (data) => {
    this.props.getActiveAccountSideBar(data.name);
    this.props.history.push(`${data.routes}`);
    localStorage.setItem("activeSideBar", data.name);
  };
  render() {
    return (
      <>
        <Row
          style={{ backgroundColor: `${COLORS.WHITE_COLOR}`, padding: "20px" }}
        >
          <Col>
            {this.state.list.map((result, index) => {
              return (
                <Row className="mt-2" style={{ height: "30px" }} key={index}>
                  {this.props.activeSideBar === result.name ? (
                    <Col
                      style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        color: `${COLORS.PRIMARY_COLOR}`,
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        this.handleChange({
                          name: `${result.name}`,
                          routes: `${result.route}`,
                        })
                      }
                      className="d-flex align-items-center"
                    >
                      {" "}
                      <img
                        src={result.activeImg}
                        alt="activeIMg"
                        style={{ marginRight: "10px", paddingBottom: "3px" }}
                      />
                      {result.displayName}
                    </Col>
                  ) : (
                    <Col
                      style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        color: `${COLORS.LICENCE_COLOR}`,
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        this.handleChange({
                          name: `${result.name}`,
                          routes: `${result.route}`,
                        })
                      }
                      className="d-flex align-items-center"
                    >
                      {" "}
                      <img
                        src={result.img}
                        alt="img"
                        style={{ marginRight: "10px", paddingBottom: "3px" }}
                      />
                      {result.displayName}
                    </Col>
                  )}
                </Row>
              );
            })}
          </Col>
        </Row>
      </>
    );
  }
}

const mapActionToProps = { getActiveAccountSideBar };
const mapStateToProps = (state) => ({
  activeSideBar: state.senderDetail.activeSideBar,
});

MyAccountSidebar.propTypes = {
  getActiveAccountSideBar: PropTypes.func,
  history: PropTypes.object,
  activeSideBar: PropTypes.string,
};
export default connect(
  mapStateToProps,
  mapActionToProps
)(withRouter(MyAccountSidebar));

import React, { Component } from "react";
import {
  Container,
  Nav,
  Navbar,
  Button,
  NavDropdown,
  Spinner,
} from "react-bootstrap";
import logo from "../../assets/images/logo.svg";
import "./index.css";
import LoginModal from "../../pages/Login/Login";
import { withRouter } from "react-router-dom";
import ROUTES from "../../assets/Routes/Routes";
import { connect } from "react-redux";
import { clearToken } from "../../store/actions/Auth";
import { getCurrentUser } from "../../store/actions/UserDetailsActions";
import { clearTransactionData } from "../../store/actions/TrasactionAction";
import { getActiveAccountSideBar } from "../../store/actions/senderDetail";
import { clearSenderLimit } from "../../store/actions/senderDetail";
import PropTypes from "prop-types";
import { isEmpty } from "../../utils/isEmpty";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLogin: false,
      logedIn: false,
      isOpen: false,
    };
  }
  componentWillUnmount = () => {
    this.setState({
      showLogin: false,
      logedIn: false,
      isOpen: false,
    });
  };

  OpenLogin = () => {
    this.setState({ showLogin: true });
  };
  closeMessage = () => {
    this.setState({ showLogin: false });
  };

  componentDidMount = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      this.setState({ logedIn: true });
      // this.props.getCurrentUser();
    }
  };

  logout = () => {
    this.props.clearSenderLimit();
    this.props.clearToken();
    this.props.clearTransactionData();
    if (localStorage.acceptPolicy) {
      localStorage.clear();
      localStorage.setItem("acceptPolicy", "true");
    } else {
      localStorage.clear();
    }

    this.props.history.push(`${ROUTES.WELCOME}`);
  };

  sendMoney = () => {
    this.props.history.push(`${ROUTES.PAYMENT_DETAIL}`);
    this.props.clearTransactionData();

    localStorage.removeItem("activeSideBar");
    localStorage.removeItem("transactionDetail");
    localStorage.removeItem("beneficiaryInfo");
    localStorage.removeItem("beneficiaryDetail");
    localStorage.removeItem("senderPaymentDetail");
  };

  render() {
    return (
      <React.Fragment>
        <header className="header-main">
          <Container>
            <Navbar expand="lg" bg="light">
              <div
                className="navbar-brand"
                onClick={() => {
                  this.props.clearTransactionData();
                  if (localStorage.role === "ADMIN") {
                    localStorage.setItem("activeSideBar", "AdminDashboard");
                    this.props.getActiveAccountSideBar("AdminDashboard");
                  }
                  this.props.history.push(`${ROUTES.WELCOME}`);
                }}
                style={{ cursor: "pointer" }}
              >
                <img src={logo} alt="logo" className="logo" />
              </div>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-md-auto">
                  {this.props.loginStatus ? (
                    isEmpty(this.props.user) ? (
                      <>
                        <div className="nav-menu">
                          <div className="d-lg-flex theme-dropdown">
                            <span
                              style={{ width: "118px" }}
                              className="order-lg-2 d-flex  align-items-center"
                            >
                              <Spinner animation="border" size="sm" />
                            </span>{" "}
                            {/* <Button
                              className="btn btn-primary btn-theme btn-primary-theme order-lg-1"
                              onClick={() => {
                                this.sendMoney();
                              }}
                            >
                              Send Money
                            </Button> */}
                          </div>
                        </div>{" "}
                      </>
                    ) : (
                      <>
                        <div className="nav-menu">
                          <div className="d-lg-flex theme-dropdown">
                            {localStorage.role === "USER" ? (
                              <NavDropdown
                                className="order-lg-2"
                                title={`${this.props.user?.first_name} ${this.props.user?.last_name}`}
                                id="basic-nav-dropdown"
                                alignRight
                              >
                                <NavDropdown.Item
                                  onClick={() => {
                                    this.props.history.push(
                                      `${ROUTES.DASHBOARD}`
                                    );
                                  }}
                                >
                                  Dashboard
                                </NavDropdown.Item>
                                <NavDropdown.Item
                                  onClick={() => {
                                    localStorage.setItem(
                                      "activeSideBar",
                                      "Profile"
                                    );
                                    this.props.getActiveAccountSideBar(
                                      "Profile"
                                    );
                                    this.props.history.push(
                                      `${ROUTES.ACCOUNT_DETAIL}`
                                    );
                                  }}
                                >
                                  My Account
                                </NavDropdown.Item>
                                <NavDropdown.Item
                                  onClick={() => {
                                    localStorage.setItem(
                                      "activeSideBar",
                                      "TransactionLimit"
                                    );
                                    this.props.getActiveAccountSideBar(
                                      "TransactionLimit"
                                    );
                                    this.props.history.push(
                                      `${ROUTES.TRANSACTION_LIMIT}`
                                    );
                                  }}
                                >
                                  Upgrade Limit{" "}
                                </NavDropdown.Item>
                                <NavDropdown.Item
                                  onClick={() => {
                                    this.logout();
                                  }}
                                >
                                  Logout
                                </NavDropdown.Item>
                              </NavDropdown>
                            ) : (
                              <NavDropdown
                                className="order-lg-2"
                                title={`Super Admin`}
                                id="basic-nav-dropdown"
                                alignRight
                              >
                                <NavDropdown.Item
                                  onClick={() => {
                                    this.logout();
                                  }}
                                >
                                  Logout
                                </NavDropdown.Item>
                              </NavDropdown>
                            )}
                            {localStorage.role === "USER" && (
                              <Button
                                className="btn btn-primary btn-theme btn-primary-theme order-lg-1"
                                onClick={() => {
                                  this.sendMoney();
                                }}
                              >
                                Send Money
                              </Button>
                            )}
                          </div>
                        </div>
                      </>
                    )
                  ) : (
                    <>
                      <span
                        onClick={() => {
                          this.setState({ showLogin: true });
                        }}
                        className="btn btn-primary btn-theme btn-primary-border"
                      >
                        Sign in
                      </span>
                      <button
                        className="btn btn-primary btn-theme btn-primary-theme"
                        onClick={() =>
                          this.props.history.push(`${ROUTES.SIGNUP}`)
                        }
                      >
                        Sign up
                      </button>
                    </>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Container>
        </header>
        <LoginModal show={this.state.showLogin} close={this.closeMessage} />
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  loginStatus: state.auth.isAuthenticated,
  user: state.auth.user,
});

const mapDispatchToProps = {
  clearToken,
  getCurrentUser,
  clearTransactionData,
  clearSenderLimit,
  getActiveAccountSideBar,
};

Header.propTypes = {
  getCurrentUser: PropTypes.func,
  clearToken: PropTypes.func,
  clearTransactionData: PropTypes.func,
  clearSenderLimit: PropTypes.func,
  history: PropTypes.object,
  user: PropTypes.object,
  loginStatus: PropTypes.bool,
  getActiveAccountSideBar: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));

import React, { Component } from "react";
import COLORS from "../assets/Color/Color";
import Profile from "../assets/images/icons/profile.svg";
import ProfileBlue from "../assets/images/icons/profileBlue.svg";
import Beneficiary from "../assets/images/icons/beneficiary.svg";
import BeneficiaryBlue from "../assets/images/icons/beneficiaryBlue.svg";
import Bank from "../assets/images/icons/BankSmall.svg";
import BankBlue from "../assets/images/icons/bankBlue.svg";
import Debit from "../assets/images/icons/Debit.svg";
import DebitBlue from "../assets/images/icons/debitBlue.svg";
import Transaction from "../assets/images/icons/transaction.svg";
import TransactionBlue from "../assets/images/icons/transactionBlue.svg";
import TransactionLimit from "../assets/images/icons/transactionLimit.svg";
import TransactionLimitBlue from "../assets/images/icons/transactionLimitBlue.svg";
import Setting from "../assets/images/icons/setting.svg";
import SettingBlue from "../assets/images/icons/settingBlue.svg";
import { connect } from "react-redux";
import {
  getActiveAccountSideBar
} from "../store/actions/senderDetail";
import ROUTES from "../assets/Routes/Routes";
import { withRouter } from "react-router-dom";
import PropTypes from 'prop-types'

class MyAccountSidebar extends Component {
  constructor(props){
    super(props);
    this.state = {
      list: [
        {
          img: Profile,
          activeImg: ProfileBlue,
          displayName: "Profile",
          name: "Profile",
          route: ROUTES.ACCOUNT_DETAIL,
        },
        {
          img: Beneficiary,
          activeImg: BeneficiaryBlue,
          displayName: "Beneficiary",
          name: "Beneficiary",
          route: ROUTES.BENEFICIARY_LIST,
        },
        {
          img: Bank,
          activeImg: BankBlue,
          displayName: "Bank Accounts",
          name: "Bank",
          route: ROUTES.BANK_LIST,
        },
        {
          img: Debit,
          activeImg: DebitBlue,
          name: "Debit",
          displayName: "Debit Cards",
          route: ROUTES.DEBIT_LIST,
        },
        {
          img: Transaction,
          activeImg: TransactionBlue,
          displayName: "Transactions",
          name: "Transaction",
          route: ROUTES.DASHBOARD,
        },
        {
          img: TransactionLimit,
          activeImg: TransactionLimitBlue,
          displayName: "Transaction Limit",
          name: "TransactionLimit",
          route: ROUTES.TRANSACTION_LIMIT,
        },
        {
          img: Setting,
          activeImg: SettingBlue,
          displayName: "Settings",
          name: "Setting",
          route: ROUTES.SETTING_PAGE,
        },
      ],
    };
  }
 
  handleChange(data){
    if (data.name === "Transaction") {
      this.props.getActiveAccountSideBar("Profile");
      this.props.history.push(`${ROUTES.DASHBOARD}`);
    } else {
      this.props.getActiveAccountSideBar(data.name);
      this.props.history.push(`${data.routes}`);
      localStorage.setItem("activeSideBar", data.name);
    }
  };
  render() {
    return (
      <>
        <ul className="sidebar-menu">
          {this.state.list.map((result, index) => {
            return (
              <li key={index}>
                {this.props.activeSideBar === result.name ? (
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: `${COLORS.PRIMARY_COLOR}`,
                      cursor: "pointer",
                      marginBottom:"10px"
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
                      alt="activeImg"
                      style={{ marginRight: "10px", paddingBottom: "3px" }}
                    />
                    {result.displayName}
                  </div>
                ) : (
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: `${COLORS.LICENCE_COLOR}`,
                      cursor: "pointer",
                      marginBottom:"10px"

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
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </>
    );
  }
}

const mapActionToProps = { getActiveAccountSideBar };
const mapStateToProps = (state) => ({
  activeSideBar: state.senderDetail.activeSideBar,
  activePage: state.senderDetail.activePage,
});

MyAccountSidebar.propTypes ={
  getActiveAccountSideBar:PropTypes.func,
  history:PropTypes.object,
  activeSideBar:PropTypes.string
}

export default connect(
  mapStateToProps,
  mapActionToProps
)(withRouter(MyAccountSidebar));

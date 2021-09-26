import React from "react";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import PropTypes from "prop-types";

import SignUp from "./pages/SignUp/SignUp";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import CountryChooser from "./pages/CountryChooser/CountryChooser";
import PhoneVerfication from "./pages/PhoneVerification/PhoneVefication";
import PhoneVerified from "./pages/PhoneVerification/PhoneVerified";
import ROUTES from "./assets/Routes/Routes";
import EmailVerification from "./pages/PhoneVerification/EmailVerfication";
import EmailVerified from "./pages/PhoneVerification/EmailVerified";

import PaymentDetail from "./pages/SendMoney/PaymentDetail";
import SenderDetails from "./pages/SendMoney/SenderDetails";
import BeneficiaryDetail from "./pages/SendMoney/BeneficiaryDetails";

import BeneficiaryList from "./pages/AccountDetail/Beneficiary/BeneficiaryList";
import BeneficiaryCreate from "./pages/AccountDetail/Beneficiary/BeneficiaryPayout";
import AddBeneficiary from "./pages/AccountDetail/Beneficiary/AddBeneficiary";
import Dashboard from "./pages/Dashboard/Dashboard";
import TransactionLimit from "./pages/AccountDetail/TransactionLimit";
import Setting from "./pages/AccountDetail/Setting";
import PaymentInfomation from "./pages/SendMoney/PaymentInfomation";
import ReviewDetail from "./pages/SendMoney/ReviewDetail";
import CongratulationPage from "./pages/SendMoney/CongratulationPage";
import AccountDetail from "./pages/AccountDetail/AccountDetail";
import DebitCard from "./pages/AccountDetail/DebitCard";
import BankList from "./pages/AccountDetail/BankLIst";
import SenderDetailsKYC from "./pages/SendMoney/SenderDetailsKYC";
import AddBankForm from "./pages/AccountDetail/Beneficiary/AddBankForm";
import BeneficiaryPayoutMehodList from "./pages/SendMoney/BeneficiaryPayoutMehodList";
import BeneficiaryCreateFromTransaction from "./pages/SendMoney/BeneficiaryCreate";
import AddBankFromTransaction from "./pages/SendMoney/AddBankFromTransaction";
import AddCashPickPointForNewBeneficiary from "./pages/SendMoney/AddCashPickPointForNewBeneficiary";
import AddPayoutMethodFromTransaction from "./pages/SendMoney/AddPayoutMethodFromTransaction";
import AdminDashboard from "./pages/admin/AdminDashboard";
import FeeSet from "./pages/admin/FeeSet";
import UnlockSender from "./pages/admin/UnlockSender";
import AddFeeSet from "./pages/admin/AddFeeSet";
import AboutUs from "./pages/AboutUsAndContactPage/AboutUs";
import ContactPage from "./pages/AboutUsAndContactPage/ContactPage";
import CopyRight from "./pages/AboutUsAndContactPage/CopyRight";
import PrivacyPolicy from "./pages/AboutUsAndContactPage/PrivacyPolicy";
import TermsAndServices from "./pages/AboutUsAndContactPage/TermsAndServices";

import Page404 from "./pages/Page404/Page404";
// import TransactionDeliveryPage from "./pages/admin/TransactionDeliveryPage";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLogin = localStorage.getItem("accessToken");
  const role = localStorage.getItem("role");

  return (
    <Route
      {...rest}
      component={(props) =>
        isLogin && role === "USER" ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
            }}
          />
        )
      }
    />
  );
};

const AdminRoute = ({ component: Component, ...rest }) => {
  const role = localStorage.getItem("role");
  const isLogin = localStorage.getItem("accessToken");
  return (
    <Route
      {...rest}
      component={(props) =>
        isLogin && role !== "USER" ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
            }}
          />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};

AdminRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};

const Routes = (props) => {
  const role = localStorage.getItem("role");
  const isLogin = localStorage.getItem("accessToken");
  return (
    <BrowserRouter>
      {isLogin && role !== "USER" ? (
        <Switch>
          {/* Admin panel routes*/}
          <Route exact path={ROUTES.WELCOME} component={AdminDashboard} />
          <Route exact path={ROUTES.WELCOME} component={CountryChooser} />
          <Route exact path={ROUTES.CONTACT_US} component={ContactPage} />
          <Route exact path={ROUTES.ABOUT_US} component={AboutUs} />
          <AdminRoute
            exact
            path={ROUTES.ADMIN_DASHBOARD}
            component={AdminDashboard}
          />
          <AdminRoute exact path={ROUTES.ADD_FEE_SET} component={AddFeeSet} />
          <AdminRoute exact path={ROUTES.FEE_SET} component={FeeSet} />
          <AdminRoute
            exact
            path={ROUTES.UNLOCK_SENDER}
            component={UnlockSender}
          />{" "}
          {/* <AdminRoute
            exact
            path={ROUTES.TRANSACTION}
            component={TransactionDeliveryPage}
          /> */}
          <Route path="/page-not-found" component={Page404} />
          <Redirect from="*" to="/page-not-found" />
        </Switch>
      ) : (
        <Switch>
          <Route exact path={ROUTES.WELCOME} component={CountryChooser} />
          <Route exact path={ROUTES.CONTACT_US} component={ContactPage} />
          <Route exact path={ROUTES.ABOUT_US} component={AboutUs} />
          <Route
            path={ROUTES.PHONE_VERIFICATION}
            exact
            component={PhoneVerfication}
          />
          <Route exact path={ROUTES.COPY_RIGHT} component={CopyRight} />

          <Route exact path={ROUTES.PRIVACY_POLICY} component={PrivacyPolicy} />
          <Route
            exact
            path={ROUTES.TERM_SERVICES}
            component={TermsAndServices}
          />
          <Route exact path={ROUTES.PHONE_VERIFIED} component={PhoneVerified} />
          <Route exact path={ROUTES.EMAIL_VERIFIED} component={EmailVerified} />
          <Route exact path={ROUTES.SIGNUP} component={SignUp} />
          <Route
            exact
            path={ROUTES.FORGET_PASSWORD}
            component={ForgetPassword}
          />
          <Route exact path={ROUTES.RESET_PASSWORD} component={ResetPassword} />
          <Route
            exact
            path={ROUTES.EMAIL_VERIFICATION}
            component={EmailVerification}
          />
          <Route exact path={ROUTES.PAYMENT_DETAIL} component={PaymentDetail} />

          <PrivateRoute exact path={ROUTES.DASHBOARD} component={Dashboard} />
          <PrivateRoute
            exact
            path={ROUTES.ACCOUNT_DETAIL}
            component={AccountDetail}
          />
          <Route exact path={ROUTES.SENDER_DETAIL} component={SenderDetails} />
          <PrivateRoute
            exact
            path={ROUTES.SENDER_DETAIL_KYC_TRANSACTION}
            component={SenderDetailsKYC}
          />
          <PrivateRoute
            exact
            path={ROUTES.BENEFICIARY_LIST}
            component={BeneficiaryList}
          />
          <PrivateRoute
            exact
            path={ROUTES.BENEFICIARY_CREATE}
            component={BeneficiaryCreate}
          />
          <PrivateRoute
            exact
            path={ROUTES.BENEFICIARY_ADD}
            component={AddBeneficiary}
          />
          <PrivateRoute exact path={ROUTES.BANK_LIST} component={BankList} />
          <PrivateRoute exact path={ROUTES.DEBIT_LIST} component={DebitCard} />
          <PrivateRoute
            exact
            path={ROUTES.TRANSACTION_LIMIT}
            component={TransactionLimit}
          />
          <PrivateRoute exact path={ROUTES.SETTING_PAGE} component={Setting} />
          <PrivateRoute
            exact
            path={ROUTES.BENEFICIARY_DETAIL}
            component={BeneficiaryDetail}
          />
          <PrivateRoute
            exact
            path={ROUTES.PAYMENT_INFO}
            component={PaymentInfomation}
          />
          <PrivateRoute
            exact
            path={ROUTES.REVIEW_DETAIL}
            component={ReviewDetail}
          />
          <PrivateRoute
            exact
            path={ROUTES.CONGRATULATION_PAGE}
            component={CongratulationPage}
          />
          <PrivateRoute exact path={ROUTES.ADD_BANK} component={AddBankForm} />
          <PrivateRoute
            exact
            path={ROUTES.BENEFICIARY_PAYMENT_METHOD}
            component={BeneficiaryPayoutMehodList}
          />
          <PrivateRoute
            exact
            path={ROUTES.BENEFICIARY_CREATE_TRANSACTION}
            component={BeneficiaryCreateFromTransaction}
          />
          <PrivateRoute
            exact
            path={ROUTES.BENEFICIARY_ADD_TRANSACTION}
            component={AddBeneficiary}
          />
          <PrivateRoute
            exact
            path={ROUTES.BENEFICIARY_ADD_BANK_TRANSACTION}
            component={AddBankFromTransaction}
          />
          <PrivateRoute
            exact
            path={ROUTES.BENEFICIARY_ADD_PAYOUT_TRANSACTION}
            component={AddPayoutMethodFromTransaction}
          />
          <PrivateRoute
            exact
            path={ROUTES.BENEFICIARY_ADD_CASHPICK_TRANSACTION}
            component={AddCashPickPointForNewBeneficiary}
          />
          <PrivateRoute
            exact
            path={ROUTES.BENEFICIARY_ADD_CASHPICK_TRANSACTION}
            component={AddCashPickPointForNewBeneficiary}
          />
          <Route path="/page-not-found" component={Page404} />
          <Redirect from="*" to="/page-not-found" />
        </Switch>
      )}
    </BrowserRouter>
  );
};

export default Routes;

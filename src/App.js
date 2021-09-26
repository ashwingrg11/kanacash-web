import React from "react";
import Routes from "./routes";
import "./assets/css/style.css";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { loginApiSuccessAction } from "./store/actions/Login";
import { getCurrentUser } from "./store/actions/UserDetailsActions";
import {
  getDestination,
  getSourceCountry,
  getExchangeRate,
  getStates,
} from "./store/actions/miscellaneousAction";
import {
  getBeneficiaries,
  getSenderCards,
  getSenderBank,
  getActiveAccountSideBar,
  getSenderTransactionLimit,
} from "./store/actions/senderDetail";
import {
  getReciverPaymentMethod,
  getReceiverInfo,
  getSenderPaymentMethod,
  getTransactionAmount,
  getTransferFee,
  getAllTransaction,
} from "./store/actions/TrasactionAction";

import { getFeeStructure } from "./store/actions/adminAction";

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  React.useEffect(() => {
    if (localStorage.transactionDetail) {
      dispatch(
        getTransactionAmount(JSON.parse(localStorage.transactionDetail))
      );
    }

    if (localStorage.activeSideBar) {
      dispatch(getActiveAccountSideBar(`${localStorage.activeSideBar}`));
    } else {
      dispatch(getActiveAccountSideBar("Profile"));
    }

    if (localStorage.beneficiaryDetail) {
      dispatch(
        getReciverPaymentMethod(JSON.parse(localStorage.beneficiaryDetail))
      );
    }

    if (localStorage.beneficiaryInfo) {
      dispatch(getReceiverInfo(JSON.parse(localStorage.beneficiaryInfo)));
    }
    if (localStorage.senderPaymentDetail) {
      dispatch(
        getSenderPaymentMethod(JSON.parse(localStorage.senderPaymentDetail))
      );
    }

    if (localStorage.accessToken) {
      dispatch(
        loginApiSuccessAction({
          token: localStorage.accessToken,
          tokenType: localStorage.type,
        })
      );
      dispatch(getFeeStructure());
      dispatch(getCurrentUser());
      dispatch(getBeneficiaries());
      dispatch(getSenderCards());
      dispatch(getSenderBank());
      dispatch(getSenderTransactionLimit());
      let body = {
        initial: 0,
        end: 10,
      };
      dispatch(getAllTransaction(body));
    }
    dispatch(getExchangeRate());
    dispatch(getTransferFee());
    dispatch(getDestination({ sourceCountry: "US" }));
    dispatch(getStates());
    dispatch(getSourceCountry());
  });

  return (
    <div className="App">
      <div className="main-wrapper">
        <BrowserRouter>
          <Routes isAuthenticated={isAuthenticated} />
        </BrowserRouter>
        {/* {!localStorage.acceptPolicy && <Disclaimer />} */}
      </div>
    </div>
  );
};

export default App;

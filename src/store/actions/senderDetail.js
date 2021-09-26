import {
  SET_BENEFICIARY,
  SET_SENDER_BANK,
  SET_SENDER_CARD,
  GET_ACTIVE_ACCOUNT_PAGE,
  GET_ACTIVE_ACCOUNT_SIDE_BAR,
  GET_SELECTED_PAYOUT_METHOD,
  SENDER_TRANSACTION_LIMIT,
  CLEAR_SENDER_TRANSACTION_LIMIT,
} from "../actions/constant/ActionTypes";
import { hideLoader, showLoader } from "./Loader";
import * as api from "../../services/axios/senderApi";

export const setBeneficiary = (data) => (dispatch, getState) => {
  dispatch({
    type: SET_BENEFICIARY,
    payload: data,
  });
};
export const setSenderBank = (data) => (dispatch, getState) => {
  dispatch({
    type: SET_SENDER_BANK,
    payload: data,
  });
};

export const setSenderCard = (data) => (dispatch, getState) => {
  dispatch({
    type: SET_SENDER_CARD,
    payload: data,
  });
};

export const getBeneficiaries = () => (dispatch, getState) => {
  dispatch(showLoader());
  return api
    .getBeneficiary()
    .then((res) => {
      dispatch(hideLoader());
      try {
        dispatch(setBeneficiary(res.data.results));
      } catch (err) {
        // console.log("error in get Beneficiaries");
      }
      return res;
    })
    .catch((err) => {
      dispatch(hideLoader());
      // console.log("error in get Beneficiaries");
    });
};

export const getSenderBank = () => (dispatch, getState) => {
  dispatch(showLoader());
  api
    .getSenderBank()
    .then((res) => {
      dispatch(hideLoader());
      try {
        dispatch(setSenderBank(res.data.results));
      } catch (err) {
        // console.log("error in get Beneficiaries");
      }
    })
    .catch((err) => {
      // console.log("error in get Beneficiaries");
      dispatch(hideLoader());
    });
};

export const deleteSenderBank = (id) => (dispatch, getState) => {
  return api
    .deleteSenderBank(id)
    .then((res) => {
      if (res.status === 200) {
        return { delete: true, response: res.data };
      } else {
        return { delete: false, response: res.data };
      }
    })
    .catch((err) => {
      return {
        delete: false,
        response: { message: "Error Occure while deleting the bank " },
      };
    });
};

export const deleteSenderCard = (id) => (dispatch, getState) => {
  return api
    .deleteSenderCard(id)
    .then((res) => {
      if (res.status === 200) {
        return { delete: true, response: res.data };
      } else {
        return { delete: false, response: res.data };
      }
    })
    .catch((err) => {
      return { delete: false, response: err.response };
    });
};

export const getSenderCards = () => (dispatch, getState) => {
  dispatch(showLoader());

  api
    .getSenderCard()
    .then((res) => {
      dispatch(hideLoader());
      try {
        dispatch(setSenderCard(res.data.results));
      } catch (err) {
        // console.log("error in get card", err);
      }
    })
    .catch((err) => {
      // console.log("error in get card");
    });
};

export const getActiveAccountSideBar = (body) => (dispatch, getState) => {
  dispatch({ type: GET_ACTIVE_ACCOUNT_SIDE_BAR, payload: body });
};

export const getActiveAccountPage = (body) => (dispatch, getState) => {
  dispatch({ type: GET_ACTIVE_ACCOUNT_PAGE, payload: body });
};

export const getSelectedPaymentMethodWhileCreatingBeneficiary = (body) => (
  dispatch,
  getState
) => {
  dispatch({ type: GET_SELECTED_PAYOUT_METHOD, payload: body });
};

export const getSenderTransactionLimit = () => (dispatch) => {
  api
    .getSenderTransactionLimit()
    .then((res) => {
      try {
        dispatch({ type: SENDER_TRANSACTION_LIMIT, payload: res.data });
      } catch (err) {
        // console.log("error in get sender transaction limit", err);
      }
    })
    .catch((err) => {
      // console.log("error in get sender transaction limit", err);
    });
};
export const clearSenderLimit = () => (dispatch) => {
  dispatch({ type: CLEAR_SENDER_TRANSACTION_LIMIT });
};

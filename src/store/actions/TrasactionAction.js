import {
  RECEIVER_PAYMENT_METHOD,
  SENDER_PAYMENT_METHOD,
  RECEIVER_INFORMATION,
  TRANSACTION_AMOUNT_DETAIL,
  SET_TRANSFER_FEES,
  CLEAR_TRANSACTION_INFORMATION,
  GET_ALL_TRANSACTON,
  CLEAR_PAYMENT_DETAIL,
  CLEAR_SENDER_PAYMENT_DETAIL,
  CLEAR_RECEIVER_PAYMENT_DETAIL,
} from "../actions/constant/ActionTypes";
import { setUser } from "./Auth";
// import { getTransaction } from "../../services/axios/transactionApi";
// import { hideLoader, showLoader } from "./Loader";
import * as api from "../../services/axios/";

export const getCurrentUserSuccess = (data) => (dispatch, getState) => {
  dispatch(
    setUser({
      user: data.sender,
      status: data.status,
    })
  );
  // dispatch(hideLoader());
};

export const setFee = (body) => (dispatch, getState) => {
  dispatch({ type: SET_TRANSFER_FEES, payload: body });
};

export const getReciverPaymentMethod = (body) => (dispatch, getState) => {
  dispatch({ type: RECEIVER_PAYMENT_METHOD, payload: body });
};

export const getSenderPaymentMethod = (body) => (dispatch, getState) => {
  dispatch({ type: SENDER_PAYMENT_METHOD, payload: body });
};

export const getReceiverInfo = (body) => (dispatch, getState) => {
  dispatch({ type: RECEIVER_INFORMATION, payload: body });
};

export const getTransactionAmount = (body) => (dispatch, getState) => {
  dispatch({ type: TRANSACTION_AMOUNT_DETAIL, payload: body });
};

export const getTransferFee = () => (dispatch, getState) => {
  api
    .getFees()
    .then((res) => {
      dispatch(setFee(res.data.data));
    })
    .catch((err) => {
      // console.log("err", err);
    });
};

export const getAllTransaction = (body) => (dispatch) => {
  api
    .getTransaction(body)
    .then((res) => {
      dispatch({ type: GET_ALL_TRANSACTON, payload: res.data.results });
    })
    .catch((err) => {
      // console.log("error while geting the transaction", err.response);
    });
};

export const getAllAdminTransaction = (body) => (dispatch) => {
  api
    .getAdminTransaction(body)
    .then((res) => {
      dispatch({ type: GET_ALL_TRANSACTON, payload: res.data.results });
    })
    .catch((err) => {
      // console.log("error while geting the transaction", err.response);
    });
};

export const clearTransactionData = (body) => (dispatch, getState) => {
  dispatch({ type: CLEAR_TRANSACTION_INFORMATION, payload: body });
};

export const clearPaymentDetail = () => (dispatch, getState) => {
  dispatch({ type: CLEAR_PAYMENT_DETAIL });
};
export const clearSenderPaymentDetail = () => (dispatch, getState) => {
  dispatch({ type: CLEAR_SENDER_PAYMENT_DETAIL });
};
export const clearReceiverPaymentDetail = () => (dispatch, getState) => {
  dispatch({ type: CLEAR_RECEIVER_PAYMENT_DETAIL });
};

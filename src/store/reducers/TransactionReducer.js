import {
  RECEIVER_PAYMENT_METHOD,
  SENDER_PAYMENT_METHOD,
  RECEIVER_INFORMATION,
  TRANSACTION_AMOUNT_DETAIL,
  SET_TRANSFER_FEES,
  GET_ALL_TRANSACTON,
  CLEAR_PAYMENT_DETAIL,
  CLEAR_SENDER_PAYMENT_DETAIL,
  CLEAR_RECEIVER_PAYMENT_DETAIL,
  CLEAR_TRANSACTION_INFORMATION,
} from "../actions/constant/ActionTypes";

const INITIAL_STATE = {
  senderPaymentMethod: {},
  receiverPaymentMethod: {},
  receiverInfo: {},
  transactionDetail: {},
  transferFee: [],
  transactionList: [],
};

const senderDetailReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RECEIVER_INFORMATION:
      return {
        ...state,
        receiverInfo: action.payload,
      };

    case RECEIVER_PAYMENT_METHOD:
      return {
        ...state,
        receiverPaymentMethod: action.payload,
      };

    case SENDER_PAYMENT_METHOD:
      return {
        ...state,
        senderPaymentMethod: action.payload,
      };
    case TRANSACTION_AMOUNT_DETAIL:
      return {
        ...state,
        transactionDetail: action.payload,
      };
    case SET_TRANSFER_FEES:
      return {
        ...state,
        transferFee: action.payload,
      };
    case GET_ALL_TRANSACTON:
      return {
        ...state,
        transactionList: action.payload,
      };
    case CLEAR_PAYMENT_DETAIL:
      return {
        ...state,
        transactionDetail: {},
      };

    case CLEAR_SENDER_PAYMENT_DETAIL:
      return {
        ...state,
        senderPaymentMethod: {},
      };

    case CLEAR_RECEIVER_PAYMENT_DETAIL:
      return {
        ...state,
        receiverPaymentMethod: {},
        receiverInfo:{}

      };
    case CLEAR_TRANSACTION_INFORMATION:
      return {
        ...state,
        senderPaymentMethod: {},
        receiverPaymentMethod: {},
        receiverInfo: {},
        transactionDetail: {},
      };

    default:
      return state;
  }
};

export default senderDetailReducers;

import {
  SET_BENEFICIARY,
  SET_SENDER_BANK,
  SET_SENDER_CARD,
  GET_ACTIVE_ACCOUNT_SIDE_BAR,
  GET_ACTIVE_ACCOUNT_PAGE,
  GET_SELECTED_PAYOUT_METHOD,
  SENDER_TRANSACTION_LIMIT,
  CLEAR_SENDER_TRANSACTION_LIMIT
} from "../actions/constant/ActionTypes";

const INITIAL_STATE = {
  beneficiaries: [],
  senderBanks: [],
  senderCards: [],
  activeSideBar:"Profile",
  payoutMehod:"",
  senderTransactionLimit:{}
};

const senderDetailReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_BENEFICIARY:
      return {
        ...state,
        beneficiaries: action.payload,
      };

    case SET_SENDER_BANK:
      return {
        ...state,
        senderBanks: action.payload,
      };

    case SET_SENDER_CARD:
      return {
        ...state,
        senderCards: action.payload,
      };
    case GET_ACTIVE_ACCOUNT_SIDE_BAR:
      return {
        ...state,
        activeSideBar:action.payload
      }
      case GET_ACTIVE_ACCOUNT_PAGE:
        return {
          ...state,
          activePage:action.payload
        }
        case GET_SELECTED_PAYOUT_METHOD:
          return {
            ...state,
            payoutMehod:action.payload
          }
          case SENDER_TRANSACTION_LIMIT:
            return {
              ...state,
              senderTransactionLimit:action.payload
            }
        case CLEAR_SENDER_TRANSACTION_LIMIT:
          return {
            ...state,
            senderTransactionLimit:""
          }
      
    default:
      return state;
  }
};

export default senderDetailReducers;

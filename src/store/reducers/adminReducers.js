import {
  SET_FEE_STRUCTURE,
  SET_UNLOCKED_SENDER,
} from "../actions/constant/ActionTypes";

const INITIAL_STATE = {
  feeStructure: [],
  lockedSender: [],
};

const adminReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_FEE_STRUCTURE:
      return {
        ...state,
        feeStructure: action.payload,
      };
    case SET_UNLOCKED_SENDER:
      return {
        ...state,
        lockedSender: action.payload,
      };

    default:
      return state;
  }
};

export default adminReducers;

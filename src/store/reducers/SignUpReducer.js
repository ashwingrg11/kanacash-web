import { SET_SING_UP_INFORMATION } from "../actions/constant/ActionTypes";

const INITIAL_STATE = {};

const SignUpReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_SING_UP_INFORMATION:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

export default SignUpReducer;

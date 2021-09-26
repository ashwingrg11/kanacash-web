import {
  SET_USER,
  SET_TOKEN,
  RESET_AUTH,
  RESET_TOKEN,
  REFRESH_ACCESS_TOKEN,
  CLEAR_USER,
  ACCEPT_POLICY,
} from "../actions/constant/ActionTypes";

const INITIAL_STATE = {
  user: {},
  status: {},
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  accept_policy: false,
};

const AuthReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload.user,
        status: action.payload.status,
      };
    case CLEAR_USER:
      return {
        ...state,
        user: "",
        status: "",
      };

    case SET_TOKEN:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        tokenType: action.payload.tokenType,
        isAuthenticated: true,
      };

    case REFRESH_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.payload,
      };

    case RESET_AUTH:
    case RESET_TOKEN:
      return {
        ...state,
        user: {},
        accessToken: null,
        isAuthenticated: false,
      };
    case ACCEPT_POLICY:
      return {
        ...state,
        accept_policy: true,
      };

    case "TEST_LOGIN":
      return {
        ...state,
        isAuthenticated: true,
      };

    default:
      return state;
  }
};

export default AuthReducer;

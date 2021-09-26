import {
  SET_DESTINATION_COUNTRY,
  SET_SOURCE_COUNTRY,
  SET_EXCHANGE_RATE,
  SET_ALL_COUNTRY,
  SET_US_STATES,
  SET_NGA_STATES} from "../actions/constant/ActionTypes";

const INITIAL_STATE = {
  countries: [],
  dest_country: [],
  exchange_rate: [],
  nga_state:[],
  us_state:[]
};

const MiscellaneousReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ALL_COUNTRY:
      return {
        ...state,
        countries: action.payload,
      };
    case SET_DESTINATION_COUNTRY:
      return {
        ...state,
        dest_country: action.payload,
      };
    case SET_SOURCE_COUNTRY:
      return {
        ...state,
        source_country: action.payload,
      };
    case SET_EXCHANGE_RATE:
      return {
        ...state,
        exchange_rate: action.payload,
      };
      case SET_US_STATES:
      return {
        ...state,
        us_state: action.payload,
      };

      case SET_NGA_STATES:
      return {
        ...state,
        nga_state: action.payload,
      };
      
    default:
      return state;
  }
};
export default MiscellaneousReducer;

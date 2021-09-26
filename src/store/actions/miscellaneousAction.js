import * as api from "../../services/axios/auxApi";
import {
  SET_DESTINATION_COUNTRY,
  SET_SOURCE_COUNTRY,
  SET_EXCHANGE_RATE,
  SET_ALL_COUNTRY,
  SET_US_STATES,
  SET_NGA_STATES,
} from "./constant/ActionTypes";
// import { showLoader } from "./Loader";
export const setDestinationCountry = (destinationCountry) => (
  dispatch,
  getState
) => {
  // dispatch(showLoader());
  dispatch({
    type: SET_DESTINATION_COUNTRY,
    payload: destinationCountry,
  });
};

export const setSourceCountry = (destinationCountry) => (
  dispatch,
  getState
) => {
  // dispatch(showLoader());
  dispatch({
    type: SET_SOURCE_COUNTRY,
    payload: destinationCountry,
  });
};

export const getAllCountries = (body) => (dispatch, getState) => {
  return api
    .getAllCountriesApi()
    .then((response) => {
      dispatch({
        type: SET_ALL_COUNTRY,
        payload: response.data.results,
      });
      return response;
    })
    .catch((error) => {
      // console.log("error while geting the exchange rate", error);
    });
};

export const getDestination = (body) => (dispatch, getState) => {
  api
    .destinationCountry(body)
    .then((response) => {
      dispatch(setDestinationCountry(response.data.results));
    })
    .catch((error) => {
      // console.log("error", error);
    });
};

export const getStates = () => (dispatch, getState) => {
  api
    .getStates(2)
    .then((response) => {
      dispatch({ type: SET_US_STATES, payload: response.data.results });
    })
    .catch((error) => {
      // console.log("error", error);
    });
  api
    .getStates(7)
    .then((response) => {
      dispatch({ type: SET_NGA_STATES, payload: response.data.results });
    })
    .catch((error) => {
      // console.log("error", error);
    });
};

export const setExchangeRate = (body) => (dispatch, getState) => {
  dispatch({
    type: SET_EXCHANGE_RATE,
    payload: body,
  });
};
export const getSourceCountry = (body) => (dispatch, getState) => {
  api
    .getSourceCountry()
    .then((response) => {
      dispatch(setSourceCountry(response.data.results));
    })
    .catch((error) => {
      // if(error.response.data!=undefined){
      //   response = {
      //     status: "error",
      //     errorMessage: error.response.data.message,
      //   };
      // }
    });
};

export const getExchangeRate = (body) => (dispatch, getState) => {
  api
    .getExchangeRate()
    .then((response) => {
      dispatch(setExchangeRate(response.data.results));
    })
    .catch((error) => {
      // console.log("error while geting the exchange rate", error);
    });
};

export const testLogin = () => (dispatch) => dispatch({ type: "TEST_LOGIN" });

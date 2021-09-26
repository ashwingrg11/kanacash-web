// import {Platform} from 'react-native';

import {
  SET_FEE_STRUCTURE,
  SET_UNLOCKED_SENDER,
} from "./constant/ActionTypes.js";

import * as api from "../../services/axios/adminApi";

export const getFeeStructure = () => (dispatch) => {
  api
    .getFeeSet()
    .then((res) => {
      if (res.data.success) {
        dispatch({ type: SET_FEE_STRUCTURE, payload: res.data.data });
      } else {
        // console.log("err", res.data);
      }
    })
    .catch((err) => {
      // console.log("err", err);
    });
};

export const getLockedSenders = () => (dispatch) => {
  api
    .getLockedSender()
    .then((res) => {
      dispatch({ type: SET_UNLOCKED_SENDER, payload: res.data.data });
    })
    .catch((err) => {
      // console.log("err", err);
    });
};

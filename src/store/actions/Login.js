import {
  LOGIN_POST_API_REQUEST,
  LOGIN_POST_API_SUCCESS,
  LOGIN_POST_API_FAILURE,
} from "./constant/ActionTypes";

// import AsyncStorage from '@react-native-community/async-storage';
import * as api from "../../services/axios/authApi";

import { setError } from "./Error";
import { setToken } from "./Auth";
// import { showLoader, hideLoader } from "./Loader";

export const loginApiRequestAction = (loginRequest) => (dispatch, getState) => {
  dispatch({
    type: LOGIN_POST_API_REQUEST,
  });
  // dispatch(showLoader());
};

export const loginApiSuccessAction = (loginSuccess) => (dispatch, getState) => {
  dispatch({
    type: LOGIN_POST_API_SUCCESS,
    payload: loginSuccess,
  });
  dispatch(
    setToken({
      accessToken: loginSuccess.accessToken,
      tokenType: loginSuccess.tokenType,
    })
  );
};

export const loginApiFailureAction = (loginFailure) => (dispatch, getState) => {
  dispatch({
    type: LOGIN_POST_API_FAILURE,
    payload: loginFailure,
  });

  if (loginFailure !== undefined) {
    let modalConfig = {
      message: loginFailure.data.message,
      message_title: "Sorry!",
    };

    // dispatch(hideLoader());
    dispatch(setError(modalConfig));
  }
};

export const getWidgetToken = () => (dispatch, getState) => {
  api
    .getWidgetToken()
    .then((res) => {})
    .catch((err) => {
      // console.log(err);
    });
};

export const loginAction = (body) => (dispatch, getState) => {
  // dispatch(loginApiRequestAction());
  return new Promise((resolve, reject) => {
    api
      .login(body)
      .then((response) => {
        try {
          if (response.status === 200) {
            localStorage.setItem("accessToken", response.data.data.accessToken);
            localStorage.setItem("type", response.data.data.tokenType);
            localStorage.setItem("senderId", response.data.data.senderId);
            localStorage.setItem("userId", response.data.data.userId);
            localStorage.setItem("role", response.data.data.role);

            localStorage.setItem(
              "refreshToken",
              response.data.data.refreshToken
            );
            dispatch(loginApiSuccessAction(response.data.data));
            let responsed = {
              status: "success",
              role: response.data.data.role,
            };
            resolve(responsed);
          } else {
            let res = {
              status: "error",
              errorMessage: response.data.message,
            };
            reject(res);
          }
        } catch (error) {
          let response = {
            status: "error",
            errorMessage: error.response.data.message,
          };
          reject(response);
        }
      })
      .catch((error) => {
        dispatch(loginApiFailureAction(error));
        let response = {
          status: "error",
          errorMessage: error.data.message,
        };
        reject(response);
      });
  });
};

export const testLogin = () => (dispatch) => dispatch({ type: "TEST_LOGIN" });

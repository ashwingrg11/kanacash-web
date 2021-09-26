import {
  RESET_AUTH,
  SET_USER,
  SET_TOKEN,
  RESET_TOKEN,
  REFRESH_ACCESS_TOKEN,
  REFRESH_TOKEN_POST_API_REQUEST,
  REFRESH_TOKEN_POST_API_SUCCESS,
  REFRESH_TOKEN_POST_API_FAILURE,
  ACCEPT_POLICY,
} from "./constant/ActionTypes";
import * as api from "../../services/axios/";

export const resetAuth = () => {
  return {
    type: RESET_AUTH,
  };
};

export const getPolicy = () => {
  return {
    type: ACCEPT_POLICY,
  };
};

export const setUser = (user) => (dispatch) => {
  dispatch({
    type: SET_USER,
    payload: user,
  });
};

export const setToken = (tokenData) => (dispatch) => {
  dispatch({
    type: SET_TOKEN,
    payload: tokenData,
  });
};

export const refreshAccessToken = (tokenData) => (dispatch) => {
  dispatch({
    type: REFRESH_ACCESS_TOKEN,
    payload: tokenData,
  });
};

export const clearToken = (tokenData) => (dispatch) => {
  dispatch({
    type: RESET_TOKEN,
  });
};

const refreshTokenRequestAction = () => (dispatch) => {
  dispatch({
    type: REFRESH_TOKEN_POST_API_REQUEST,
  });
};

const refreshTokenSuccessAction = (tokenData) => (dispatch) => {
  dispatch({
    type: REFRESH_TOKEN_POST_API_SUCCESS,
    payload: tokenData,
  });

  dispatch(refreshAccessToken(tokenData.data.access_token));
};

const refreshTokenFailureAction = (tokenFailure) => (dispatch) => {
  dispatch({
    type: REFRESH_TOKEN_POST_API_FAILURE,
    payload: tokenFailure,
  });
  dispatch(resetAuth());
};

export const getNewAccessToken = () => (dispatch, getState) => {
  return new Promise(async (resolve, reject) => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      let body = {
        refreshToken: refreshToken,
      };
      dispatch(refreshTokenRequestAction());
      api
        .refreshToken(body)
        .then((response) => {
          localStorage.setItem("accessToken", response.data.data.accessToken);
          localStorage.setItem("type", response.data.data.tokenType);
          dispatch(refreshTokenSuccessAction(response.data));
          resolve(response);
        })
        .catch((error) => {
          localStorage.clear();
          dispatch(refreshTokenFailureAction(error.response));
          reject(error);
        });
    } else {
      localStorage.clear();
    }
  });
};

export const resendVerificationCode = () => (dispatch, getState) => {
  const params = {
    userId: localStorage.userId,
  };
  return new Promise(async (resolve, reject) => {
    api
      .sendEmailVerificationCodeApi(params)
      .then((res) => {
        if (res.status === 200) {
          resolve(res);
        } else {
          reject(res);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const resendPhoneVerificationCode = () => (dispatch, getState) => {
  const params = {
    userId: localStorage.userId,
  };
  return new Promise(async (resolve, reject) => {
    api
      .sendPhoneVerificationCodeApi(params)
      .then((res) => {
        if (res.status === 200) {
          resolve(res);
        } else {
          reject(res);
        }
      })
      .catch((err) => {
        // console.log("err", err);
        reject(err);
      });
  });
};

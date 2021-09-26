import {
  FORGOT_PASSWORD_POST_API_REQUEST,
  FORGOT_PASSWORD_POST_API_SUCCESS,
  FORGOT_PASSWORD_POST_API_FAILURE,
  FORGOT_PASSWORD_SUCCESS,
} from "~/store/actions/constant/ActionTypes";

import * as api from "~/services/axios/Api";

import { setError } from "~/store/actions/Error";
import { setSuccess } from "~/store/actions/Success";
import { showLoader, hideLoader } from "~/store/actions/Loader";

export const forgotPasswordSuccess = (forgotPasswordSuccess) => {
  return {
    type: FORGOT_PASSWORD_SUCCESS,
    payload: forgotPasswordSuccess,
  };
};

const forgotPasswordApiRequestAction = (forgotPasswordRequest) => (
  dispatch
) => {
  dispatch(showLoader());

  dispatch({
    type: FORGOT_PASSWORD_POST_API_REQUEST,
  });
};

const forgotPasswordApiSuccessAction = (forgotPasswordSuccess) => (
  dispatch
) => {
  dispatch({
    type: FORGOT_PASSWORD_POST_API_SUCCESS,
    payload: forgotPasswordSuccess,
  });

  dispatch(hideLoader());

  let modalConfig = {
    message:
      "We have send an email with a link to reset your password. Please check your email for further instructions.",
    message_title: "Awesome!",
  };
  dispatch(setSuccess(modalConfig));
};

const forgotPasswordApiFailureAction = (forgotPasswordFailure) => (
  dispatch
) => {
  dispatch({
    type: FORGOT_PASSWORD_POST_API_FAILURE,
    payload: forgotPasswordFailure,
  });

  if (forgotPasswordFailure != undefined) {
    let modalConfig = {
      message: forgotPasswordFailure.data.message,
      message_title: "Sorry!",
    };

    dispatch(hideLoader());
    dispatch(setError(modalConfig));
  }
};

export const forgotPasswordApi = (obj) => (dispatch) => {
  let modalConfig = {
    message:
      "We have send an email with a link to reset your password. Please check your email",
    message_title: "",
  };
  dispatch(setSuccess(modalConfig));
  // let params = {
  //   email: obj,
  // };

  // dispatch(forgotPasswordApiRequestAction());
  // api
  //   .forgotPassword(params)
  //   .then(response => {
  //     response.data.forgotPasswordSuccess = true;
  //     dispatch(forgotPasswordApiSuccessAction(response.data));
  //   })
  //   .catch(error => {
  //     dispatch(forgotPasswordApiFailureAction(error.response));
  //   });
};

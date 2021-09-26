import { SET_SING_UP_INFORMATION } from "./constant/ActionTypes";
import { showLoader, hideLoader } from "./Loader";
import * as api from "../../services/axios/authApi";
// import { loginAction } from "./Login";

export const sendPhoneVerificationCode = () => (dispatch, getState) => {
  dispatch(showLoader());
  // const queryParams = {
  //   phoneNumber: body.phoneNumber,
  //   email: body.email,
  // };
  return new Promise((resolve, reject) => {
    const params = {
      userId: localStorage.userId,
    };
    return api
      .sendPhoneVerificationCodeApi(params)
      .then((response) => {
        if (response.data.success) {
          // localStorage.setItem("userId", response.data.data.userId);
          // dispatch({
          //   type: SET_SING_UP_INFORMATION,
          //   payload: { ...body, ...response.data.data },
          // });
          dispatch(sendEmailVerification());

          dispatch(hideLoader());
        }
        resolve({ ...response.data });
      })
      .catch((error) => {
        let response = {
          success: false,
          status: "error",
          errorMessage: error,
        };
        dispatch(hideLoader());

        reject(response);
      });

    // phone number or Email already exist
    // dispatch(hideLoader());

    // reject({
    //   success: false,
    //   response: { message: res.data.message },
    // });
  });
};

export const verifyPhoneNumber = (code) => (dispatch, getState) => {
  dispatch(showLoader());

  return new Promise((resolve, reject) => {
    const userId = localStorage.userId;
    let body = {
      userId,
      code,
    };
    api
      .verifyPhoneCodeApi(body)
      .then((response) => {

        if (response.status === 200) {
          // localStorage.setItem("userId", response.data.data.userId);
          dispatch({
            type: SET_SING_UP_INFORMATION,
            payload: { ...response.data.data },
          });
          dispatch(hideLoader());
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch((err) => {
        dispatch(hideLoader());

        reject(err);
      });
  });
};

export const sendEmailVerification = (body) => (dispatch, getState) => {
  const params = {
    userId: localStorage.userId,
  };
  api
    .sendEmailVerificationCodeApi(params)
    .then((response) => {
      if (response.data.success) {
        dispatch({
          type: SET_SING_UP_INFORMATION,
          payload: { ...response.data.data },
        });
      }
    })
    .catch((err) => {
      // console.log("error in sendEmailVerificationCodeApi", err);
    });
};

export const verifyEmailAddress = (code) => (dispatch, getState) => {
  dispatch(showLoader());

  return new Promise((resolve, reject) => {
    const userId = localStorage.userId;
    let body = {
      userId,
      code,
    };
    api
      .verifyEmailCodeApi(body)
      .then((response) => {
        if (response.status === 200) {
          // const success_signup = dispatch(signupUser());
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch((err) => {
        dispatch(hideLoader());

        reject(err);
      });
  });
};

export const signupUser = (body) => (dispatch, getState) => {
  // dispatch(sendPhoneVerificationCode(body))

  return new Promise((resolve, reject) => {
    api
      .signUp(body)
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("senderId", response.data.data.id);
          const loginBody = {
            email: response.data.data.email,
            password: body.password,
          };
          // localStorage.clear()
          // dispatch(loginAction(loginBody));
          resolve(loginBody);
        } else {
          reject(response);
        }
      })
      .catch((err) => {
        localStorage.clear();

        reject(err);
      });
  });
};

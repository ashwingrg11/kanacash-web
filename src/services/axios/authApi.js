import axios from "axios";
import endpoints from "./endpoints";

export const checkUserExistenceApi = ({ phoneNumber, email }) => {
  const options = {
    url: `${endpoints.checkUserExistence}?phoneNumber=${phoneNumber}&email=${email}`,
    data: null,
    method: "get",
  };
  return axios(options);
};

export const signUp = (body) => {
  const options = {
    url: endpoints.registerUser,
    data: body,
    method: "post",
  };
  return axios(options);
};

export const login = (body) => {
  const options = {
    url: endpoints.loginUser,
    data: body,
    method: "post",
  };
  return axios(options);
};

export const forgetPassword = (email) => {
  const options = {
    url: `${endpoints.password}?email=${email}`,
    data: null,
    method: "get",
  };
  return axios(options);
};

export const resetPassword = (body) => {
  const options = {
    url: `${endpoints.password}`,
    data: body,
    method: "post",
  };
  return axios(options);
};

export const changePassword = (body) => {
  const options = {
    url: `${endpoints.password}`,
    data: body,
    method: "put",
  };
  return axios(options);
};

export const refreshToken = (body) => {
  const options = {
    url: endpoints.refreshToken,
    data: body,
    method: "post",
  };
  return axios(options);
};

export const sendPhoneVerificationCodeApi = ({ userId }) => {
  const options = {
    url: `${endpoints.verifyMobile}?userId=${userId}`,
    data: null,
    method: "get",
  };
  return axios(options);
};

export const verifyPhoneCodeApi = (body) => {
  const options = {
    url: `${endpoints.verifyMobile}`,
    data: body,
    method: "post",
  };
  return axios(options);
};

export const sendEmailVerificationCodeApi = ({ userId }) => {
  const options = {
    url: `${endpoints.verifyEmail}?userId=${userId}`,
    data: null,
    method: "get",
  };
  return axios(options);
};

export const verifyEmailCodeApi = (body) => {
  const options = {
    url: `${endpoints.verifyEmail}`,
    data: body,
    method: "post",
  };
  return axios(options);
};

export const getCurrentUser = () => {
  const options = {
    url: endpoints.getUserDetails,
    data: null,
    method: "get",
  };
  return axios(options);
};

export const getWidgetToken = () => {
  const options = {
    url: endpoints.widgetToken,
    data: null,
    method: "get",
  };
  return axios(options);
};

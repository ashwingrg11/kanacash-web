import axios from "axios";
import endpoints from "./endpoints";

export const addFeeStructure = (body) => {
  const options = {
    url: `${endpoints.feeStructure}`,
    data: body,
    method: "post",
  };
  return axios(options);
};

export const getFeeSet = () => {
  const options = {
    url: `${endpoints.feeStructure}`,
    data: null,
    method: "get",
  };
  return axios(options);
};
export const editFeeStructure = (body) => {
  const options = {
    url: `${endpoints.feeStructure}/${body.id}`,
    data: body.feeStructure,
    method: "put",
  };
  return axios(options);
};

export const getLockedSender = () => {
  const options = {
    url: `${endpoints.lockedSender}`,
    data: null,
    method: "get",
  };
  return axios(options);
};

export const unlockLockedSenderById = (body) => {
  const options = {
    url: `${endpoints.unlockLockedSender}/${body}/unlock`,
    data: null,
    method: "post",
  };
  return axios(options);
};

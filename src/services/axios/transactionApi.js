import axios from "axios";
import endpoints from "./endpoints";

export const createTransaction = (body) => {
  const options = {
    url: endpoints.transactions,
    data: body,
    method: "post",
  };
  return axios(options);
};

export const getTransaction = (body) => {
  const options = {
    url: `${endpoints.transactions}`,
    data: "",
    method: "get",
  };
  return axios(options);
};

export const getAdminTransaction = (body) => {
  const options = {
    url: `${endpoints.adminTransactions}`,
    data: "",
    method: "get",
  };
  return axios(options);
};

export const deliverTransaction = (body) => {
  const options = {
    url: `${endpoints.adminTransactions}/${body.id}/delivery-requests`,
    data: "",
    method: "post",
  };
  return axios(options);
};

export const getSingleTransaction = (transactionId) => {
  const options = {
    url: `${endpoints.transactions}/${transactionId}`,
    data: "",
    method: "get",
  };
  return axios(options);
};

export const getReceiptOfTransaction = (transactionId) => {
  const options = {
    url: `${endpoints.transactions}/${transactionId}/invoice?type=LINK`,
    data: "",
    method: "get",
  };
  return axios(options);
};

export const cancelTransaction = (transactionId) => {
  const options = {
    url: `${endpoints.transactions}/${transactionId}`,
    data: "",
    method: "delete",
  };
  return axios(options);
};

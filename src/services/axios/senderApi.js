import axios from "axios";
import endpoints from "./endpoints";

export const createBeneficiary = (body) => {
  const options = {
    url: endpoints.beneficiary,
    data: body,
    method: "post",
  };
  return axios(options);
};
export const updateBeneficiary = (data) => {
  const options = {
    url: `${endpoints.beneficiary}/${data.id}`,
    data: data.body,
    method: "put",
  };
  return axios(options);
};

export const getBeneficiary = (body) => {
  const options = {
    url: endpoints.beneficiary,
    data: null,
    method: "get",
  };
  return axios(options);
};

export const getSenderBank = (body) => {
  const options = {
    url: endpoints.senderBanks,
    data: null,
    method: "get",
  };
  return axios(options);
};

export const getSenderCard = (body) => {
  const options = {
    url: endpoints.senderCards,
    data: "",
    method: "get",
  };
  return axios(options);
};

export const deleteSenderBank = (id) => {
  const options = {
    url: `${endpoints.senderBanks}/${id}`,
    data: "",
    method: "delete",
  };
  return axios(options);
};

export const deleteSenderCard = (id) => {
  const options = {
    url: `${endpoints.senderCards}/${id}`,
    data: "",
    method: "delete",
  };
  return axios(options);
};

export const getSenderTransactionLimit = () => {
  const options = {
    url: endpoints.transactionsLimit,
    data: null,
    method: "get",
  };
  return axios(options);
};

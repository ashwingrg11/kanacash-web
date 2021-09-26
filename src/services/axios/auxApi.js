import axios from "axios";
import endpoints from "./endpoints";

export const getAllCountriesApi = () => {
  const options = {
    url: `${endpoints.getAllCountries}`,
    data: "",
    method: "get",
  };
  return axios(options);
};

export const destinationCountry = () => {
  const options = {
    url: `${endpoints.getAllCountries}`,
    data: null,
    method: "get",
  };
  return axios(options);
};

export const getSourceCountry = () => {
  const options = {
    url: `${endpoints.getAllCountries}`,
    data: "",
    method: "get",
  };
  return axios(options);
};

export const getExchangeRate = () => {
  const options = {
    url: endpoints.exchangeRate,
    data: "",
    method: "get",
  };
  return axios(options);
};

export const getBankByCountry = (countryId) => {
  const options = {
    url: `${endpoints.getAllBankForCountry}/${countryId}`,
    data: "",
    method: "get",
  };
  return axios(options);
};

export const createBeneficiariesBank = (body) => {
  const { beneficiaryId, account_number, bank_id } = body;
  const postBody = {
    account_number,
    bank_id
  };
  const options = {
    url: `${endpoints.beneficiary}/${beneficiaryId}/banks`,
    data: postBody,
    method: "post",
  };
  return axios(options);
};

export const getListOfLocationForCashPickUp = (body) => {
  const options = {
    url: `${endpoints.getAllParyersForCountry}/${body.country}`,
    data: "",
    method: "get",
  };
  return axios(options);
};

export const getFees = () => {
  const options = {
    url: endpoints.getFee,
    data: "",
    method: "get",
  };
  return axios(options);
};


export const getStates = (countryCode) =>{
  const options = {
    url: `${endpoints.states}?countryId=${countryCode}`,
    data: "",
    method: "get",
  };
  return axios(options);}
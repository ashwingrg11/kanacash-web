import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import config from "./config/config";
import App from "./App";
import "./assets/css/style.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Store from "./store/Store";
import { getNewAccessToken } from "./store/actions/Auth";

axios.defaults.baseURL = config.API_BASE_URL;
axios.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.request.use(
  async function (config) {
    if (navigator.onLine) {
      let endpoint = config.url;
      const token = await localStorage.getItem("accessToken");
      const senderId = localStorage.getItem("senderId");
      const userId = localStorage.getItem("userId");


      if (token != null && !endpoint.includes("renewtoken")) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      if (senderId) {
        config.headers["X-Sender-Id"] = senderId;
      }
      if (userId) {
        config.headers["X-User-Id"] = userId;
      }
      return config;
    } else {
      alert("offline");
    }
  },
  function (err) {
    return Promise.reject(err);
  }
);

let isAlreadyFetchingAccessToken = false;
let subscribers = [];

function onAccessTokenFetched(access_token) {
  subscribers = subscribers.filter((callback) => callback(access_token));
}

function addSubscriber(callback) {
  subscribers.push(callback);
}

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    // Do something with response error
    if (navigator.onLine) {
      if (error.response.status === 400) {
        return error.response;
      }
      const statusCode = error.response.status;
      const originalRequest = error.config;
      if (statusCode === 401) {
        // time to ask for fresh token
        if (!isAlreadyFetchingAccessToken) {
          isAlreadyFetchingAccessToken = true;
          Store.dispatch(getNewAccessToken())
            .then((res) => {
              if (res.status === 200) {
                isAlreadyFetchingAccessToken = false;
                onAccessTokenFetched(res.data.data.accessToken);
              }
            })
            .catch((err) => {
              // console.log(err);
            });
        }
        const retryOriginalRequest = new Promise((resolve) => {
          addSubscriber((access_token) => {
            originalRequest.headers.Authorization = `Bearer ${access_token}`;
            resolve(axios(originalRequest));
          });
        });
        return retryOriginalRequest;
      }
      return Promise.reject(error.response);
    }
    return Promise.reject(error.response);
  }
);

ReactDOM.render(
  <Provider store={Store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

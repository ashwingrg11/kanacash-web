const dev = {
  // APP_BASE_URL: "http://localhost:3000",
  API_BASE_URL: "https://cz9tmct9le.execute-api.us-east-2.amazonaws.com/dev",
  // API_BASE_URL: "https://api-qa.transfapay.com",
};

const qa = {
  APP_BASE_URL: "",
  API_BASE_URL: "https://api-qa.transfapay.com",
};

const uat = {
  APP_BASE_URL: "",
  API_BASE_URL: "https://api-uat.transfapay.com",
};

const production = {
  APP_BASE_URL: "",
  API_BASE_URL: "https://api.transfapay.com",
};

let config = null;
switch (process.env.REACT_APP_STAGE) {
  case "production":
    config = production;
    break;
  case "uat":
    config = uat;
    break;
  case "qa":
    config = qa;
    break;
  // Default to dev if not set
  default:
    config = dev;
}

export default {
  // Include common config values here
  UPLOAD_PATH: "upload path",
  ...config,
};

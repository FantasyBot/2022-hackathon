const axios = require("axios");
const dotenv = require("dotenv").config();
const error = require("../libs/error");

// handle kyc session start
const sendKycRequest = async () => {
  // get kyc access token
  const { data } = await axios.post(
    "https://kyc.dev.sweeftdigital.com:8081/client/token",
    {
      organization: process.env.KYC_ORGANISATION,
      clientName: process.env.KYC_CLIENTNAME,
      key: process.env.KYC_KEY,
    }
  );
  const accessToken = data?.access_token;

  // check
  if (!accessToken) {
    throw error("KYC_ERROR", 400);
  }

  /* 
    request session creation from kyc api
    requires authorization header
  */
  const sessionRes = await axios.post(
    "https://kyc.dev.sweeftdigital.com:8081/auth/create-session",
    {
      redirectUrl: "facebook.com",
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const kycSession = sessionRes.data;
  
  return kycSession;
};

module.exports = {
  sendKycRequest,
};

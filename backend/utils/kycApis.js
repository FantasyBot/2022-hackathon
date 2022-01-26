const axios = require("axios");
const dotenv = require("dotenv").config();

const sendKycRequest = async () => {
  const token = await axios.post(
    "https://kyc.dev.sweeftdigital.com:8081/client/token",
    {
      organization: process.env.ORGANISATION,
      clientName: process.env.CLIENTNAME,
      key: process.env.KEY,
    }
  );

  return token;

  // const verify = await axios.post(
  //   "https://kyc.dev.sweeftdigital.com:8081/auth/create-session",
  //   {
  //     redirectUrl: "facebook.com",
  //   },
  //   {
  //     headers: {
  //       Authorization: `Bearer ${token.data.access_token}`,
  //     },
  //   }
  // );

  // return verify;
};

module.exports = {
  sendKycRequest,
};

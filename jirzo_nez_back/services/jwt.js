const jwt = require("jwt-simple");
const moment = require("moment");

const SECRET_KEY = "87yte639203e892D6HR#89473AjhR987512kdfsDFGQPA";

const createAccessToken = (user) => {
  const expToken = new Date();
  expToken.setHours(expToken.getHours() + 3);
  const payload = {
    id: user.id,
    iat: Date.now(),
    token_type: "access",
   
  };

  return jwt.encode(payload, SECRET_KEY);
};

const createRefreshAccessToken = (user) => {
  const expToken = new Date();
  expToken.getMonth(expToken.getMonth() + 1);
  const payload = {
    id: user._id,
    iat: Date.now(),
    token_type: "refresh",
    exp: expToken.getTime(),
  };
  return jwt.encode(payload, SECRET_KEY);
};

const decodeToken = (token) => {
  return jwt.decode(token, SECRET_KEY, true);
};

module.exports = { createAccessToken, createRefreshAccessToken, decodeToken };

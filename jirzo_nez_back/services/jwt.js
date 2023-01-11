const jwt = require("jwt-simple");
const moment = require("moment");

const SECRET_KEY = "87yte639203e892D6HR#89473AjhR987512kdfsDFGQPA";

const createAccessToken = (user) => {
  const payload = {
    id: user.id,
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    role: user.role,
    createToken: moment().unix(),
    exp: moment().add(3, "hours").unix()
  };

  return jwt.encode(payload, SECRET_KEY);
};

const createRefreshAccessToken = (user) => {
  const payload = {
    id: user._id,
    exp: moment().add(30, "days").unix()
  };
  return jwt.encode(payload, SECRET_KEY);
};

const decodeToken = (token) => {
  return jwt.decode(token, SECRET_KEY, true);
};

module.exports = { createAccessToken, createRefreshAccessToken, decodeToken };

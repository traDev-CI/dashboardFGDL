const jwt = require("../services/jwt");
const moment = require("moment");
const User = require("../models/user");

const willExpireToken = (token) => {
  const { exp } = jwt.decodeToken(token);
  const currentDate = moment().unix();
  if (currentDate > exp) {
    return true;
  }
  return false;
};

const refreshAccessToken = (req, res) => {
  const { refreshToken } = req.body;
  const isTokenExpire = willExpireToken(refreshToken);
  if (isTokenExpire) {
    res.status(404).send({ message: "Refresh Token has expired" });
  } else {
    const { id } = jwt.decodeToken(refreshToken);
    User.findOne({ _id: id }, (err, userStored) => {
      if (err) {
        res.status(500).send({ message: "Server error" });
      } else {
        if (!userStored) {
          res.status(404).send({ message: "User not found" });
        } else {
          res.status(200).send({
            accessToken: jwt.createAccessToken(userStored),
            refresToken: refreshToken,
            message: "User founded"
          });
        }
      }
    });
  }
};

module.exports = {
  refreshAccessToken
};

const jwt = require("jwt-simple");
const moment = require("moment");
const SECRET_KEY = "87yte639203e892D6HR#89473AjhR987512kdfsDFGQPA";

exports.ensureAuth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).send({
      message: "The request does not contain the autentication header"
    });
  }

  const token = req.headers.authorization.replace(/['"]+/g, "");
  try {
    var payload = jwt.decode(token, SECRET_KEY);
    if (payload.exp <= moment.unix()) {
      return res.status(404).send({ message: "Token has expired" });
    }
  } catch (error) {
    //   console.log(error);
    return res.status(404).send({ message: "Invalid token" });
  }

  req.user = payload;
  next();
};
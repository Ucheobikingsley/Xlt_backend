const jwt = require("jsonwebtoken");
const { stringify } = require("querystring");
const fetch = require("node-fetch");
const { ErrorHandler } = require("../utils/baseError");
require("dotenv");

const ignoredRoutes = ["/user", "/categories", "/login"];
const authorizedToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (ignoredRoutes.includes(req.path)) {
    return next();
  }
  console.log(req.body.captcha);
  console.log(process.env.NODE_ENV);
  if (req.method == "post" && process.env.NODE_ENV == "production") {
    if (!req.body.captcha) {
      return res.status(401).send({
        success: false,
        message: "Empty Captcha"
      });
    }
    const secretKey = "6LfTwY8dAAAAAHzE6YDZin88DhM27a6AhgQGt9Z7";
    const query = stringify({
      secret: secretKey,
      response: req.body.captcha,
      remoteip: req.connection.remoteAddress
    });

    const verifyURL = `https://google.com/recaptcha/api/siteverify?${query}`;

    const body = await fetch(verifyURL).then(res => res.json());
    console.log(body);
    if (!body.success) {
      return res.status(401).send({
        success: false,
        message: "Failed Captcha Verification"
      });
    }
  }
  if (token == null)
    return res.status(401).send({
      success: false,
      message: "You are Unauthorized"
    });
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userToken) => {
    if (err)
      return res.status(403).send({
        success: false,
        message: "An occured while logging you in..."
      });
    req.user = userToken;
    next();
  });
};

module.exports = { authorizedToken };

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const sequelize = require("../config/database/connection");
const User = require("../models").user;
const Token = require("../models").token;
const { responseLog } = require("../utils/responseLog");
const { ErrorHandler } = require("../utils/baseError");
const { randomString } = require("../libaries/helpers");
const Notification = require("../notifications/notification");

const currentDate = new Date();
const saltRounds = 10;

let newRandomString;

exports.userRegistration = async (req, res, next) => {
  sequelize.transaction(async t => {
    try {
      const data = req.body;
      const minutesToAdd = 10;
      const futureDate = new Date();
      futureDate.setMinutes(futureDate.getMinutes() + 5);
      const salt = await bcrypt.genSalt(saltRounds);
      const hashPassword = await bcrypt.hash(data.password, salt);
      if (hashPassword) {
        const password = hashPassword;
        const saveToken = await Token.create({
          code: (newRandomString = randomString(5)),
          expireDate: futureDate
        });
        if (saveToken) {
          const user = await User.create(
            { ...data, password },
            { transaction: t }
          );
          if (!user) throw new ErrorHandler(400, "could not save user");

          const accessToken = jwt.sign(
            user.dataValues,
            process.env.ACCESS_TOKEN_SECRET
          );
          console.log(user.dataValues);
          console.log(`Access Token --> ${accessToken}`);
          if (accessToken) {
            Notification.verificationToken({
              email: data.email,
              token: newRandomString
            });
            return responseLog(res, accessToken, "Data Saved", "success");
          }
          next();
        }
        throw new ErrorHandler(400, "could not saveToken");
      }
      throw new ErrorHandler(400, "Could Not Hash Password");
    } catch (error) {
      t.rollback();
      next(error);
    }
  });
};

exports.verifyToken = async (req, res) => {
  try {
    const data = req.body;
    const date = new Date();
    console.log(date);
    await Token.destroy({
      where: {
        expireDate: {
          [Op.lt]: date
        }
      }
    });

    console.log(req.user);
    const findUserId = await User.findOne({
      where: {
        id: req.user.id
      }
    });
    if (!findUserId) {
      throw new ErrorHandler(400, "User not found");
    }

    const verifyCode = await Token.findOne({
      where: {
        code: data.otpToken
      }
    });
    if (!verifyCode) {
      return res.status(400).send({
        success: false,
        message:
          "Verification Code expired, Please request for a new Verification Code"
      });
    }
    await User.update(
      {
        isVerified: true
      },
      {
        where: {
          id: req.user.id
        }
      }
    );
    res.status(200).send({
      success: true,
      message: "Valid Verification Code...Registration Successful"
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message
    });
  }
};

exports.default = async (req, res) => {
  const userData = await User.findOne({
    where: {}
  });
};

exports.requestNewOtp = async (req, res, next) => {
  try {
    const minutesToAdd = 4;
    const futureDate = new Date(currentDate.getTime() + minutesToAdd * 60000);
    const saveToken = await Token.create({
      code: (newRandomString = randomString(5)),
      expireDate: futureDate
    });

    if (saveToken) {
      Notification.verificationToken({
        email: req.user.email,
        token: newRandomString
      });

      return responseLog(res, "Token Generated", "success");
    }

    throw new ErrorHandler(400, "Could Not Generate Token");
  } catch (error) {
    next(error);
  }
};

exports.signIn = async (req, res, next) => {
  sequelize.transaction(async t => {
    try {
      const { email, password } = req.body;
      const userData = await User.findOne({
        where: {
          email
        }
      });

      if (!userData) {
        throw new ErrorHandler(400, "User not found");
      }

      const userPassword = await bcrypt.compare(password, userData.password);
      if (!userPassword) {
        throw new ErrorHandler(400, "Incorrect Password");
      }
      const accessToken = jwt.sign(
        userData.dataValues,
        process.env.ACCESS_TOKEN_SECRET
      );
      console.log(accessToken);
      return responseLog(res, accessToken, "User Validated", "success");
    } catch (error) {
      next(error);
    }
  });
};

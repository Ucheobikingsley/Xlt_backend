const sequelize = require("../config/database/connection");
const Categories = require("../models").categories;
const { responseLog } = require("../utils/responseLog");

exports.getAllCategories = async (req, res, next) => {
  try {
    const data = await Categories.findAll();
    return responseLog(res, data, "all data", true);
  } catch (error) {
    next(error);
  }
};

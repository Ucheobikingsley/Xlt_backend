const africanCountriesAPI = require("@babajidemm/african-countries-api");
const { country } = require("../models");
const { responseLog } = require("../utils/responseLog");

exports.getAllCountry = async (req, res, next) => {
  try {
    // const allData = await country.findAll();
    // return responseLog(res, allData, "Data Saved", "success");
    const countriesByName = africanCountriesAPI.all();

    return responseLog(
      res,
      JSON.parse(String(countriesByName.body)),
      "Data Saved",
      "success"
    );
  } catch (e) {
    next(e);
  }
};

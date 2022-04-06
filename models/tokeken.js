const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class tokeken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tokeken.init(
    {
      code: DataTypes.STRING,
      expireDate: DataTypes.DATE,
      isExpired: DataTypes.BOOLEAN
    },
    {
      sequelize,
      modelName: "token"
    }
  );
  return tokeken;
};

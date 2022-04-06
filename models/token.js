const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  token.init(
    {
      code: { type: DataTypes.STRING, unique: true },
      expireDate: DataTypes.DATE,
      isExpired: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      sequelize,
      modelName: "token"
    }
  );
  return token;
};

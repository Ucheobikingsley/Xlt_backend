const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  categories.init(
    {
      product_name: DataTypes.STRING,
      product_image: DataTypes.STRING,
      ads: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }
    },
    {
      sequelize,
      modelName: "categories"
    }
  );
  return categories;
};

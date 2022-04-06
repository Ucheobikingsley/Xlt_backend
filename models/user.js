const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: new DataTypes.UUIDV4(),
        primaryKey: true
      },
      name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            msg: "Must be an email format"
          }
        }
      },
      phone: {
        type: DataTypes.STRING
      },
      password: DataTypes.STRING,
      isVerified: DataTypes.BOOLEAN
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["email", "phone"]
        }
      ],
      sequelize,
      modelName: "user"
    }
  );
  return user;
};

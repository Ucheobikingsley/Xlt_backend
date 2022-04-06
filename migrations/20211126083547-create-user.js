module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable("users", {
          id: {
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal("uuid_generate_v4()"),
            allowNull: false
          },
          name: {
            type: Sequelize.STRING
          },
          email: {
            type: Sequelize.STRING,
            unique: "composite"
          },
          phone: {
            type: Sequelize.STRING,
            unique: "composite"
          },
          password: {
            type: Sequelize.STRING
          },
          isVerified: {
            type: Sequelize.BOOLEAN
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
          }
        });
      });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("users");
  }
};

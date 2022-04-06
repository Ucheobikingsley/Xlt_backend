module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("countries", {
      sn: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      country: {
        type: Sequelize.STRING
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("countries");
  }
};

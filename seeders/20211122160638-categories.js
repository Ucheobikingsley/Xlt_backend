module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('categories', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "categories",
      [
        {
          product_name: "Farm Machinery & Equipment",
          product_image: "http://localhost:4000/images/FarmMachinery.png",
          ads: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          product_name: "Seed and Supplement",
          product_image: "http://localhost:4000/images/feeds.png",
          ads: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          product_name: "Lives Stock and Poultry",
          product_image:
            "http://localhost:4000/images/livestock-and-poultry.png",
          ads: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("categories", null, {});
  }
};

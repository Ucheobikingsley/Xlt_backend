require("dotenv").config();

module.exports = {
  apps: [
    {
      name: "XLT_BACKEND",
      script: "./server.js",
      watch: true,
      env: {
        NODE_ENV: process.env.NODE_ENV
      },
      ignore_watch: ["node_modules", "uploads"],
      watch_options: {
        followSymlinks: false
      }
    }
  ]
};

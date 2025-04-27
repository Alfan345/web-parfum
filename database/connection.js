const knex = require("knex");

const db = knex({
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST || "webparfum-server.mysql.database.azure.com",
    user: process.env.DB_USER || "czevyehtxx",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "webparfum-database",
  },
  pool: {
    min: 2,
    max: 10,
  },
});

module.exports = db;

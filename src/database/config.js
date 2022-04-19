module.exports = {
  development: {
    username: "postgres",
    password: "123123",
    database: "PORTFOLIO_DB",
    host: "127.0.0.1",
    port: 5433,
    dialect: "postgres",
    dialectOptions: {
      bigNumberStrings: true,
      ssl: false,
    },
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOSTNAME,
    port: process.env.PROD_DB_PORT,
    dialect: "postgres",
    dialectOptions: {
      bigNumberStrings: true,
      ssl: false,
    },
  },
};

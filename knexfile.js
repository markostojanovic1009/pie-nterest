var dotenv = require('dotenv');

dotenv.load();

module.exports = {
  development: {
    client: 'pg',
    debug: true,
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  },

  test: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_TEST_NAME
    },
    migrations: {
      directory: __dirname + '/migrations/test'
    },
    seeds: {
      directory: __dirname + '/seeds/test'
    }
  }
};

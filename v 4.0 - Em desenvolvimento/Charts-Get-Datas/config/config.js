module.exports = {
  dev: {
    username: "root",
    password: "2401",
    database: "enviaDados",
    host: "127.0.0.1",
    dialect: "mysql",
    xuse_env_variable: "DATABASE_URL",
    dialectOptions: {
      options: {
        encrypt: true,
      },
    },
    pool: {
      max: 5,
      min: 1,
      acquire: 5000,
      idle: 30000,
      connectTimeout: 5000,
    },
  },
};

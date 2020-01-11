const config = {
  development: {
    //postgres connection settings
    database: {
      user: '',
      host: '',
      database: '',
      password: '',
      port: 5432,
    },
    ttn: {
      appId: '',
      accessKey: '',
    }
  },
  production: {
  }
};

module.exports = config;
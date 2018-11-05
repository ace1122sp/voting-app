module.exports = {
  app: {
    port: 3000
  },
  db: {
    host: 'localhost',
    port: 27017,
    username: null,
    password: null,
    dbName: 'voting-app-db'
  },
  session: {
    secret: 'figureoutsomesecret'
  }
};
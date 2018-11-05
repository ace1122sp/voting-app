module.exports = {
  app: {
    port: process.env.PORT
  },
  db: {
    host: process.env.PORT,
    port: process.env.PORT,
    username: proces.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    dbName: process.env.DB_NAME
  },
  session: {
    secret: process.env.SESSION_SECRET
  }
}
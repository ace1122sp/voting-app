module.exports = {
  app: {
    port: process.env.PORT
  },
  db: {
    host: process.env.HOST,
    port: process.env.PORT,
    username: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    dbName: process.env.DB_NAME
  },
  session: {
    secret: process.env.SESSION_SECRET
  }
}
export const config = {
  port: 8888,
  bodyLimit: "100kb",
  corsHeaders: ["Link"],
  session_secret: "react-admin",
  db: {
    mysql: {
      host: "localhost",
      user: "root",
      password: "root",
      database: "game",
      connectionLimit: 10
    },
    // mongoose:{

    // },
    redis: {
      port: 6379,
      host: "127.0.0.1",
      db: 0,
      pass: ""
      // ttl: 30
    }
  }
};

export const config = {
  port: 8888,
  bodyLimit: "100kb",
  corsHeaders: ["Link"],
  db: {
    mysql: {
      host: "localhost",
      user: "root",
      password: "root",
      database: "game",
      connectionLimit: 10
    }
    // mongoose:{

    // }
  }
};

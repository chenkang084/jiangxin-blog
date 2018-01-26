export const config = {
  port: 9001,
  debug: false,
  console: true,
  bodyLimit: "100kb",
  corsHeaders: ["Link"],
  session_secret: "react-admin",
  db: {
    mysql: {
      enable: false,
      opts: {
        host: "localhost",
        user: "root",
        password: "root",
        database: "react-admin",
        connectionLimit: 10
      }
    },
    mongoose: {
      enable: false,
      url: "mongodb://127.0.0.1/node_club_dev",
      opts: {
        useMongoClient: true,
        poolSize: 4
      }
    },
    redis: { port: 6379, host: "127.0.0.1", db: 0, pass: "", ttl: 60 * 30 }
  },
  api: {
    // ceph: "http://10.240.217.77/" // 30mins
    ceph: "http://10.240.217.140/"
  }
};

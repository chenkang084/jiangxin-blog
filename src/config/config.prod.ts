export const config = {
  port: 9080,
  debug: true,
  console: false,
  bodyLimit: "100kb",
  corsHeaders: ["Link"],
  session_secret: "react-admin",
  db: {
    enable: false,
    mysql: {
      host: "localhost",
      user: "root",
      password: "root",
      database: "react-admin",
      connectionLimit: 10
    }, // mongoose:{

    // },
    redis: { port: 6379, host: "127.0.0.1", db: 0, pass: "", ttl: 60 * 30 }
  },
  components: {
    // ceph: "http://10.240.217.77/" // 30mins
    ceph: "http://10.240.217.140/"
  }
};

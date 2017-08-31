const sqls = {
  // auth
  auth_queryUser: "select * from user where user_name=? and user_pwd=?",

  // userMgmt
  userMgmt_getAllUsers:
    "SELECT id, user_name AS username, DATE_FORMAT( update_time, '%Y-%m-%d %h:%i:%s' ) AS time, CASE WHEN type = 1 THEN 'admin' ELSE 'ordinary' END AS type FROM USER",
  userMgmt_addUser:
    "INSERT INTO user (user_name,user_pwd,type,create_time) VALUES (?,?,?,NOW())"
};

export default sqls;

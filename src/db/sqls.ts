const sqls = {
  // auth
  auth_queryUser: "select * from user where user_name=?",

  // userMgmt
  userMgmt_getAllUsers:
    "SELECT id, user_name AS username, DATE_FORMAT( update_time, '%Y-%m-%d %h:%i:%s' ) AS time, CASE WHEN type = 10 THEN 'admin' ELSE 'ordinary' END AS type FROM user",
  userMgmt_addUser:
    "INSERT INTO user (user_name,user_pwd,type,create_time) VALUES (?,?,?,NOW())",
  userMgmt_deleteUserById: "DELETE FROM user WHERE ID = ?",
  userMgmt_queryUserById:
    "SELECT CAST(type AS CHAR(2)) as type,user_name,user_pwd,id from user WHERE id = ?",
  userMgmt_updateUser:
    "update user SET user_name =?,user_pwd=?,type=?,update_time=now() WHERE id=?",

  // artile
  article_getByTitle: "SELECT id FROM article WHERE title =?",
  article_getById: "SELECT * FROM article WHERE id =?",
  article_delById: "DELETE FROM article WHERE id =?",
  article_update:
    "UPDATE article SET abstract = ? ,update_time = now() WHERE id = ?",
  article_insert:
    "INSERT into article (title,abstract,create_time,update_time,author,cover_img) values (?,?,now(),now(),?,?)",
  article_list: "SELECT * from article order by update_time DESC"
};

export default sqls;

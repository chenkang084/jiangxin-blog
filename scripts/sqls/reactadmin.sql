/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 50528
Source Host           : localhost:3306
Source Database       : reactadmin

Target Server Type    : MYSQL
Target Server Version : 50528
File Encoding         : 65001

Date: 2018-02-23 19:48:31
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `article`
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `title` varchar(64) NOT NULL,
  `abstract` varchar(256) NOT NULL,
  `cover_img` varchar(256) NOT NULL,
  `create_time` datetime NOT NULL,
  `update_time` datetime NOT NULL,
  `author` varchar(64) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES ('21', '懒癌晚期不想做饭饿了怎么办？一个电饭煲搞定', '一个月总有那么几天什么都不想做，就只想瘫在床上。那时候最远的距离不是生与死，而是卫生间和床。胖编倒是还好，一个月只有二十八天是这样的状态。\n\n    作为懒癌晚期无药可治患者，要不是因为贫穷，我想我就要这样和我的床长相厮守不离不弃片刻不离到山无棱、天地合了。', 'http://mmbiz.qpic.cn/mmbiz_jpg/czx0Yv7ibvaOB1DvicVza0m413lojXB8QtU1cYsrGgGzgIeP6Mfiaj3qjTEnbPaz24FxuRdiabgljfBrwBw5IbYVJg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1', '2018-02-18 14:08:32', '2018-02-18 14:08:32', '酱辛小厨');
INSERT INTO `article` VALUES ('22', '腊八光有粥没有小菜怎么行', '小孩小孩你别馋，过了腊八就是年。今天是腊八节，想必大家都要喝一碗热气腾腾的腊八粥。当然，胖编并不太会熬粥，因为不喜欢喝粥。偶尔喝粥也是加肉加皮蛋加猪油的咸粥。让我喝一碗红枣啊绿豆啊什么的甜粥，我会选择狗带。\n\n    如果要喝粥的话，一款香香辣辣脆脆爽爽的小菜真是必不可少，今天和大家分享的就是一道下粥小菜——香辣脆爽萝卜。', 'https://mmbiz.qpic.cn/mmbiz_jpg/czx0Yv7ibvaMddq97dbbFbtazmDibPPPBotTwQ2liaiberZCIljLiaqlTyULEQLvzTRODhDqsmjmUcQqLNic0tESjAEw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1', '2018-02-23 16:02:29', '2018-02-23 16:02:29', '酱辛小厨');
INSERT INTO `article` VALUES ('23', '一口菜下两碗饭，说的就是这种下饭神菜', '今天和大家分享的美食是回锅肉，回锅肉作为川菜中的代表菜之一，一直深受广大人士的喜爱。胖编多年以来也是深深拜倒在回锅肉的石榴裙下，奉献上了自己的八块腹肌，换回了一肚子的五花肉。', 'https://mmbiz.qpic.cn/mmbiz_jpg/czx0Yv7ibvaPJfHhuAD161XzjEWQYYKU2ypFU8V8CMBL3B6AmpvDejOeBjTh1KZKyicoJ1ohyAXBsDdyibCwJjowg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1', '2018-02-23 16:09:02', '2018-02-23 16:09:02', '酱辛小厨');

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(64) NOT NULL,
  `user_pwd` varchar(128) NOT NULL,
  `type` tinyint(1) DEFAULT '0' COMMENT '0:ordinary user;1:admin user',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('71', 'a', '$2a$10$/wePSswi9axxDbU.p.gIueWdJ2rKdZJjieXaN8pV.qLgmzLJR/zdq', '1', '2018-01-31 23:47:14', '2018-01-31 23:47:14');
INSERT INTO `user` VALUES ('72', 'c', '$2a$10$5ckmLT/li2u0J2XxOat08emc/68x7qTkVG1LDPocAU8r0jKjlHEYu', '10', '2017-09-20 14:12:16', null);
INSERT INTO `user` VALUES ('75', 'cc', '$2a$10$D8aYoT5RZMYXcpmVHCkq6.uThZHioKXCiewQQUcLx6tzUoPOTSocW', '10', '2017-10-09 16:23:53', '2017-10-09 16:23:53');
INSERT INTO `user` VALUES ('76', 'xx', '$2a$10$kVBS6gtFbzwncvObD0ETQux0Kstlm2fuRI0Bs9aKgdaL7qy93z80u', '0', '2017-09-28 16:07:05', null);
INSERT INTO `user` VALUES ('77', 'chenkang', '$2a$10$c5rgXK14uTdul578aoRMe.olK1aSS2N7dJPFWexHQ5ty0KS5dgGSK', '1', '2017-12-22 11:26:40', null);
INSERT INTO `user` VALUES ('78', 'a', '$2a$10$4cx499s9wzNYD1RfMJdLWuov0PiztS4Dcfird1B4IBWrm/JV9dqiq', '1', '2018-02-01 13:37:31', null);

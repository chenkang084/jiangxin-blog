# ts-express
A nodejs backend framework based on express and writes via typescript.

## setup your local environment
>   npm run setup <br>
    npm start 

open your browser and input localhost:8888 ,you will see the html page

## scripts
`npm run generator` <br>
the script can generator xx.router.ts,xx.controller.ts,xx.service.ts in the specified path ,and auto import/export 


## about docker

- **build docker image** : `docker build -t jiangxin .`  
- **create and start container** : `docker run --name jx -d -t -p 9001:9001 -v /usr/src/kang/:/app jiangxin`  
- **access to container** : `docker exec -ti jx /bin/bash`  
- **export image** : `docker save -o XXXname.tar jiangxin`  
- **import image** : `docker load --input XXXname.tar`  
- **export container** : `docker export jx > XXXname.tar`  
- **import container** : `docker import XXXname.tar`  
- **run import container** : `docker run --name jx -d -t -p 9001:9001 -v /usr/src/kang/:/app jiangxin /bin/bash`  
-- **rename container** : `docker rename oldname newname`
-- **rename image** : `docker tag oldname newname`

> 关于导入container之后，mysql无法连接，`Can't connect to local MySQL server through socket '/var/run/mysqld/mysqld.sock'`的解决方法：
1.`chmod -R 777 /var/lib/mysql`  
2.`/etc/init.d/mysql restart`  

## crontab
crontab 是linux中，定时执行任务的程序。  
```
Usage:
 crontab [options] file
 crontab [options]
 crontab -n [hostname]

Options:
 -u <user>  define user
 -e         edit user's crontab
 -l         list user's crontab
 -r         delete user's crontab
 -i         prompt before deleting
 -n <host>  set host in cluster to run users' crontabs
 -c         get host in cluster to run users' crontabs
 -s         selinux context
 -x <mask>  enable debugging
```
在ubuntu中使用crontab，如果没有安装crontab，需要先安装
```
apt-get install cron

service cron start
```

## session,cookie,redis
- **session**:session是保存到服务器端的key,value形式的存储，在本文使用redis，可以将session中保存的key，value形式的数据保存到redis中，即使是服务器临时宕机，重启之后，之前保存的session信息也不会丢失。
- **cookie**：是保存在client端的key，value数据。
- 在后台启动redis-server：`redis-server --daemonize yes`

## mysql 相关问题
- **中文乱码**:进入数据库，执行`show variables like "char%"`查看字符编码,发现 latin1
```
character_set_database latin1 
character_set_server latin1 
```
解决办法如下：
> 1.修改mysql配置文件，/etc/mysql/my.cnf,如果没有该文件，查看是否存在`/etc/mysql/mysql.conf.d/mysqld.cnf`,如果有，请对应添加如下配置：
```
[client]下 

default-character-set=utf8 

[mysqld] 

default-storage-engine=INNODB 

character-set-server=utf8 

collation-server=utf8_general_ci 
```
2、重启mysql服务`/etc/init.d/mysql restart`  
3、重新执行对应sql脚本，如`mysql -uroot -p reactAdmin < reactadmin.sql`
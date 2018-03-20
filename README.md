# jiangxin-blog

jiangxin-blog shares lots of delish foods,and waits for you tries.  
The sourcecode depends that nodejs backend framework based on express and writes via typescript.

## docker

linux:`./scripts/shell/dockerEnv.sh`

## setup your local environment

> npm run setup <br>

    npm start

open your browser and input localhost:8888 ,you will see the html page

## scripts

`npm run generator` <br>
the script can generator xx.router.ts,xx.controller.ts,xx.service.ts in the specified path ,and auto import/export

## about docker

* **build docker image** : `docker build -t jiangxin .`
* **create and start container** : `docker run --name jx -d -t -p 9001:9001 -v /usr/src/kang/:/app jiangxin`
* **access to container** : `docker exec -ti jx /bin/bash`
* **export image** : `docker save -o XXXname.tar jiangxin`
* **import image** : `docker load --input XXXname.tar`
* **export container** : `docker export jx > XXXname.tar`
* **import container** : `docker import XXXname.tar`
* **run import container** : `docker run --name jx -d -t -p 9001:9001 -v /usr/src/kang/:/app jiangxin /bin/bash`  
  -- **rename container** : `docker rename oldname newname`
  -- **rename image** : `docker tag oldname newname`

> 关于导入 container 之后，mysql 无法连接，`Can't connect to local MySQL server through socket '/var/run/mysqld/mysqld.sock'`的解决方法： 1.`chmod -R 777 /var/lib/mysql`  
> 2.`/etc/init.d/mysql restart`

## crontab

crontab 是 linux 中，定时执行任务的程序。

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

在 ubuntu 中使用 crontab，如果没有安装 crontab，需要先安装

```
apt-get install cron

service cron start
```

## session,cookie,redis

* **session**:session 是保存到服务器端的 key,value 形式的存储，在本文使用 redis，可以将 session 中保存的 key，value 形式的数据保存到 redis 中，即使是服务器临时宕机，重启之后，之前保存的 session 信息也不会丢失。
* **cookie**：是保存在 client 端的 key，value 数据。
* 在后台启动 redis-server：`redis-server --daemonize yes`

## mysql 相关问题

* **中文乱码**:进入数据库，执行`show variables like "char%"`查看字符编码,发现 latin1

```
character_set_database latin1
character_set_server latin1
```

解决办法如下：

> 1.修改 mysql 配置文件，/etc/mysql/my.cnf,如果没有该文件，查看是否存在`/etc/mysql/mysql.conf.d/mysqld.cnf`,如果有，请对应添加如下配置：

```
[client]下

default-character-set=utf8

[mysqld]
default-storage-engine=INNODB
character-set-server=utf8
collation-server=utf8_general_ci
```

2、重启 mysql 服务`/etc/init.d/mysql restart`  
3、重新执行对应 sql 脚本，如`mysql -uroot -p reactAdmin < reactadmin.sql`

## nginx

在 centos 上面使用总结：
1、安装 `sudo yum install nginx`  
2、生成网站对应的 https 文件  
>   安装certbot `yum install certbot`  
    生成ssl文件（默认情况，需要先停掉nginx等端口监听服务）`certbot certonly --standalone -d example.com -d www.example.com`    

3、配置 nginx conf

> 为了方便管理，将不同 site 的 nginx 配置，分散到各个文件中，官方默认的配置文件入口在`/etc/nginx/nginx.conf`，如果没有`include /etc/nginx/conf.d/*.conf;`配置，请添加该配置；

    配置server信息：  

    ```
    server {
        listen 443 ssl;
        server_name jx.monkeystar.cn;// 配置二级域名
        ssl on;

        ssl_certificate      /etc/letsencrypt/live/jx.monkeystar.cn/cert.pem;
        ssl_certificate_key /etc/letsencrypt/live/jx.monkeystar.cn/privkey.pem;

        location / {
                proxy_pass http://localhost:9001;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
        }
    }
    ```

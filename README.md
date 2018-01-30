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
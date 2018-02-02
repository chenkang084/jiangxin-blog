path=`pwd`app/ts-express

echo $path
cd ${path}

chmod -R 777 /var/lib/mysql
/etc/init.d/mysql restart
redis-server --daemonize yes

npm run prod

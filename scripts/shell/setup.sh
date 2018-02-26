echo '=============start to setup env==============='

apt-get update

echo '=============install mysql==============='

# Install MySQL Server in a Non-Interactive mode. Default root password will be "root"
echo "mysql-server-5.7 mysql-server/root_password password root" | debconf-set-selections
echo "mysql-server-5.7 mysql-server/root_password_again password root" | debconf-set-selections
apt-get -y install mysql-server-5.7

echo '=============change mysql encode to utf8==============='
node ./changeMysqlEncode.js
chmod -R 777 /var/lib/mysql
/etc/init.d/mysql restart

echo '=============execute mysql script==============='
mysql -uroot -proot < ../sqls/createDb.sql
mysql -uroot -proot reactAdmin < ../sqls/reactadmin.sql

echo '=============start redis server==============='
redis-server --daemonize yes
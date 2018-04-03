path=`pwd`

echo "===========start to build jx images by dockerfile==============="
docker build -t jx $path

echo "===========create conatiner==============="

docker rm jx -f
docker run --name jx -d -t -p 9001:9001 -v $path:/app jx
# docker run --name jx -d -t -p 9001:9001 jiangxin

echo "===========start to build jx images by dockerfile==============="
docker exec -ti jx /bin/bash /app/scripts/shell/setup.sh

echo "congratulations,you docker env setup successfully!"


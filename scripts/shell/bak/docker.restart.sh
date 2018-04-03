#!/bin/bash
# kill dockerd progress

echo "kill dockerd progress"
ps aux | grep "dockerd" | grep -v grep
dockerpids=$(ps aux | grep "dockerd" | grep -v grep | cut -c10-15)

for dockerpid in ${dockerpids[@]};
do
echo "Stopping PID :"$dockerpid
kill -9 $dockerpid
done
echo "Done"

# start docker
sleep 2 #2s
docker start jx

echo "============kill nodejs===================="
# sleep 2 #2s
docker exec jx /bin/bash app/ts-express/scripts/shell/js_service.restart.sh

echo "============start mysql,redis=============="
sleep 2 #2s
docker exec jx /bin/bash app/ts-express/scripts/shell/start.sh



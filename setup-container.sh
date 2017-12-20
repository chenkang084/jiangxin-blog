#!/bin/bash

containers=( admin-ui-kang admin-ui-dan )
ports=(4000 5000)

# delete container
printf "remove all admin-ui-* container \n"
docker rm $(docker ps -a -q --filter="name=admin-ui-") --force

# create container
for ((i = 0; i < ${#containers[@]}; ++i)); do
    printf "create container %s\n" "${containers[$i]}"
    docker run --name ${containers[$i]} -d -t -p ${ports[$i]}:8888 ts 
done
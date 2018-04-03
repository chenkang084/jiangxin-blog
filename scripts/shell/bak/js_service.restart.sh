#!/bin/bash
echo "The following node processes were found:"
ps aux | grep "node" | grep -v grep
nodepids=$(ps aux | grep "node" | grep -v grep | cut -c10-15)

echo "OK, so we will stop these process/es now..."

for nodepid in ${nodepids[@]};
do
echo "Stopping PID :"$nodepid
kill -9 $nodepid
done
echo "Done"

path=`pwd`app/ts-express

echo $path
cd ${path}
# npm run prod

time=`date "+%Y-%m-%d %H:%M:%S"` 
echo ${path}"/scripts/shell/log.txt"
echo $time" restart node server" >> ${path}"/scripts/shell/log.txt"


#!/usr/bin/env bash

echo "Warmup sequence"

for i in `seq 1 5`;
do
  yarn test:log
done

echo "Make sure the allocation timeline is recording!"
echo "Pausing for 5 seconds"

sleep 5s

echo "Telling the server to do console.log output"

for i in `seq 1 10`;
do
  yarn test:log
done

echo "Pausing for 2 seconds"

sleep 2s

echo "Telling the server to do no console output"

for i in `seq 1 10`;
do
  yarn test:no-log
done

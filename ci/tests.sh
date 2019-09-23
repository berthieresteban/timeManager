#!/bin/bash

set -e

docker-compose -f ./docker-compose.yml up -d

printf '\nStarting backend\n'

# Ugly hack to check if backend started  / Need to change with a custom route 
until curl --output /dev/null --silent --fail -d '{"auth": { "username": "lol", "password": "lol"}}' -H "Content-Type: application/json" -X POST http://localhost:4000/auth; do
  printf '.'
  sleep 5
done

echo -e "\n API started!"
#!/bin/bash
apiHost="localhost"
apiPort="4000"




set -e


echo
echo " ### TimeManager Lanch API###"
echo "     ==============================="
echo

docker-compose -f ./docker-compose.yml up -d

echo " Waiting for App to be up at http://localhost:4000"
echo

# Ugly hack to check if backend started  / Need to change with a custom route 
until curl --output /dev/null --silent --fail -d '{"auth": { "username": "lol", "password": "lol"}}' -H "Content-Type: application/json" -X POST http://localhost:4000/auth; do
  printf '.'
  sleep 5
done

echo -e "\n API started!"
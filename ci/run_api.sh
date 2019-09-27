#!/bin/bash
apiHost="localhost"
apiPort="4000"




set -e

docker-compose -f ./docker-compose.yml up -d

echo
echo " ### TimeManager Api tests ###"
echo "     ==============================="
echo

echo " Waiting for App to be up at http://$appHost:$appPort"
echo

# Ugly hack to check if backend started  / Need to change with a custom route 
until curl --output /dev/null --silent --fail -d '{"auth": { "username": "lol", "password": "lol"}}' -H "Content-Type: application/json" -X POST http://$appHost:$appPort/auth; do
  printf '.'
  sleep 5
done

echo -e "\n API started!"
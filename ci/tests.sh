#!/bin/bash

set -e

docker-compose -f ./docker-compose.yml up -d

printf '\nStarting backend\n'

until curl --output /dev/null --silent --head --fail http://localhost:4000/api/users; do
  printf '.'
  sleep 5
done

echo -e "\n API started!"
#!/bin/bash

appHost="localhost"
appPort="8080"

echo
echo " ### TimeManager App End to End tests ###"
echo "     ==============================="
echo

set -e

npm run serve --prefix ./frontend

echo " Waiting for App to be up at http://$appHost:$appPort"
echo
while ! curl -f -s -o /dev/null "http://$appHost:$appPort"
do
    echo -ne ". "
    sleep 5
done
echo -ne " Let's go!"
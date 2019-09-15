#!/bin/bash

displayHello() {
    printf "#\tTimeManager API testing script. JL 2019\n"
    printf "#\n#\n#\tStarting...\n#\n"
}

## NEWMAN FUNCTIONS ##
checkNewMan() {
    printf "#\tChecking newman\n"
    HAS_NEWMAN=$(command -v newman)
    HAS_NPM=$(command -v npm)
    if [ -z "$HAS_NEWMAN" ]; then
        printf "#\tNewman not found, installing...\n"
        if [ -z "$HAS_NPM" ]; then
            printf "! NPM not found.. can't install\n"
            printf "! Stopping tests\n#\n#\n#"
            exit 1
        else
            npm install -g newman
        fi
    else
        printf "#\tNewman found in $HAS_NEWMAN\n"
    fi
    #if [ ! -f ""]
}

runNewman() {
    newman run ./api/test/API-tests.postman_collection.json
}

## MAIN FUNCTION ##
main() {
    printf "#\n#\n#\n"
    displayHello
    checkNewMan
    runNewman
    printf "#\n#\n#\n"
}
main
##
## EPITECH PROJECT, 2019
## Makefile
## Julien Legay
##

build:
		sudo docker-compose build

run:
		sudo docker-compose up

build-api:
		sudo docker-compose build api

run-api:
		sudo docker-compose up api

build-front:
		sudo docker-image up front

run-front:
		sudo docker-compose up front

test:
	./api/test/test_api.sh

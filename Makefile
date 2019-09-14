##
## EPITECH PROJECT, 2019
## Makefile
## Julien Legay
##

build:
	sudo docker-compose build

run:
	sudo docker-compose up

api:
	cd ./api
	mix phx.server

front:
	cd ./frontend
	npm run server

test:
	./api/test/test_api.sh

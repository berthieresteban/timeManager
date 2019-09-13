#
# ./Dockefile
# EPITECH 2019 - TimeManager - Project
#

#FROM NODEJS
FROM node:11.1-alpine 
# install simple http server for serving static content
#RUN npm install -g http-server

# make the 'app' folder the current working directory
WORKDIR /frontend

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN apk add --no-cache git
RUN npm install
# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# build app for production with minification OFF
#RUN npm run build
#
#EXPOSE 8080
#CMD [ "http-server", "dist" ]

CMD ["npm", "run", "serve"]
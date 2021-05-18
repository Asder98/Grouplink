# pull official base image
FROM node:15.11.0-alpine3.10

# set working directory
WORKDIR /usr/src/app

# add `/usr/src/app/app/node_modules/.bin` to $PATH
# ENV PATH /usr/src/app/app/node_modules/.bin:$PATH

# install app dependencies
COPY package*.json ./
# COPY package-lock.json ./
RUN npm install 
# --silent
# add app
COPY . ./

# start app
CMD ["npm", "start"]
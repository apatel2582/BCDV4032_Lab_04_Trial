# Use Node.js version 16 as the base image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Install system dependencies required by your application
# Alpine uses apk as its package manager
RUN apk update && apk upgrade
RUN apk add --no-cache bash git openssh

# Copy the package.json and package-lock.json files into the container
COPY package.json .
COPY package-lock.json* .

RUN npm install -g npm-check-updates
RUN ncu -u

# Install the npm dependencies defined in package.json
# If there's no package-lock.json, it will just use package.json
RUN npm install --production

# Copy the rest of your application's code into the container
COPY . .

# set the default command
CMD ["npm","run","start-prod"]

# Expose the port the app runs on
EXPOSE 4000



# Dockerfile for React client

# Build react client
	
FROM node:16

# Working directory be app
WORKDIR /app

COPY package*.json ./

###  Installing dependencies

RUN yarn

# copy local files to app folder
COPY . .

EXPOSE 5656

CMD ["yarn","dev"]
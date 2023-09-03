#  Dockerfile for Node Express Backend

	
FROM node:16

# Create App Directory
RUN mkdir -p /app
WORKDIR /app

# Install Dependencies
COPY package*.json ./

RUN yarn

# Copy app source code
COPY . .

# Exports
EXPOSE 8787

CMD ["yarn","dev"]
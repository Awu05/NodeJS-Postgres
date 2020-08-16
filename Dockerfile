FROM node:12

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json /app/
RUN npm install

# Bundle app source
COPY . /app/

# Expose port that app uses
EXPOSE 3000

# Define the command to run your app
CMD node index.js
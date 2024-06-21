# Use the official Node.js 14 image as the base image
FROM node:21

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

COPY tsconfig.json ./

# Copy the source code to the working directory
COPY ./src ./src

# Expose the port on which the NestJS application will run
EXPOSE 3001

# Start the NestJS application
CMD ["npm", "run", "start"]
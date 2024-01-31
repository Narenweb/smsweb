# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Copy the rest of the application code to the working directory
COPY . .

# Install app dependencies
RUN npm install

# Build the Next.js application
RUN npm run build

# Expose the port that your Next.js app will run on
EXPOSE 3000

# Command to run your application
CMD ["npm", "start"]

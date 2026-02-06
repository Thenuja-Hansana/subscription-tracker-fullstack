# Use the official Node.js image with the latest version
FROM node:24-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json first to leverage Docker's caching mechanism
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on (matching our .env PORT)
EXPOSE 5000

# Start the application
CMD ["npm", "start"]

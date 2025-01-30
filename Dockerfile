# FROM node:16-alpine
# WORKDIR /usr/src/app
# COPY ./package.json ./
# COPY ./package-lock.json ./
# RUN npm install
# Run npm run build
# COPY ./dist ./dist
# COPY ./.env ./

# # Start the application using the built files
# FROM node:16-alpine

# # Set the working directory
# WORKDIR /usr/src/app

# # Copy package files and install dependencies
# COPY package.json package-lock.json ./
# RUN npm install

# # Copy source files before running the build
# COPY ./dist ./
# RUN npm run build

# # Copy only the necessary files for running the app
# COPY .env ./

# # Start the application using the built files
# CMD ["npm", "start"]


# Use Node.js base image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the entire project (including TypeScript source files)
COPY . ./

# Run the TypeScript build to generate the dist/ folder
RUN npm run build

# Copy only necessary environment variables
COPY .env ./

# Start the application using the built JavaScript files
CMD ["node", "dist/src/index.js"]


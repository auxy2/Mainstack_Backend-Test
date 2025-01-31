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


FROM node:16-alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm install

COPY . ./

RUN npm run build

COPY .env ./

CMD ["node", "dist/index.js"]


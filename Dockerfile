#base image
FROM node:18-alpine

#set working directory to /app
WORKDIR /app

#copy pacakge.json and package-lock.json
COPY package*.json ./

#install dependecies
RUN npm ci

#copy the rest of code
COPY . .

#build the application
RUN npm run build

#expose the port the app runs on
EXPOSE 3000

#command to run the app
CMD ["npm", "start"]
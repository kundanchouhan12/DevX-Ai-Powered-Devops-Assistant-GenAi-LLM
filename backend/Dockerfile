FROM node:18-alpine

WORKDIR /app

# Install bash & git (needed for cloneRepo)
RUN apk add --no-cache bash git curl

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy backend code
COPY . .

# Expose backend port
EXPOSE 5000

# Start backend
CMD ["node", "server.js"]

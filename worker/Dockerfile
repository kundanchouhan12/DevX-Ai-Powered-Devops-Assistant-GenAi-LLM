FROM node:18-alpine

WORKDIR /app

# Install bash & git
RUN apk add --no-cache bash git curl

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy worker code
COPY . .

# Wait for Redis, then run worker
COPY wait-for-it.sh ./wait-for-it.sh
RUN chmod +x ./wait-for-it.sh

CMD ["./wait-for-it.sh", "redis:6379", "--", "node", "repoWorker.js"]

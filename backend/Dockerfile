FROM node:20-alpine

WORKDIR /app

# Copy root package.json
COPY package.json ./

# Install dependencies
RUN npm install

# Copy backend code
COPY backend/ .

# Expose port
EXPOSE 3000

# Start app
CMD ["node", "index.js"]

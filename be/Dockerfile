# be/Dockerfile
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies
# COPY package*.json ./
# RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port (adjust if your app uses a different port)
EXPOSE 3333

# Start the application
CMD ["node", "ace", "serve", "-w"]

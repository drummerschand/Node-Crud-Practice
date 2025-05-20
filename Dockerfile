# Use the full Node.js image with build tools (not Alpine)
FROM node:20.16.0

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose port your app listens on
EXPOSE 3000

# Set environment variable if needed (for dev vs prod)
ENV NODE_ENV=development

# Start the app using nodemon
CMD ["npm", "start"]
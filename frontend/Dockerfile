# Step 1: Use Node.js image as the base image for building the app
FROM node:18 AS build

# Step 2: Set working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Run Vite build command for production
RUN npm run build

# Step 7: Use a lighter Nginx image to serve the built app
FROM nginx:alpine

# Step 8: Copy the built app from the build stage to Nginx public directory
COPY --from=build /app/dist /usr/share/nginx/html

# Step 9: Expose port 80 to serve the app
EXPOSE 5173

# Step 10: Run Nginx to serve the app
CMD ["nginx", "-g", "daemon off;"]

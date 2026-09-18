# ---- Builder Stage ----
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci

# Copy the rest of the source code
COPY . .

# Build the application
RUN npm run build

# ---- Production Stage ----
FROM nginx:stable-alpine

# Copy the built assets from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
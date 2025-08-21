# Étape build
FROM node:20-alpine AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Étape prod
FROM node:20-alpine
WORKDIR /app
COPY --from=build-stage /app ./
EXPOSE 3000
CMD ["npm", "run", "start"]
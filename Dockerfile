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
COPY --from=build-stage /app/.output .output
COPY --from=build-stage /app/node_modules ./node_modules
COPY --from=build-stage /app/package*.json ./
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
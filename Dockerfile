# --- build stage: compile TypeScript -> dist ---
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# --- runtime stage: prod deps + compiled JS only ---
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
# roles.json lives here; mounted as a volume so it survives restarts
RUN mkdir -p data
CMD ["node", "dist/index.js"]

# ========================
# Build Stage
# ========================
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY src ./src
COPY tsconfig.json ./

RUN npm run build

# ========================
# Production Stage
# ========================
FROM node:20-alpine

WORKDIR /app

# Copy build output
COPY --from=builder /app/dist ./dist
COPY package*.json ./

RUN npm install --omit=dev

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "dist/server.js"]

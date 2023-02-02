FROM node:16.14.0 AS builder
WORKDIR /app
COPY /*.json ./
COPY . .
RUN npm run build

FROM node:16.14.0
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3001
CMD ["npm", "run", "start:dev"]

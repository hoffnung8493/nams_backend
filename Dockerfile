# builder stage
FROM node:14.14.0-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
COPY ./src ./src


RUN npm ci -D --quiet 
RUN npm run build
# production stage
FROM node:12.13.0-alpine

WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --quiet --only=production


COPY --from=builder ./app/build ./buildß

CMD ["npm", "run", "start"]




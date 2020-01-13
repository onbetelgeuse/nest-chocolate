### STAGE 1: Build ###

# We label our stage as 'builder'
FROM node:12-alpine as builder

RUN apk --no-cache add g++ gcc libgcc libstdc++ linux-headers make python
RUN npm install --quiet node-gyp -g

ENV NODE_ENV build

USER root
WORKDIR /home/node

COPY . /home/node

RUN npm ci \
    && npm run build

### STAGE 2: Setup ###

FROM node:12-alpine

RUN apk --no-cache add g++ gcc libgcc libstdc++ linux-headers make python
RUN npm install --quiet node-gyp -g

ENV NODE_ENV production

USER root
WORKDIR /home/node

COPY --from=builder /home/node/package*.json /home/node/
COPY --from=builder /home/node/dist/ /home/node/dist/
COPY --from=builder /home/node/environments/ /home/node/environments/
COPY --from=builder /home/node/.ssh/ /root/.ssh/
RUN rm -rf /home/node/.ssh/

RUN npm ci

EXPOSE 3000

CMD ["node", "dist/main.js"]
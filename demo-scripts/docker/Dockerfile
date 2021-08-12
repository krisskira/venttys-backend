FROM ubuntu:latest
RUN apt update && apt install -y docker.io
CMD /bin/bash -c "while true; do sleep 600; done"

RUN apt-get update && apt-get install -y \
  ca-certificates \
  nano \
  curl

ARG NODE_VERSION=14.16.0
ARG NODE_PACKAGE=node-v$NODE_VERSION-linux-x64
ARG NODE_HOME=/opt/$NODE_PACKAGE

ENV NODE_PATH $NODE_HOME/lib/node_modules
ENV PATH $NODE_HOME/bin:$PATH

RUN curl https://nodejs.org/dist/v$NODE_VERSION/$NODE_PACKAGE.tar.gz | tar -xzC /opt/
RUN npm install -g forever
EXPOSE 3000
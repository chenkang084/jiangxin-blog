FROM daocloud.io/ubuntu:16.04

RUN echo "deb http://mirrors.163.com/ubuntu/ xenial main restricted universe multiverse" > /etc/apt/sources.list && \
    echo "deb http://mirrors.163.com/ubuntu/ xenial-security main restricte universe multiverse" >> /etc/apt/sources.list && \
    echo "deb http://mirrors.163.com/ubuntu/ xenial-updates main restricted universe multiverse" >> /etc/apt/sources.list && \
    echo "deb http://mirrors.163.com/ubuntu/ xenial-proposed main restricted universe multiverse" >> /etc/apt/sources.list && \
    echo "deb http://mirrors.163.com/ubuntu/ xenial-backports main restricted universe multiverse" >> /etc/apt/sources.list && \
    echo "deb-src http://mirrors.163.com/ubuntu/ xenial main restricted universe multiverse" >> /etc/apt/sources.list && \
    echo "deb-src http://mirrors.163.com/ubuntu/ xenial-security main restricted universe multiverse" >> /etc/apt/sources.list && \
    echo "deb-src http://mirrors.163.com/ubuntu/ xenial-updates main restricted universe multiverse" >> /etc/apt/sources.list && \
    echo "deb-src http://mirrors.163.com/ubuntu/ xenial-proposed main restricted universe multiverse" >> /etc/apt/sources.list && \
    echo "deb-src http://mirrors.163.com/ubuntu/ xenial-backports main restricted universe multiverse" >> /etc/apt/sources.list


RUN apt-get update \
    && apt-get install -y curl \
    && curl -sL https://deb.nodesource.com/setup_8.x | bash - \
    && apt-get install -y nodejs \
    && apt-get install -y git

RUN apt-get install -y redis-server 

# RUN apt-get install -y mysql-server mysql-client

RUN  rm -rf /var/lib/apt/lists/*
# COPY . /app
WORKDIR /app

RUN npm install --registry=https://registry.npm.taobao.org

# EXPOSE 8000

# CMD ["npm", "start"]  
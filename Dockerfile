FROM daocloud.io/centos

RUN yum -y update \
    && yum -y install epel-release \
    && yum -y update \
    && yum -y install redis \
    && yum -y install -y git \
    && yum -y install wget 

RUN curl --silent --location https://rpm.nodesource.com/setup_8.x | bash - \
    && yum -y install nodejs

# COPY . /app
WORKDIR /app

# RUN npm install --registry=https://registry.npm.taobao.org

# EXPOSE 8000

# CMD ["npm", "start"]  

# docker run --name jx -d -t -p 9005:9001 -v /usr/src/kang/:/app jiangxin
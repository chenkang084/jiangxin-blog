FROM daocloud.io/ubuntu


RUN apt-get update 
RUN apt-get install -y curl \
    && curl https://deb.nodesource.com/setup_6.x | bash - \
    && apt-get install -y nodejs

RUN rm -rf /var/lib/apt/lists/*

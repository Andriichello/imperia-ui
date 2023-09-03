FROM ubuntu:jammy

ARG ENV
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY

# Set up environment for installing packages
RUN export LANG=C.UTF-8 TZ=Etc/UTC && apt-get update

# Install Packages
RUN export LANG=C.UTF-8 \
    && export DEBIAN_FRONTEND=noninteractive \
    && apt-get install --no-install-recommends --yes software-properties-common apt-transport-https \
    && apt-get --yes install gnupg software-properties-common tzdata \
    && add-apt-repository ppa:ondrej/php \
    && apt-get update \
    && apt-get install --yes --allow-unauthenticated --no-install-recommends \
        nginx \
        wget git unzip curl nano dos2unix \
        openssh-client \
        python3-pip \
    && pip3 install -U setuptools \
    && pip3 install awscli \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install nodejs and setup npm
#RUN curl -sL https://deb.nodesource.com/setup_19.x | bash - \
#    && apt-get install -yq nodejs build-essential \
#    && npm install -g npm

# Install nodejs and setup npm
RUN apt-get update && apt-get install -y ca-certificates curl gnupg \
    && curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg \
    && NODE_MAJOR=18 \
    && echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list \
    && apt-get update && apt-get install nodejs -y

# Apply the filesystem overlay, which mainly provides scripts in /opt.
COPY docker /

# Next, we copy the entire project.
COPY . /var/www/imperia-ui

# We begin by creating a workspace where the project will recide.
WORKDIR /var/www/imperia-ui

# install simple http server for serving static content
RUN npm install -g http-server

RUN aws configure set aws_access_key_id ${AWS_ACCESS_KEY_ID} \
    && aws configure set aws_secret_access_key ${AWS_SECRET_ACCESS_KEY} \
    && aws s3 --endpoint-url https://storage.googleapis.com cp s3://imperia-ui-secrets/.env.${ENV} .env

# install project dependencies
RUN npm install

# build app for production with minification
RUN node -v && npm run build

EXPOSE 80

CMD ["/opt/start.sh"]




FROM ubuntu:jammy

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
        nodejs npm nginx \
        wget git unzip curl nano dos2unix \
        openssh-client \
        python3-pip \
    && pip3 install -U setuptools \
    && pip3 install awscli \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*


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
    && aws s3 --endpoint-url https://storage.googleapis.com cp s3://imperia-ui-secrets/.env.staging .env

# install project dependencies
RUN npm install

# build app for production with minification
RUN npm run build

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

COPY ./dist /usr/share/nginx/html

EXPOSE 80

CMD ["/opt/start.sh"]




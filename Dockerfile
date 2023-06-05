FROM ubuntu:jammy

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

# Next, we copy the entire project.
COPY . /var/www/imperia-ui

# We begin by creating a workspace where the project will recide.
WORKDIR /var/www/imperia-ui

# install project dependencies
RUN npm install

EXPOSE 80

CMD ["/opt/start.sh"]




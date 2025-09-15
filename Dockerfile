# Base image (Ubuntu latest)
FROM ubuntu:22.04

# Set non-interactive mode
ENV DEBIAN_FRONTEND=noninteractive

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    git \
    unzip \
    build-essential \
    ruby-full \
    openjdk-17-jdk \
    nodejs \
    npm \
    maven \
    java \
    && rm -rf /var/lib/apt/lists/*
 # Install Jekyll
RUN gem install jekyll bundler

# Create app directory
WORKDIR /usr/src/app

# Copy package files if Node.js project
COPY package*.json ./

# Install dependencies (optional)
RUN npm install || true

# Copy project source
COPY . .

# Port for dev server (Jekyll or Node.js)
EXPOSE 4000
EXPOSE 3000

# Default command (can be overridden)
 CMD ["bash"]
#!/bin/bash

# http server 
export SERVER_PORT=3000
# northwind database
export POSTGRES_DATABASE_HOST="localhost"
export POSTGRES_DATABASE_PORT=5432
export POSTGRES_DATABASE_NAME="northwind"
export POSTGRES_DATABASE_USER="northwind"
export POSTGRES_DATABASE_PASSWORD="northwind"
# southwind database
export MONGO_DATABASE_HOST="localhost"
export MONGO_DATABASE_PORT=27017
export MONGO_DATABASE_NAME="southwind"
export MONGO_DATABASE_USER="southwind"
export MONGO_DATABASE_PASSWORD="southwind"
# rabbitmq
export RABBITMQ_HOST="localhost"
export RABBITMQ_VHOST="southwind"
export RABBITMQ_PORT=5672
export RABBITMQ_USER="southwind"
export RABBITMQ_PASSWORD="southwind"
export RABBITMQ_QUEUE="northwind"

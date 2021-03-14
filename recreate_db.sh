#!/bin/bash

source .env

dropdb "$DB_NAME"
createdb "$DB_NAME"
./manage.py migrate

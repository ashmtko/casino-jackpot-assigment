#!/bin/bash
set -Eeu -o pipefail

# source .env

docker-compose -f docker-compose.yml build
docker-compose -f docker-compose.yml up -d --remove-orphans
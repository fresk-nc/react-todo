#!/bin/bash

mkdir -p data/db
mongod --dbpath data/db 1>/dev/null & DB_PID=$!

npm run start:dev

function close() {
  ECODE=$?
  kill $DB_PID
  exit $ECODE
}

trap close EXIT SIGINT SIGHUP
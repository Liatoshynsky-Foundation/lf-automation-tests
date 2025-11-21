#!/bin/bash

if [ -f .env ]; then
  export $(cat .env | grep -v '^#' | xargs)
fi

k6 run scripts/test-k6.js
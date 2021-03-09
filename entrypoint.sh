#!/bin/sh

npm run migrate up || exit 1
npm run start || exit 1

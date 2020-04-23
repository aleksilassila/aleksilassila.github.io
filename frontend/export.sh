#!/bin/bash

npm run export
cp -r src/out/* .
rm -rf src/out

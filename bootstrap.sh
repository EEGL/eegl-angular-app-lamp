#!/bin/bash

echo "Getting dependencies"

npm install
bower install

echo "Building modernizr"

cd bower_components/modernizr/
npm install
# Prefix classes so it will work with Bootstrap
sed -i '' 's/"classPrefix": "",/"classPrefix": "mdzr-",/g' lib/config-all.json
./bin/modernizr -c lib/config-all.json

cd ../..

echo "All done"

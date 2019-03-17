#!/bin/bash
package='nodemon'
npm list -g | grep -q $package || npm install -g $package
cd server && nodemon --inspect ../server/server.js


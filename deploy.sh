#!/bin/bash
cd /home/pavel/simple_reshet
git pull -f
npm install
pm2 restart server.js --update-env
npm run build
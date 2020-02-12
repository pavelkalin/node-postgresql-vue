#!/bin/bash
cd /home/pavel/simple_reshet
git pull -f
npm install
npm run build
pm2 restart server.js --update-env
sudo service nginx restart

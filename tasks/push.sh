#!/bin/bash
# put it back
cd $1
git add .
git commit -m "initial commit"
git push

# send to heroku
rm .git
git init
git add .
git commit -m "prep"
heroku create
git remote -v
heroku git:remote -a thawing-inlet-61413
git remote rename heroku heroku-staging
git push heroku master
git push heroku testbranch:master

# clean up
cd ..
rm -rf $1

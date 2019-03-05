#!/bin/bash
# put it back
cd $1
git add .
git commit -m "initial commit"
git push

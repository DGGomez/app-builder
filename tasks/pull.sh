#!/bin/bash
# pull from repo to make changes

cd $1
# react or react-native
git clone https://github.com/DGGomez/$2.git

cd $2
git fork

#backend
cd ..
git clone https://github.com/DGGomez/$3.git

#!/bin/bash

git add .
git commit
git push origin $1
git push heroku $1
git status
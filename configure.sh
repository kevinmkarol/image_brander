#!/bin/sh
#Copywrite Kevin M. Karol, February 2016

#Required dependencies - if you know you already have this installed feel free to skip it
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
brew install node
brew install imagemagick

npm install easyimage
npm install canvas
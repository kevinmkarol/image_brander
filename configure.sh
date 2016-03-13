#!/bin/sh
#Copywrite Kevin M. Karol, February 2016

#Required dependencies - if you know you already have this installed feel free to skip it
#For installation on Mac OSX
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
brew install node
brew install imagemagick

npm install easyimage
npm install canvas

#For installation on Ubuntu
#Comment out all above code, and uncomment these commands
#Also, change the name of the module in brander.js to node-canvas instead of canvas
#sudo apt-get install -y libcairo2-dev libjpeg8-dev libpango1.0-dev libgif-dev build-essential g++
#sudo apt-get intall -y imagemagick
#npm install easyimage
#npm install canvas
#cd node_modules
#git clone https://github.com/Automattic/node-canvas.git
#cd node-canvas
#npm install

#Image Brander

![](filter.png)

Lately there has been a lot of buzz around branded Facebook profile pictures and why certain events receive a filter to show support or solidarity (e.g. The Paris Terrorist Attacks) while others do not (e.ge the Beirut bombing).  This simple open source Node application is an attempt to democratize the process, and allow anyone to create a branded proflie picture by batch overlaying a filter onto a folder of images.<br>

This application is designed to be useful for individuals without a technical background.  Non-technical users may run into a few issues with installing dependencies or navigating to the appropriate directory using the command line, but a quick google search should solve most problems.

Note: Currently this application will only work on Macs.  If there is a need for it to be extended to windows, please reach out to me.

##Installing Dependencies
The easiest way to get up and running is to simply run the configure script from the command line:<br>
```
./configure.sh
```
<br>
This will automatically install all dependencies. If you would prefer to do a manual install, the following dependencies are needed:<br>
<li>Node JS
<li>NPM
<li>Imagemagick
<li>npm package: easyimage
<li>npm package: canvas

##Website Image uploader
So that users all over the world can create their own version of your branded image, this tool includes a web app built on node and express that allows file upload and branded image generation over the web.

The code is hosted in the realtime\_webapp folder, and some of it needs to be tweaked for your machine.  In the realtime\_webapp directory open app.js.  Towards the top of the file there is a variable called websiteAddress.  This is the url at which the website will be hosted.  If you are hosting on a Mac you can find out your current ipAddress by running<br>
```
ipconfig getifaddr en1
```

Substitute this in after http:// and save the file.  Then, while in the realtime_webapp folder, from the command line run<br>
```
node app.js
```

If you open a web browser and go to the combine website address and port number specified in app.js (default port is 3000) you should see the file uploader ready to go.  Simply post the url and users will be able to generate branded photos as long as the app is runing.<br>
```
example url: http://127.0.0.1:300
```

<b>Note: Be carefull when hosting a public facing file uploader on your own computer.  Although I've tried not to expose too many security vulnerabilities, I give no gaurentee that users won't be able to upload malicious code to your machine which could expose your data to them or corrupt data on your machine.  Use this live web app uploader at your own risk.</b>

##Batch Image Brander
Place all images you would like to brand into the srcImages folder.  Name your branding image filter.png in the top directory.  In the command line run:<br>
```
node brander.js -b
```
<br>

Branded images will be created in the outputImages folder.

The following paramaters can also be passed in to alter features of the brander
<li>-h= height of output image (default 600)
<li>-w= width of output image (default 600)
<li>-s= source image directory
<li>-o= output image directory
<li>-f= brand filter filename

##License
This software is released under GNU v3.0




#Image Brander

![](brand.png)

Lately there has been a lot of buzz around branded Facebook profile pictures and why certain events receive a filter to show support or solidarity (e.g. The Paris Terrorist Attacks) while others do not (e.ge the Beirut bombing).  This simple open source Node application is an attempt to democratize the process, and allow anyone to create a branded proflie picture by batch overlaying a filter onto a folder of images.<br>

This application is designed to be useful for individuals without a technical background.  Non-technical users may run into a few issues with installing dependencies or navigating to the appropriate directory using the command line, but a quick google search should solve most problems.

Note: Currently this application will only work on Macs.  If there is a need for it to be extended to windows, please reach out to me.

##Installing Dependencies
The easiest way to get up and running is to simply run the configure script from the command line:<br>
```./configure.sh
```<br>
This will automatically install all dependencies. If you would prefer to do a manual install, the following dependencies are needed:<br>
<li>Node JS
<li>NPM
<li>Imagemagick
<li>npm package: easyimage
<li>npm package: canvas

##Running the Image Brander
Place all images you would like to brand into the srcImages folder.  Name your branding image filter.png in the top directory.  In the command line run:<br>
```node brander.js
```<br>

Branded images will be created in the outputImages folder.

Note: These locations and file names can be changed, just re-define them in brander.js

##Future Work
Combining this node backend code with a simple Express web app that handles image uploading and downloading would allow branded images to be created per user rather than as a batch process.  Until that time, using a service like Dropbox or a public GoogleDrive folder is recommended for efficient collection and re-distribution.

##License
This software is released under GNU v3.0




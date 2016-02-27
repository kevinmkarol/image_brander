/**
** Created by Kevin M. Karol, Copyright 2016
** Released under GNU v3.0
**/

var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path')
var imageBrander = require('../../brander.js')
var appVars = require("../app.js")

var filename = ""
var uploadsFolder  = "public/uploads/"

/* home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname,'../public/pages/index.html'))
});

/*Submit photo and process it */
router.post('/api/photo', function(req,res){
  upload(req,res,function(err){
    if(err){
    	console.log(err)
    	return res.end("Error uploading file.");
    }
    console.log(filename)

    var overlayFilename = "overlay_" + filename;
    imageBrander.generateCompositePhoto(uploadsFolder + filename, appVars.brandOverlay, uploadsFolder + overlayFilename);

    //Give the photo time to generate before posting the link
    setTimeout(function(){
      var fullAddress = appVars.websiteAddress + ":" + appVars.portNumber + "/uploads/" + overlayFilename;
      res.render('index.jade', {url:fullAddress})
    }, 250)

  });
});


function fileNameGenerator(filename, extension){
  return filename + '-' + Date.now() + extension
}

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'public/uploads');
  },
  filename: function (req, file, callback) {
    extension = ""
    if(file.mimetype == 'image/jpeg'){
      extension = '.jpg'
    }else if(file.mimetype == 'image/png'){
      extension = '.png'
    }

    filename = fileNameGenerator(file.fieldname, extension)
    callback(null, filename);
  }
});


var upload = multer({storage : storage,
    fileFilter : function(req, file, callback) {
        var fileType = ['png', 'jpg'];
        if (fileType.indexOf(file.originalname.split('.')[file.originalname.split('.').length-1]) === -1) {
            return callback(new Error('Wrong extension type'));
        }
        callback(null, true);
    }
    }).single('userPhoto');

module.exports = router;

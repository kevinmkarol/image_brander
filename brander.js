/**
** Created by Kevin M. Karol, Copyright 2016
** Released under GNU v3.0
**/

var fs = require('fs');
var easyimage = require('easyimage');
var Canvas = require('canvas');
var width = 600;
var height = 600;

function generateProfilePhoto(currentPhoto, framePhoto, outputFileName){
  var Image = Canvas.Image
    , canvas = new Canvas(width, height)
    , ctx = canvas.getContext('2d');

  easyimage.resize({
    src:currentPhoto,
    dst:currentPhoto,
    width: width,
    height: height
  }).then(function(image){
    fs.readFile(currentPhoto, function(err, picture){
      if(err) throw err;
      img = new Image;
      img.src = picture;

      ctx.drawImage(img, 0, 0);

      fs.readFile(framePhoto, function(err, picture){
        if(err) throw err;
        img = new Image;
        img.src = picture;

        ctx.drawImage(img, 0, 0, 600, 600);

        var out = fs.createWriteStream(outputFileName)
        var stream = canvas.jpegStream();

        stream.on('data', function(chunk){
          out.write(chunk);
        });

        stream.on('end', function(){ 
           out.end();
        });
      });
    });
  }, function(err){
    console.log(err)
  });
}

function allImagesInDirectory(inputDirectory, outputDirectory, frameName){
  fs.readdir(inputDirectory, function(err, filenames){
    if(err){
      onError(err);
      return;
    }
    filenames.forEach(function(filename){
      if(!filename.startsWith(".")){
        var seperateExtension = filename.split(".");
        var inputFile = inputDirectory + "/" + filename;
        var outputFile = outputDirectory + "/" + seperateExtension[0] + ".jpg";
        generateProfilePhoto(inputFile, frameName, outputFile);
      }
    })
  })
}

allImagesInDirectory("srcImages", "outputImages", "filter.png");
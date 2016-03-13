/**
** Created by Kevin M. Karol, Copyright 2016
** Released under GNU v3.0
**/
var fs = require('fs');
var easyimage = require('easyimage');
var Canvas = require('canvas');

function generateCompositePhoto (currentPhoto, framePhoto, outputFileName){
    var Image = Canvas.Image
      , canvas = new Canvas(width, height)
      , ctx = canvas.getContext('2d');

    //resize to output image size
    easyimage.resize({
      src:currentPhoto,
      dst:currentPhoto,
      width: width,
      height: height
    }).then(function(image){
      //read in the current profile picture
      fs.readFile(currentPhoto, function(err, picture){
        if(err) throw err;
        img = new Image;
        img.src = picture;

        ctx.drawImage(img, 0, 0, width, height);

        //read in the brand image
        fs.readFile(framePhoto, function(err, picture){
          if(err) throw err;
          img = new Image;
          img.src = picture;

          ctx.drawImage(img, 0, 0, width, height);

          var out = fs.createWriteStream(outputFileName);
          var stream = canvas.jpegStream();

          //output the composite image
          stream.on('data', function(chunk){
            out.write(chunk);
          });

          stream.on('end', function(){ 
             out.end();
          });
        });
      });
    }, function(err){
      console.log(err);
    });
  }

//Batch process a folder of images to be branded
function batchProcess(inputDirectory, outputDirectory, frameName){
  fs.readdir(inputDirectory, function(err, filenames){
    if(err){
      console.log(err);
      return;
    }
    filenames.forEach(function(filename){
      if(!filename.startsWith(".")){
        var seperateExtension = filename.split(".");
        var inputFile = inputDirectory + "/" + filename;
        var outputFile = outputDirectory + "/" + seperateExtension[0] + ".jpg";
        generateCompositePhoto(inputFile, frameName, outputFile);
      }
    })
  })
}

//output image properties
var width = 600;
var height = 600;

//batch processing information
var srcDirectory = "srcImages";
var outputDirectory = "outputImages";
var brandOverlay = "filter.png";

//allow batch processing to be called from the command line
var shouldBatchProcess = false;
process.argv.forEach(function(val, index, array){
  if(val.indexOf("-b") == 0){
    shouldBatchProcess = true;
  }else if(val.indexOf("-h=") == 0){
    height = parseInt(val.substring(3));
  }else if(val.indexOf("-w=") == 0){
    width = parseInt(val.substring(3));
  }else if(val.indexOf("-s=") == 0){
    srcDirectory = val.substring(3);
  }else if(val.indexOf("-o=") == 0){
    outputDirectory = val.substring(3);
  }else if(val.indexOf("-f=") == 0){
    brandOverlay = val.substring(3);
  }
});

if(shouldBatchProcess){
    batchProcess(srcDirectory, outputDirectory, brandOverlay);
}

//export for realtime web app
module.exports = {
  generateCompositePhoto: generateCompositePhoto
};

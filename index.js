var app = null;
var data = null;
var express = require('express');
var fs = require('fs');
var lwip = require('lwip');
var Q = require('q');
var port = 8080; // default port.
var request = require('request');
var router = null;

require('./env.js');

app = express();
port = process.env.PORT || port;
router = express.Router();

fs.readFile(process.env.DIRNAME + '/model/images.json', (err, fileData) => {
    if (err !== null) {
        throw err;
    }
    
    data = JSON.parse(fileData);
    
    console.log('Data loaded.');
});

router.all('/:width/:height', (req, res) => {
    var i = 0;
    var index = -1;
    var returnFile = null;
    var width = parseInt('' + req.params.width) || 0;
    var height = parseInt('' + req.params.height) || 0;
    var cacheFileName = process.env.DIRNAME + '/cache/' + width + '_' + height + '.jpg';

    if (width <= 0 || height <= 0) {
        res.status(400).json({
            message: 'Usage: /(uint) :width/(uint) :height'
        });
        
        return;
    }

    if (width > 1000 || height > 1000) {
        res.status(400).json({
            message: 'Width or height bigger than 1000.'
        });

        return;
    }

    if (fs.existsSync(cacheFileName)) {
        console.log('Using cached');
        res.sendFile(cacheFileName);

        return;
    }
    
    for (i = 0; i < data.length; i++) {
        var imageData = data[i];
        
        if (imageData.width >= width && imageData.height >= height) {
            var middleX = imageData.faceX + (imageData.faceWidth / 2);
            var middleY = imageData.faceY + (imageData.faceHeight / 2);
            var cropX = middleX - (width / 2);
            var cropY = middleY - (height / 2);
            var cropWidth = width;
            var cropHeight = height;
            
            if (cropX <= 0) {
                cropWidth += cropX * -1;
                cropX = 0;
            }
            
            if (cropY <= 0) {
                cropHeight += cropY * -1;
                cropY = 0;
            }
            
            lwip.open(imageData.filename, (err, image) => {
                
                
                if (err !== null) {
                    throw null;
                }
                
                image.batch()
                    .crop(
                        cropX,
                        cropY,
                        cropX + cropWidth,
                        cropY + cropHeight
                    ).writeFile(cacheFileName, err => {
                        if (err !== null) {
                            throw err;
                        }
                        
                        res.sendFile(cacheFileName);
                    });
            });
            
            break;
        }
    }
});

router.all('*', (req, res) => {
    res.status(400).json({
        message: 'Usage: /(uint) :width/(uint) :height'
    });
});

app.use('/', router);
app.listen(port);
console.log('Server started on port ' + port);

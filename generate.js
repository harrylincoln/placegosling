var Faced = require('faced');
var faced = new Faced();
var fs = require('fs');
var lwip = require('lwip');

require('./env.js');

fs.readdir('./images', (err, files) => {
    var data = [],
        i = 0,
        total = files.length;
    
    for (i = 0; i < files.length; i++) {
        var file = files[i];
        
        if (file.length !== 0 && file.substring(0, 1) !== '.') {
            // facial recognition with cmake, make (GCC), pkg-config, opencv
            faced.detect(process.env.DIRNAME + '/images/' + file, (faces, image, file) => {
                console.log(faces);
                
                if (typeof faces !== 'undefined' && faces.length !== 0) {
                    var face = faces[0];
                    
                    lwip.open(file, (err, image) => {
                        if (err) {
                            throw err;
                        }
                        
                        var width = image.width(),
                            height = image.height();
                        
                        data.push({
                            filename: file,
                            faceX: face.getX(),
                            faceY: face.getY(),
                            faceWidth: face.getWidth(),
                            faceHeight: face.getHeight(),
                            width: width,
                            height: height
                        });
                        
                        if (data.length === total) {
                            console.log('Writing data to JSON file.');
                            writeDataToFile(data);
                        }
                    });
                } else {
                    total--;
                }
            });
        } else {
            total--;
        }
    }
});

function writeDataToFile(data) {
    fs.writeFile(process.env.DIRNAME + '/model/images.json', JSON.stringify(data), err => {
        if (err !== null) {
            throw err;
        }
        
        console.log('Finished writing data to model file.');
    });
}

# placegosling

SETUP:

1. You'll need to install these globally on your machine first:
cmake, make (GCC), pkg-config && opencv
2. npm install
3. add a env.js file in the root directory:

process.env['DIRNAME'] = __dirname;

4. node generate.js - parses image in /images and finds face. Writes data to JSON
3. node index.js - runs up a virtual server on 8080 ready for you to add /200/300 or whatever dimensions you want.
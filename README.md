## Features
* responsive layout
* lazy loaded
* indication of images being loaded for the server
* indication of image being downloaded
* case insensitive split word search

## TODO
* Display failure image on image load error or push images to the gallery after they have been received for smooth UI
* Use requestAnimationFrame to read properties from the dom on scroll to avoid multiple reads & layouts per frame

## Stack
* ES6/7 + babel
* React + Redux
* Axios
* Bluebird
* Mocha + chai + sinon + enzyme
* webpack + express + webpack hmr + sass loader

##To run a project

1. clone the repo
2. cd react-gallery
3. npm install
4. cp .env.example .env
5. npm start
6. navigate to http://localhost:3000 in your browser.

##To run tests

`npm test`
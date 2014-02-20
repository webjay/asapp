# Asapp

## Architecture

### Frontend

All frontend packages are installed with [Bower](http://bower.io) and tasks like minification, compilation and testing is handled by [Grunt](http://gruntjs.com).

#### Framework

The frontend application is built in [jQuery Mobile](http://jquerymobile.com). For a start we will use the default theme, which later can be adjusted i.e. via [ThemeRoller](http://themeroller.jquerymobile.com).

### Backend

All backend packages are installed with [npm](https://www.npmjs.org) and tasks like compilation and testing is just as the frontend handled by [Grunt](http://gruntjs.com).

#### Framework

For a simple solid framework we use [express](http://expressjs.com).

### Database

For data storage I recommend [MongoDB](http://www.mongodb.org) as it works well with Node.js. The data architecture for Asapp is simple. One strong benefit with a database like MongoDB is that it has dynamic schemas and thus doesn't require us to know the schema up front. We can easily modify as we go, and need only to focus on the code. 
Installation is simple both locally when we develop and wherever the app will be hosted.

#### Provider

I have chosen MongoHQ as service provider. 

- [Dashboard](https://app.mongohq.com/asapp/mongo/asapp)

## Development

The [Node package manager](http://www.npmjs.com) is needed to install packages. Npm is installed along with Node.
If you start from scratch, start with [Homebrew](http://brew.sh/#install), then:

    brew install node

To start development, clone the repository:

    git clone git@github.com:webjay/asapp.git
    cd asapp
  
To install the needed components, and compile everything:

    npm install
    bower install
    grunt

## Testing

For testing we use [Mocha](http://visionmedia.github.io/mocha/).

To run tests, use this command:

    npm test

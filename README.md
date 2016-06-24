[![Build Status](https://snap-ci.com/VamosJuntas/back-end/branch/master/build_image)](https://snap-ci.com/VamosJuntas/back-end/branch/master)

# VamosJuntas Backend

##Installation

Install [Brew](http://brew.sh/) in your Mac and then install Mongo:

```
brew install mongodb
```

Install services in brew to manage MongoDb:


```
brew tap homebrew/services
```


Install project dependencies:

```
$npm install
```


##MongoDB

With brew and brew services installed (see above), manage Mongo with following commands:

###Start

$ brew services start mongodb

###Stop
$ brew services stop mongodb

###Restart
$ brew services restart mongodb


##Tests


### Unit

Run with **npm run unit-test**

### Integration

Start your local MongoDB with **brew services start mongodb**
Run with **npm run integration-test**

## owomaniya-website

oWomaniya is for women in tech, where we will create a web/mobile app or a portal to help, educate and support women.

## Dependencies

* [node](http://nodejs.org)
* [npm](http://npmjs.org)
* [bower](http://bower.io) (`npm install bower -g`)
* [gulp](http://gulpjs.com) (`npm install gulp -g`)

## How to install and run

```
$ npm install
$ npm start
```

Open `http://localhost:8800` to see on your local environment.

## Builds
```
$ gulp release:oWomaniya
```
Which creates build and newly dist folder will be generated inside public folder.

## Deploy
```
$ firebase deploy
```
 before that Make sure you have Firebase CLI installed on your machine globally.

```$ npm install -g firebase-tools```

You have access for that firebase project.

try ```$ firebase login```

Initialize your site using ```$ firebase init``` and then try to deploy using ```$ firebase deploy```. for [more detail](https://firebase.google.com/docs/hosting/deploying)







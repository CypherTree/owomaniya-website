'use strict';

/**
 * oWomaniya
 */

angular.module('oWomaniya', [
  'ui.router',
  'ngMaterial',
  'navbar',
  'home',
  'firebase',
  'profile',
  'register',
  'users',
  'ngMap'
])

/**
 * Application wide constants
 */

// .constant('apiURL', window.CONFIG.host.concat(window.CONFIG.uri.replace(/\/$/, '')))
// .constant('apiHOST', window.CONFIG.host)


/**
 * Config
 */

.config([
  '$urlRouterProvider', '$locationProvider', '$httpProvider', '$compileProvider', '$stateProvider',
  function ($urlRouterProvider, $locationProvider, $httpProvider, $compileProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/');

    // Config
    $locationProvider.html5Mode(false);
    $httpProvider.useApplyAsync(true);
    $compileProvider.debugInfoEnabled(false);

    $stateProvider.state('/', {
      url: '/',
      templateUrl: '/apps/oWomaniya/home/home.html'
    });
  }
])

/**
 * Application controller
 */

.controller('AppCtrl', [
  '$scope','$firebaseAuth',
  function ($scope, $firebaseAuth) {

    var config = {
      apiKey: "AIzaSyDggz5R8EBXXs4Mh-BBOH5xBpX6H4o1oe4",
      authDomain: "owomaniya-5d939.firebaseapp.com",
      databaseURL: "https://owomaniya-5d939.firebaseio.com",
      projectId: "owomaniya-5d939",
      storageBucket: "gs://owomaniya-5d939.appspot.com",
      messagingSenderId: "<SENDER_ID>",
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }

  }
]);

/**
 * Bootstrap
 */

angular.element(document).ready(function() {
  angular.bootstrap(document, ['oWomaniya'], { strictDi: true });
});

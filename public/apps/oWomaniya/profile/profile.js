(function () {
    'use strict';
  
    // Configure routes and other modules
    config.$inject = ['$stateProvider'];
    function config($stateProvider) {
      $stateProvider.state('profile', {
        url: '/profile',
        templateUrl: '/apps/oWomaniya/profile/profile.html',
        controller: profileCtrl,
        controllerAs: 'vm',
        title: 'profile'
      });
    }
  
    profileCtrl.$inject = ['$state'];
    function profileCtrl($state) {
      var vm = this;
     
  
    }
  
  
    angular
      .module('profile', [
        'firebase'
      ])
     .config(config)
     .controller(profileCtrl);
  })();
  
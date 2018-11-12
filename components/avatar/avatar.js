(function () {
    'use strict';
  
    var Avatar = {
      bindings: {
        pic: '<?',
        style: '@?',
        firstName: '<?',
        lastName: '<?',
        size: '@?',
        bgcolor: '@?',
        unread :'<?',
        more: '<?'
      },
      templateUrl: '/avatar/avatar.html',
      controller: AvatarCtrl,
      controllerAs: 'vm'
    };
  
    AvatarCtrl.$inject = ['$scope'];
    function AvatarCtrl ($scope) {
      var vm = this;
      vm.ready = false;
      vm.class = vm.class || 'cs-avatar';
      vm.size= vm.size || 'cs-avatar-small' ;
  
      vm.resolution = 768;
      if(vm.more) {
        vm.bgcolor = '#4F4F4F';
        vm.initials= '+' + vm.more.toString();
        vm.ready = true;
      }
      $scope.$watchGroup(['vm.firstName', 'vm.lastName', 'vm.pic'], function (newVal, oldVal) {  
        vm.avatarImage = newVal[2];
        vm.name = newVal[0] + newVal[1];
        vm.initials = newVal[0] && newVal[1] ?  newVal[0].charAt(0) + newVal[1].charAt(0) : 'NA'
        vm.ready = true;
      });
    }
  
  
    angular
      .module('avatar', ['ngAvatar'])
      .component('avatar', Avatar)
  })();
  
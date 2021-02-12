(function () {
    'use strict';  
UserListCtrl.$inject = ['$scope','$firebaseArray','$state'];
function UserListCtrl ($scope, $firebaseArray,$state) {
	var vm = this;
	vm.user = {};
	vm.user.is_joining = true;
	vm.isLoading = false;
	var ref = firebase.database().ref("users");
	vm.userList = $firebaseArray(ref);
	
	vm.goBack = function () {
		$state.go('home')
	}
}
config.$inject = ['$stateProvider'];

function config($stateProvider) {
$stateProvider.state('userList', {
	url: '/users',
	templateUrl: '/apps/oWomaniya/user-list/user-list.html',
	controller: UserListCtrl,
	controllerAs: 'vm'
});
}

angular
    .module('users', ['firebase','ngMaterial','social-accounts'])
	.controller('UserListCtrl', UserListCtrl)
    .config(config);
})();
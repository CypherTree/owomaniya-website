(function () {
    'use strict';  
RegisterCtrl.$inject = ['$scope','$firebaseArray','$state'];
function RegisterCtrl ($scope, $firebaseArray,$state) {
	var vm = this;
	vm.user = {};
	vm.user.is_joining = true;
	vm.register = function (event) {
		var ref = firebase.database().ref("users");
		$firebaseArray(ref).$add(vm.user).then(
			function(ref){
				alert('User registered successfully!')
				$state.go('home');
			},
			function(error){
				console.log(error);
			}
		)
	}
	vm.goBack = function () {
		$state.go('home')
	}
}
config.$inject = ['$stateProvider'];

function config($stateProvider) {
$stateProvider.state('register', {
	url: '/register',
	templateUrl: '/apps/oWomaniya/register/register.html',
	controller: RegisterCtrl,
	controllerAs: 'vm'
});
}

angular
    .module('register', ['firebase','ngMaterial'])
	.controller('RegisterCtrl', RegisterCtrl)
    .config(config);
})();
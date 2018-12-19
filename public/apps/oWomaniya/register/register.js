(function () {
    'use strict';  
RegisterCtrl.$inject = ['$scope','$firebaseArray','$state','$mdToast'];
function RegisterCtrl ($scope, $firebaseArray,$state,$mdToast) {
	var vm = this;

	vm.user = {};
	vm.user.is_joining = true;
	vm.isLoading = false;
	vm.register = function (event) {
		vm.isLoading = true;
		var ref = firebase.database().ref("users");
		$firebaseArray(ref).$add(vm.user).then(
			function(ref){
				alert('you are registered for the event, see you there.')
				firebase.auth().createUserWithEmailAndPassword(vm.user.email, "password@123$!").then(function(){

					firebase.auth().currentUser.sendEmailVerification().then(function(res) {
						// Email Verification sent!
						$mdToast.show(
							$mdToast.simple()
							  .textContent('email verification link has been sent to your account.')
							  .position('top' )
							  .hideDelay(3000)
						  );
						
						vm.isLoading = false;
						$state.go("home")
					  });			
				}).catch(function(error) {
					var errorCode = error.code;
					var errorMessage = error.message;
					$mdToast.show(
						$mdToast.simple()
						  .textContent(errorMessage)
						  .position('bottom right')
						  .hideDelay(3000)
						  .highlightAction(true)
      					 .highlightClass('text-danger')
					);
				  });
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
    .module('register', ['firebase','ngMaterial','img-upload'])
	.controller('RegisterCtrl', RegisterCtrl)
    .config(config);
})();
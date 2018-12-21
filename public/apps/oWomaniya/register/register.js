(function () {
    'use strict';  
RegisterCtrl.$inject = ['$firebase','$firebaseArray','$state','$mdToast'];
function RegisterCtrl ($firebase, $firebaseArray,$state,$mdToast) {
	var vm = this;

	vm.user ={};
	vm.user.is_joining = true;
	vm.user.links =[];
	vm.isLoading = false;
	vm.register = function (event) {
		vm.isLoading = true;
		var ref = firebase.database().ref("users");
		firebase.auth().createUserWithEmailAndPassword(vm.user.email, "password@123$!").then(function(){
			alert('you are registered for the event, see you there.')
			
			firebase.auth().currentUser.sendEmailVerification().then(function(res) {
				// Email Verification sent!
				$firebaseArray(ref).$add(vm.user).then(
					function(ref){
						// $firebaseArray(ref.child("links")).$add(vm.links);
						$mdToast.show(
							$mdToast.simple()
								.textContent('email verification link has been sent to your account.')
								.position('bottom right' )
								.hideDelay(3000)
							);
							vm.isLoading = false;
							$state.go("home")
					},
					function(error){
						console.log(error);
					})
				});			
			}).catch(function(error) {
				var errorMessage = error.message;
				vm.isLoading = false;
				$mdToast.show(
					$mdToast.simple()
						.textContent(errorMessage)
						.position('bottom right')
						.hideDelay(3000)
						.highlightAction(true)
						.highlightClass('text-danger')
				);
			});
		
		
		
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
    .module('register', ['firebase','ngMaterial','img-upload','social-accounts'])
	.controller('RegisterCtrl', RegisterCtrl)
    .config(config);
})();
(function () {
    'use strict';  
RegisterCtrl.$inject = ['$firebase','$firebaseArray','$state','$mdToast','GoogleAutocomplete','GooglePlaces'];
function RegisterCtrl ($firebase, $firebaseArray,$state,$mdToast,GoogleAutocomplete, GooglePlaces) {
	var vm = this;

	vm.user ={};
	vm.host= {};
	vm.user.is_joining = true;
	vm.user.links =[];
	vm.host.links =[];
	vm.host.latitude = "-33.866651";
	vm.host.longitude = "151.195827";
	vm.isLoading = false;
	vm.clients = [];
	let ref = firebase.database().ref("hosts");
	let list = $firebaseArray(ref);
	list.$loaded(
		function(clientList) {
			vm.isLoading = false;
			clientList.map((x) => vm.clients.push(x.company_name));
		}, function(error) {
			vm.isLoading = true;
		  console.error("Error:", error);
		});
	
	GoogleAutocomplete.initialize();

	vm.searchPlaces = function(fldInput) {
		return GoogleAutocomplete.getPredictions(fldInput).then(function(res) {
		  return res;
		}, function() { return []; });
	  };
	vm.onLocationSelect = function(item, model) {
	GooglePlaces.getDetails(item.place_id).then(function(res) {
		if (res) {
			vm.host.latitude = res.geometry.location.lat();
			vm.host.longitude = res.geometry.location.lng() ;
		}
	}, function(status) {
		console.log('Can\'t retrieve location details and coordinates.');
	});
	};
	vm.register = function (event) {
		vm.isLoading = true;
		var ref = firebase.database().ref("users");
		firebase.auth().createUserWithEmailAndPassword(vm.user.email, "password@123$!").then(function(){
			alert('you are registered for the event, see you there.')
			
			firebase.auth().currentUser.sendEmailVerification().then(function(res) {
				// Email Verification sent!
				$firebaseArray(ref).$add(vm.user).then(
					function(ref){
						$mdToast.show(
							$mdToast.simple()
								.textContent('email verification link has been sent to your account.')
								.position('bottom right' )
								.hideDelay(3000)
							);
							vm.isLoading = false;
							$state.go("userList")
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
	vm.clientRegister = function (event) {
		vm.isLoading = true;
		var ref = firebase.database().ref("hosts");
		
		$firebaseArray(ref).$add(vm.host).then(
			function(ref){
				$mdToast.show(
					$mdToast.simple()
						.textContent('You have successfully registered with us.')
						.position('bottom right' )
						.hideDelay(3000)
					);
					vm.isLoading = false;
					$state.go("home")
			},
			function(error){
				console.log(error);
			})
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
    .module('register', ['firebase','ngMaterial','img-upload','social-accounts','google-location'])
	.controller('RegisterCtrl', RegisterCtrl)
    .config(config);
})();
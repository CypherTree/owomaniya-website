
(function () {
    'use strict';  
CreateHostCtrl.$inject = ['$firebase','$firebaseArray','$state','$mdToast','GoogleAutocomplete','GooglePlaces'];
function CreateHostCtrl ($firebase, $firebaseArray,$state,$mdToast,GoogleAutocomplete, GooglePlaces) {
	var vm = this;
	vm.host= {};
	vm.host.links =[];
	vm.isLoading = false;
	vm.host.lat = 18.5654;
	vm.host.long = 73.9138;
	
	GoogleAutocomplete.initialize();
    GooglePlaces.initialize('createEventMapNode');
	vm.searchPlaces = function(fldInput) {
		return GoogleAutocomplete.getPredictions(fldInput).then(function(res) {
		  return res;
		}, function() { return []; });
	  };
	vm.onLocationSelect = function(item, model) {
		GooglePlaces.getDetails(item.place_id).then(function(res) {
			if (res) {
				vm.host.lat = res.geometry.location.lat() || 18.5654;
				vm.host.long = res.geometry.location.lng() || 73.9138 ;
			}
		}, function(status) {
			vm.host.lat =  18.5654;
			vm.host.long =  73.9138 ;
			console.log('Can\'t retrieve location details and coordinates.');
		});
	};
	
	vm.createHost = function (event) {
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
					$state.go("hostList")
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
$stateProvider.state('create-host', {
	url: '/create-host',
	templateUrl: '/apps/oWomaniya/create-host/create-host.html',
	controller: CreateHostCtrl,
	controllerAs: 'vm'
});
}

angular
    .module('create-host', ['firebase','ngMaterial','img-upload','social-accounts','google-location'])
	.controller('CreateHostCtrl', CreateHostCtrl)
    .config(config);
})();
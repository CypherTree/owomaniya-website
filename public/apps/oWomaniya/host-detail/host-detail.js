(function () {
    'use strict';  
 HostDetailCtrl.$inject = ['$firebaseArray','$state','$stateParams'];
 function HostDetailCtrl ( $firebaseArray,$state,$stateParams ) {
	var vm = this;
	vm.host = {};

	vm.isLoading = true;
	var ref = firebase.database().ref("hosts");
	vm.hostList = $firebaseArray(ref);
	vm.hostList.$loaded(
		function(list) {
			vm.isLoading = false;
			vm.selectedHost = list.filter((x) => x.$id === $stateParams.id)[0];
			vm.initialize(vm.selectedHost);
		}, function(error) {
			vm.isLoading = true;
		  console.error("Error:", error);
		});
	
	vm.goBack = function () {
		$state.go('home')
	}	

	 vm.initialize= function(host) {
	  var loc = { lat: parseFloat(vm.selectedHost.lat), lng: parseFloat(vm.selectedHost.long) };
		console.log(loc);
		var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 12,
		center: loc
	  });

	  // This event listener calls addMarker() when the map is clicked.
	  // google.maps.event.addListener(map, 'click', function(event) {
		// addMarker(event.latLng, map);
	  // });

	  // Add a marker at the center of the map.
	  addMarker(loc, map);
	}

	// Adds a marker to the map.
	function addMarker(location, map) {
	  // Add the marker at the clicked location, and add the next-available label
	  // from the array of alphabetical characters.
	  var marker = new google.maps.Marker({
		position: location,
		map: map
	  });
	}

}
config.$inject = ['$stateProvider'];
function config($stateProvider) {
	$stateProvider.state('host-detail', {
		url: '/host/:id',
		templateUrl: '/apps/oWomaniya/host-detail/host-detail.html',
		controller: HostDetailCtrl,
		controllerAs: 'vm'
	});
}

angular
    .module('host-detail', ['firebase','ngMaterial','social-accounts'])
	.controller('HostDetailCtrl', HostDetailCtrl)
    .config(config);
})();
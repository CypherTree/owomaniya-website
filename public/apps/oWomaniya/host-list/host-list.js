(function () {
    'use strict';  
HostListCtrl.$inject = ['$scope','$firebaseArray','$state'];
function HostListCtrl ($scope, $firebaseArray,$state) {
	var vm = this;
	vm.host = {};
	vm.isLoading = false;
	var ref = firebase.database().ref("hosts");
	vm.hostList = $firebaseArray(ref);
	vm.hostList.$loaded(
		function(list) {
			vm.isLoading = false;
		}, function(error) {
			vm.isLoading = true;
		  console.error("Error:", error);
		});
	console.log('here');
	vm.goBack = function () {
		$state.go('home')
	}
}
config.$inject = ['$stateProvider'];

function config($stateProvider) {
$stateProvider.state('hostList', {
	url: '/hosts',
	templateUrl: '/apps/oWomaniya/host-list/host-list.html',
	controller: HostListCtrl,
	controllerAs: 'vm'
});
}

angular
    .module('hosts', ['firebase','ngMaterial','social-accounts'])
	.controller('HostListCtrl', HostListCtrl)
    .config(config);
})();
(function () {
    'use strict';  
HomeCtrl.$inject = ['$scope','$state'];
function HomeCtrl ($scope, $state) {
	var vm = this;
	vm.userIsLoggedIn = function() {
			firebase.auth().onAuthStateChanged(function(user) {
					if (user) {
						// User is signed in.
						vm.displayName = user.displayName;
						vm.email = user.email;
						vm.emailVerified = user.emailVerified;
						vm.photoURL = user.photoURL;
						vm.isAnonymous = user.isAnonymous;
						vm.uid = user.uid;
						vm.providerData = user.providerData;
					}
			});
    }
    vm.signInGithub= function() { 
			var provider = new firebase.auth.GithubAuthProvider();
			provider.addScope('repo');
			firebase.auth().signInWithPopup(provider).then(function(result) {
					vm.token = result.credential.accessToken;
					}).catch(function(error) {
					vm.errorCode = error.code;
					vm.credential = error.credential;
					if (vm.errorCode === 'auth/account-exists-with-different-credential') {
							alert('You have already signed up with a different auth provider for that email.');
					} else {
							console.error(error);
					}
			});
    }
    vm.signInGoogle= function() { 
			// Using a popup.
			var provider = new firebase.auth.GoogleAuthProvider();
			provider.addScope('profile');
			provider.addScope('email');
			firebase.auth().signInWithRedirect(provider).then(function(result) {
			// This gives you a Google Access Token.
			var token = result.credential.accessToken;
			// The signed-in user info.
			var user = result.user;
			});
    }
    vm.userIsLoggedIn();
}
config.$inject = ['$stateProvider'];

function config($stateProvider) {
  $stateProvider.state('home', {
    url: '/home',
    templateUrl: '/apps/oWomaniya/home/home.html',
    controller: HomeCtrl,
    controllerAs: 'vm'
  });
}

angular
    .module('home', ['firebase'])
    .controller('HomeCtrl', HomeCtrl)
    .config(config);
})();
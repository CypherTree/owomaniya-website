'use strict';


var navbar = {
    bindings: { },
    controllerAs: 'vm',
    controller: NavbarCtrl,
    templateUrl: '/apps/oWomaniya/navbar/navbar.html'
};


NavbarCtrl.$inject = ['$scope','$state'];
function NavbarCtrl ($scope, $state) {
    var vm = this;
    vm.loginWithEmailAndPwd = function () {
      firebase.auth().signInWithEmailAndPassword(vm.email, vm.password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
      });
    },

    vm.signIn = function () {
        var provider = new firebase.auth.GithubAuthProvider();
        provider.addScope('repo');
       
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a GitHub Access Token. You can use it to access the GitHub API.
            vm.token = result.credential.accessToken;
            vm.user = result.user;
            vm.displayName = vm.user.displayName;
            vm.email = vm.user.email;
            vm.photoURL = vm.user.photoURL;
          }).catch(function(error) {
          
            // Handle Errors here.
            vm.errorCode = error.code;
            vm.errorMessage = error.message;
            // The email of the user's account used.
            vm.email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            vm.credential = error.credential;
            if (vm.errorCode === 'auth/account-exists-with-different-credential') {
              alert('You have already signed up with a different auth provider for that email.');
              // If you are using multiple auth providers on your app you should handle linking
              // the user's accounts here.
            } else {
              console.error(error);
            }
          });
    },
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
  vm.goto = function (tab) {
    if ( tab == 'about') {
      window.open('https://cyphertree.com/about-us/', '_blank');
    }
  }
}


angular
    .module('navbar', ['firebase','avatar'])
    .component('navbar', navbar);

'use strict';


var navbar = {
    bindings: { },
    controllerAs: 'vm',
    controller: NavbarCtrl,
    templateUrl: '/apps/storeapp/navbar/navbar.html'
};


NavbarCtrl.$inject = ['$window'];
function NavbarCtrl ($window) {
 var vm = this;
    vm.contactMe  = function (){
        $window.open('mailto:madhavi.solanki@cyphertree.com','_blank')
    }
    vm.getGithubLink = function (){
        $window.open('https://github.com/owomaniya','_blank')
    }
}


angular
    .module('navbar', [])
    .component('navbar', navbar);

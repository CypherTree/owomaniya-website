(function () {
    'use strict';
  
    var OwFooter = {
      bindings    : {
        ngModel  : '=?',
        ngViewmodel: '=?',
        onSuccess: '&',
        uploading: '=?',
        image    : '<?',
        resume    : '<?',
        extraParams: '<?'
      },
      transclude  : true,
      templateUrl : '/ow-footer/ow-footer.html',
      controller  : FooterCtrl,
      controllerAs: 'vm'
    };
  
  
    FooterCtrl.$inject = [];
    function FooterCtrl() {
      let vm = this;
    }                                                                                                                                                                                                                                                                                                                                                                                                      
  
    angular
      .module('ow-footer', [])
      .component('owFooter', OwFooter);
  }());
  
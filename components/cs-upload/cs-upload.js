(function () {
  'use strict';

  var CsUpload = {
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
    templateUrl : '/cs-upload/cs-upload.html',
    controller  : CsUploadCtrl,
    controllerAs: 'vm'
  };


  CsUploadCtrl.$inject = ['$element','$timeout','$firebaseStorage'];
  function CsUploadCtrl($element, $timeout, $firebaseStorage) {
    let vm = this;
    vm.imageFormat = 'image/*';
    vm.file = vm.file || {}
    vm.ngModel = vm.ngModel || '';
    vm.ngViewmodel = vm.ngViewmodel || '';
    vm.uploaded = false;
    let storage = firebase.storage();
    let storageRef = storage.ref();

    vm.fileUploadClick = function () {
      $element.find('input[type="file"]').click();
    };
    vm.uploadFile = function () {
      if (!vm.file) return;

      vm.uploading = true;
      var metadata = {
        contentType: 'image/jpeg',
      };
      
        storageRef.child(vm.file.name).put(vm.file,metadata).then(function(snapshot) {
          snapshot.ref.getDownloadURL().then(function(url) {
            $timeout(function () {
              vm.ngModel = url ;
              vm.ngViewmodel = url;
              vm.uploaded = true;
              vm.uploading = false;
              vm.onSuccess && vm.onSuccess({file: url});
            });
          });
        });
  
    }
  }                                                                                                                                                                                                                                                                                                                                                                                                      

  angular
    .module('cs-upload', ['ngFileUpload'])
    .component('csUpload', CsUpload);
}());

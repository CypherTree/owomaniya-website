(function () {
  'use strict';

  var ImgUpload = {
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
    templateUrl : '/img-upload/img-upload.html',
    controller  : ImgUploadCtrl,
    controllerAs: 'vm'
  };


  ImgUploadCtrl.$inject = ['$element','$timeout','$firebaseStorage'];
  function ImgUploadCtrl($element, $timeout, $firebaseStorage) {
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
    .module('img-upload', ['ngFileUpload'])
    .component('imgUpload', ImgUpload);
}());

/*
** Be sure to include google client side library on base html.
** Like this...
** <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBqaISszhqqr4Nww2WJG2xRhxpiFwGuZwM&libraries=places"></script>
*/
(function() {
  'use strict';

  GoogleAutocomplete.$inject = ['$q', '$timeout'];
  function GoogleAutocomplete($q, $timeout) {
    var vm = this;
    function initialize() {
      $timeout(function() {
        vm.service = new google.maps.places.AutocompleteService();
      });
    }

    function getPredictions(fldInput) {
      if (vm.service) {
        return $q(function(resolve, reject) {
          vm.service.getPlacePredictions({input: fldInput}, function(predictions, status) {
            if (!angular.equals(status, google.maps.places.PlacesServiceStatus.OK)) { reject(status); }
            else { resolve(predictions, status); }
          });
        });
      }
      else {
        return;
      }
    }

    return {
      initialize: initialize,
      getPredictions: getPredictions
    };
  }

  GooglePlaces.$inject = ['$timeout', '$q'];
  function GooglePlaces($timeout, $q) {
    var vm = this;

    function initialize(mapName) {
      vm.mapNode = angular.element('<div id="' + (mapName || 'mapNode') + '"></div>');

      $timeout(function() {
        angular.element('body').append(vm.mapNode);
        vm.gmap = new google.maps.Map(document.getElementById(mapName));
        if (vm.gmap) { vm.service = new google.maps.places.PlacesService(vm.gmap); }
      });
    }

    function getDetails(placeId) {
      console.log(placeId)
      if (vm.service) {
        return $q(function(resolve, reject) {
          vm.service.getDetails({placeId: placeId}, function(place, status) {
            if (angular.equals(status, google.maps.places.PlacesServiceStatus.OK)) {
              resolve(place, status);
            }
            else { reject(status); }
          });
        });
      }
      else { return; }
    }

    function destroyMapEl() {
      if (vm.mapNode) {
        vm.mapNode.next().remove();
        vm.mapNode.remove();
      }
    }

    return {
      initialize: initialize,
      getDetails: getDetails,
      destroyMapEl: destroyMapEl
    };
  }

  angular.module('google-location', [
    'ngResource',
    'ui.bootstrap'
  ])
  .service('GoogleAutocomplete', GoogleAutocomplete)
  .service('GooglePlaces', GooglePlaces);
})();

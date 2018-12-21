(function () {

  var socialFields = {
    bindings: {
      'items': '=?'
    },
    selector: 'social-fields',
    controllerAs: 'vm',
    require: 'items',
    controller: socialFieldsCtrl,
    templateUrl: '/social-accounts/social-fields.html'
  };

  var socialItem = {
    bindings: {
      'item': '=?',
      'itemName': '@?',
      'optionName': '@?',
      'inputName': '@?',
      'indexCount': '=?',
      'removable': '=?',
      'onRemove': '&'
    },
    controllerAs: 'vm',
    require: 'item',
    controller: socialItemCtrl,
    templateUrl: '/social-accounts/social-item.html'
  };

  var socialLinks = {
    bindings: {
      'urls': '=',
      'watchUrls': '=?'
    },
    controllerAs: 'vm',
    controller: socialLinksCtrl,
    templateUrl: '/social-accounts/social-links.html'
  };

  socialFieldsCtrl.$inject = [];
  function socialFieldsCtrl() {
    var vm = this;
    vm.removeLink = removeLink;
    console.log(vm.items)
    function removeLink(index, params) {
      if (params.id) {
        params._destroy = true;
      }
      else {
        vm.items.splice(index, 1);
      }
    }
  }

  socialItemCtrl.$inject = ['$scope','$filter', '$timeout'];
  function socialItemCtrl($scope, $filter, $timeout) {
    var vm = this;
    vm.getFormName = getFormName;
    vm.setSocialType = setSocialType;
    vm.removeItem = removeItem;
    vm.thisForm = {};
    vm.socialTypes= ["Facebook", "Twitter", "Instagram", "Linkedin", "G+", "GitHub", "Snapchat", "Pinterest","StackOverflow","Others"]
    

    function getFormName() {
      var formName = vm.itemName;
      if (vm.indexCount >= 0) {
        formName += '[' + vm.indexCount + ']';
      }

      return formName;
    }

    function removeItem() {
      if (vm.removable) {
        vm.onRemove();
      }
    }

    function setSocialType(urlInput) {
      if (urlInput) {
        try {
          var builtUrl = $filter('buildUrlComplete')(urlInput, true);
          var urlObj = new URL(builtUrl);
          var hostName = urlObj.hostname;
          if (hostName && !angular.equals(hostName, '')) {
            var hostNameSplit = urlObj.hostname.split('.');
            if (hostNameSplit.length > 0) {
              if (hostNameSplit[0] && !angular.equals(hostNameSplit[0], '')) {
                var sld = hostNameSplit[0];
                var socialTypeRes = $filter('filter')(vm.socialTypes, function(value) {
                  return angular.equals(value.toLowerCase(), sld.toLowerCase());
                });

                if (socialTypeRes && socialTypeRes.length > 0) {
                  vm.item.type = socialTypeRes[0];
                }
                else {
                  if (hostNameSplit[1]) {
                    var sld2 = hostNameSplit[1];

                    if (angular.equals(sld2, 'google')) {
                      if (angular.equals(sld, 'plus')) {
                        vm.item.type = 'G+';
                      }
                      else {
                        vm.item.type = 'Others';
                      }
                    }
                    else {
                      var socialTypeRes2 = $filter('filter')(vm.socialTypes, function(value) {
                        return angular.equals(value.toLowerCase(), sld2.toLowerCase());
                      });

                      if (socialTypeRes2 && socialTypeRes2.length > 0) {
                        vm.item.type = socialTypeRes2[0];
                      }
                      else {
                        vm.item.type = 'Others';
                      }
                    }
                  }
                  else {
                    vm.item.type = 'Others';
                  }
                }
              }
            }
          }
        }
        catch(error) {
          vm.item.type = undefined;
        }
      }
      else {
        vm.item.type = undefined;
      }
    }

    $scope.$watch(function() {
      return vm.item.link;
    }, function(newVal) {
      vm.setSocialType(newVal);
    }, true);

    $timeout(function() {
      vm.thisForm = vm.indexCount ? $scope[vm.itemName][vm.indexCount] : $scope[vm.itemName];
      if (vm.indexCount >= 0) {
        vm.thisForm = $scope[vm.itemName][vm.indexCount];
      }
      else {
        vm.thisForm = $scope[vm.itemName];
      }
    });
  }

  socialLinksCtrl.$inject = ['$scope', '$filter'];
  function socialLinksCtrl($scope, $filter) {
    let vm = this;
    
    console.log(vm)
    console.log(vm.urls)
    vm.setLinks = function() {
      vm.links = [];
 
      angular.forEach(vm.urls, function(value) {
        var linkRes = '';
        var fontIcn = {show: false};

        linkRes = $filter('buildUrl')(value.link);

        if (angular.equals(value.type, 'Reddit') || angular.equals(value.type, 'Slideshare')) {
          fontIcn.show = true;
          if (angular.equals(value.type, 'Reddit')) {
            fontIcn.icn = 'fa-reddit';
          }
          else if (angular.equals(value.type, 'Slideshare')) {
            fontIcn.icn = 'fa-slideshare';
          }
        }
        vm.links.push({
          url: linkRes,
          type: value.type,
          fontIcn: fontIcn
        });
      });
    };

    if (vm.watchUrls) {
      $scope.$watch(function() {
        return vm.urls;
      }, function() {
        vm.setLinks();
      }, true);
    }
    else {
      vm.setLinks();
    }
  }

  function IconFileName() {
    return function(type) {
      if(typeof type !== 'undefined' && type && type !== '') {
        if (angular.equals(type,'Personal') || angular.equals(type,'Website') || angular.equals(type,'Blog') || angular.equals(type,'Others')) {
          return 'assets/img/social-icon/website.png';
        }
        else {
          return 'assets/img/social-icon/' + type.toLowerCase() + '.png';
        }
      }
    }
  }
  function BuildUrl() {
    return function(input) {
        if (typeof input !== 'undefined' && input && input !== '') {
            if (input.match('^https?://') || input.match('^http?://')) {
                return input;
            } else {
                return '//' + input;
            }
        }
    };
}

  function BuildUrlComplete() {
    return function(input, secured) {
        if (typeof input !== 'undefined' && input && input !== '') {
            if (input.match('^https?://') || input.match('^http?://')) {
                return input;
            } else {
                if (secured) {
                    return 'https://' + input;
                } else {
                    return 'http://' + input;
                }
            }
        }
    };
}

  SetSocialFontIcon.$inject = [];
  function SetSocialFontIcon() {
    return function(list, identifier) {
      angular.forEach(list, function(value, key) {
        if (angular.equals(value[identifier], 'G+')) {
          list[key].icon = 'fa-google-plus';
        }
        else if (angular.equals(value[identifier], 'StackOverflow')) {
          list[key].icon = 'fa-stack-overflow';
        }
        else if (angular.equals(value[identifier], 'Youtube')) {
          list[key].icon = 'fa-youtube-play';
        }
        else if (angular.equals(value[identifier], 'Personal') || angular.equals(value[identifier], 'Website') || angular.equals(value[identifier], 'Blog') || angular.equals(value[identifier], 'Others')) {
          list[key].icon = 'fa-link';
        }
        else {
          list[key].icon = 'fa-' + value[identifier].toLowerCase();
        }
      });

      return list;
    }
  }

  angular.module('social-accounts', [
    'ui.bootstrap'
  ])
  .filter('iconFileName', IconFileName)
  .filter('setSocialFontIcon', SetSocialFontIcon)
  .filter('buildUrlComplete',BuildUrlComplete)
  .filter('buildUrl',BuildUrl)
  .component('socialFields', socialFields)
  .component('socialItem', socialItem)
  .component('socialLinks', socialLinks);
})();

angular.module('app.topnav', [])

.directive('topNav', ['$consts', '$resource', '$state',
  function($consts, $resource, $state) {

    function link(scope, element, attrs) {
      scope.categories = $consts.category;
      scope.guides = $consts.shoppingGuide;
      var Cached = $resource('/api/cached');
      var Product = $resource('/api/product');

      console.log($state);
      scope.getCached = function(val) {
        return Cached.get({
          search_value: val
        }).$promise.then(function(res) {
          var remember = [];
          angular.forEach(res.data, function(item) {
            remember.push(item.value);
          });
          console.log(remember);
          return remember;
        });
      };
      scope.selectMatch = function(item) {
        $state.go('search', {
          search_title: item
        });
      };


      scope.searchproduct = function(){
        if(!scope.selected){
          return;
        }
        $state.go('search', {
          search_title: scope.selected
        });
      };
    }
    return {
      restrict: 'E',
      templateUrl: 'com/topnav.tpl.html',
      link: link,
      scope: {
      }
    };
  }
])

;

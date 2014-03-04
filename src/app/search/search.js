angular.module('app.search', [
  'ui.router'
])

.config(function config($locationProvider, $stateProvider) {
  $stateProvider
    .state('search', {
      url: '/search/:search_title',
      views: {
        main: {
          controller: 'SearchCtrl',
          templateUrl: 'category/category.tpl.html'
        }
      },
      data: {}
    });
})

.controller('SearchCtrl', function($scope, $state, catalog) {
  var search_title = $state.params.search_title;
  $scope.options = {
    per_page: 12,
    search_title: search_title
  };

   $scope.catalog = catalog;
    $scope.colornumber = 5;
    $scope.colordisplay = true;
    $scope.colormore = function(){
        $scope.colornumber = catalog.color.length;
        $scope.colordisplay = false;
    };

    $scope.colorless = function(){
        $scope.colornumber = 5;
        $scope.colordisplay = true;
    };
});

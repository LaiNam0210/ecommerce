angular.module('app.category', [
    'ui.router'
])

.config(function config($locationProvider, $stateProvider) {
    $stateProvider
        .state('category', {
            url: '/category/:catid',
            views: {
                main: {
                    controller: 'CategoryCtrl',
                    templateUrl: 'category/category.tpl.html'
                }
            },
            data: {}
        });
})

.controller('CategoryCtrl',function($scope, $state, $resource, catalog) {
    var current_catid = $state.params.catid;

    $scope.options = {
        per_page: 12,
        search_catid: current_catid
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
angular.module('app', [
    'app.blockcategory',
    'app.details',
    'app.home',
    'app.homeLeft',
    'app.homeRight',
    'app.lib',
    'app.topnav',
    'ngSanitize',
    'templates',
    'ui.bootstrap',
    'ui.router',
    'ngResource',
    'app.detail',
    'app.minimumDirective',
    'app.category',
    'category.directive',
    'app.search',
    'leftfilter',
])

.config(function($locationProvider, $stateProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(false);
    $urlRouterProvider.otherwise('/');

})

.run(function run() {

})

.controller('AppCtrl', function AppCtrl($scope, $state) {

    $scope.$on('$stateChangeSuccess', function(event, toState, toParams,
        fromState, fromParams) {
        var pageTitle = toState.data.pageTitle;
        if (typeof pageTitle == 'string') {
            $scope.pageTitle = toState.data.pageTitle + ' | Sendo Project';

        } else if (typeof pageTitle == 'function') {
            $scope.pageTitle = pageTitle(toParams) + ' | Sendo Project';

        } else {
            $scope.pageTitle = 'Sendo Project';
        }
    });
});
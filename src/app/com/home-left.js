angular.module('app.homeLeft', [])

.directive('sendoLeft', function() {
    // body...
    function link(scope, elem, atrrs) {
    }
    return {
        restrict: 'EA',
        templateUrl: 'com/home-left.tpl.html',
        link: link,
        scope: {},
    };
});
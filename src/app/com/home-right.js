angular.module('app.homeRight', [])

.directive('sendoRight', ['$details',
    function($details) {
        // body...
        function link(scope, elem, atrrs) {

            scope.blockcats = $details.titleCategoryHome;
        }
        return {
            restrict: 'EA',
            templateUrl: 'com/home-right.tpl.html',
            link: link,
            scope: {},
        };
    }
]);
angular.module('app.blockcategory', [])

.directive('blockCategory', ['$resource',
    function($resource) {
        // body...
        function link(scope, elem, atrrs) {
            var Products = $resource('/api/product');
            var blockcats = scope.blockcats;

            var id = blockcats._id[blockcats._id.length - 1];

            var products = Products.get({
                per_page: 8,
                search_catid: id
            }, function() {
                scope.products = products;
            });

        }

        return {
            restrict: 'A',
            templateUrl: 'blockcategory/blockcate.tpl.html',
            link: link,
            scope: {
                blockcats: '=blockcat'
            }
        };
    }
])
    .directive('blockProduct', function() {
        function link(scope, elem, attrs) {

        }
        return {
            restrict: 'A',
            templateUrl: 'blockcategory/blockproduct.tpl.html',
            link: link,

        };
    });
angular.module('category.directive', [])

.directive('categorySendo', function($resource) {

  function link(scope, elem, attrs) {

    var Product = $resource('/api/product');
    scope.per_page = scope.options.per_page + 1;

    function reload(options) {
      console.log('reloaded', options);
      var products = Product.get(
        options, function() {
          scope.products = products;
        });
    }

    reload(scope.options);

    scope.freeship = function($event) {

      var checkbox = $event.target;
      if (!checkbox.checked) {
        delete scope.options.search_freeship;
        reload(scope.options);
        return;
      }
      scope.options.search_freeship = 1;
      reload(scope.options);
    };

    scope.$watch('products.pagePlusOne', function(page_1) {
      if (!page_1) {
        return;
      }

      page = page_1;
      page = isFinite(page) ? page : 0;
      scope.options.page = page;

      var products = Product.get(scope.options, function() {
        scope.products = products;
        //assign pagePlusOne
        products.pagePlusOne = page_1;
      });
    });
  }
  return {
    restrict: 'A',
    link: link,
    templateUrl: 'category/directive/category.tpl.html',
    scope: {
      options: '=options'
    }
  };
});

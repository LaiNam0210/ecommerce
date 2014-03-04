angular.module('app.minimumDirective', [])

.directive('shopFreeDetail', function() {

  function link(scope, elem, attrs) {

    console.log(scope, elem,attrs);
    scope.discount = 1;
    console.log('shop-free-detail');

  }
  return {
    restrict: 'EA',
    link: link,
    templateUrl: 'shop-free-detail/shop-free-detail.tpl.html',
    scope: {}
  };
});

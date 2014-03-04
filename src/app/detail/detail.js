angular.module('app.detail', [
  'ui.router'
])

.config(function config($locationProvider, $stateProvider) {
  $stateProvider
    .state('detail', {
      url: '/detail/:productid',
      views: {
        main: {
          controller: 'DetailCtrl',
          templateUrl: 'detail/detail.tpl.html'
        }
      },
      data: {

      }
    });
})

.controller('DetailCtrl', function($scope, $state, $resource) {

  var productid = $state.params.productid;
  var Product = $resource('/api/product/' + productid);

  Product.get({}, function(product) {
    //Handle product
    if(!product){
      $scope.exist = false;
      return;
    }
    $scope.exist = true;
    console.log(product);
    $scope.product = product;
    $scope.technical = false;
  });
});

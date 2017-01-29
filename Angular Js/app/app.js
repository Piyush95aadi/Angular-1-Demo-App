var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider){

  $routeProvider
  .when('/home', {
    templateUrl: 'views/home.html'
  })
  .when('/ninjas', {
    templateUrl: 'views/ninjas.html',
    controller: 'NinjaController'
  }).otherwise({
    redirectTo: '/home'
  })

}]);

myApp.run(function(){

});

myApp.controller("NinjaController", ['$scope', '$http', function($scope, $http){
  // $scope.message = "Hey you all";
  $scope.removeNinja = function(ninja){
    var removedNinja = ninjas.indexOf(ninja);
    ninjas.splice(removedNinja, 1);
  };

  $scope.addNinja = function(){

    $scope.ninjas.push({
      name: $scope.newNinja.name,
      belt:$scope.newNinja.belt,
      rate: parseInt($scope.newNinja.rate),
      available: true
    });
    $scope.newNinja.name = "";
    $scope.newNinja.belt = "";
    $scope.newNinja.rate = "";

  };
  $http.get('data/ninjas.json').then(function(response){
    console.log(response);
    $scope.ninjas = response.data;
  });

  // $scope.ninjas = ninjas;
}]);

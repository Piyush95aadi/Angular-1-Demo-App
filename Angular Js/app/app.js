var myApp = angular.module('myApp', ['ngRoute', 'ngAnimate']);
myApp.controller("contactController", ['$scope', '$location', function($scope, $location){
  $scope.sendMessage = function(){
    $location.path("contact-success");
  };
}]);
myApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){

  $locationProvider.html5Mode(true);

  $routeProvider
  .when('/home', {
    templateUrl: 'views/home.html',
    controller: 'NinjaController'
  })
  .when('/contact', {
    templateUrl: 'views/contact.html',
    controller: 'contactController'
  })
  .when('/contact-success', {
    templateUrl: 'views/contact-success.html',
    controller: 'contactController'
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
myApp.directive('randomNinja', [function(){

return {
  restrict: 'E',
  scope: {
    ninjas: '=',
    title: '='
  },
  templateUrl: 'views/random.html',
  transclude: true,
  replace: true,
  // template: '<p>Ninja of the day is {{ninjas[random].name}}</p>',
  controller: function($scope){
    $scope.random = Math.floor(Math.random() * 4);
  }
};

}])
myApp.controller("NinjaController", ['$scope', '$http', function($scope, $http){
  // $scope.message = "Hey you all";


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
  $scope.removeNinja = function(ninja){
    var removedNinja = $scope.ninjas.indexOf(ninja);
    $scope.ninjas.splice(removedNinja, 1);
  };
  $scope.removeAll = function(){
    $scope.ninjas = [];
  };
  // $scope.ninjas = ninjas;
}]);

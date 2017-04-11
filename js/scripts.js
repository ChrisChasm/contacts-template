angular.module('app', ['ngRoute'])
  .config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
        .when('/contacts/', {
          templateUrl: myLocalized.partials + 'main.html',
          controller: 'Main'
        })
        .when('/contacts/:slug', {
          templateUrl: myLocalized.partials + 'content.html',
          controller: 'Content'
        })
  })
  .controller('Main', function($scope, $http, $routeParams) {
    console.log('Main file loaded.');
    $http.get("wp-json/wp/v2/contacts/").then(data=>{
      console.log(data)
      $scope.contacts = data.data
      console.log($scope.contacts)})
  })
  .controller('Content',
    ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
      $http.get('wp-json/wp/v2/contacts/' + $routeParams.slug).then(function(res){
        console.log(res)
        $scope.contact = res.data
      });
    }
    ]
);

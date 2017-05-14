var app = angular.module('app', ['ngRoute']);
app.config(['$routeProvider','$httpProvider',
    function($routeProvider,$httpProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'partials/login.html',
            }).
            when('/index', {
                templateUrl: 'partials/index.html',
            }).otherwise({ redirectTo: '/' });
            // $httpProvider.interceptors.push('authInterceptor');
    }
]);
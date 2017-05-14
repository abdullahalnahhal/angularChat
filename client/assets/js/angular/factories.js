app.factory('authInterceptor', function ($q, $window, $location) {
	if ($window.sessionStorage.username) {
		$location.path('/index').replace();
		return true;
	}
	else{
		$location.path('/').replace();
		return false;
	}
});
app.service("socket",['$window','$location',function($window,$location){
	var socket = io.connect('http://localhost:3000');
	var logout = function(id){
		socket.emit("Logout",{id:id});
		delete $window.sessionStorage['username'];
		delete $window.sessionStorage['password'];
		delete $window.sessionStorage['id'];
		$location.path('/').replace();
	}
	return {
		socket : socket,
		logout : logout
	};
}]);
app.service("pageControl",['$window','$location',function($window,$location){
	var login = function(username , password , id){
		$window.sessionStorage['username'] = username;
		$window.sessionStorage['password'] = password;
		$window.sessionStorage['id'] = id;
		$location.path('/index').replace();
	}
	return{
		login:login
	}
}]);
app.controller("MainController",['$scope','$window','$location','socket',function($scope,$window,$location,socket){
		$scope.id =$window.sessionStorage['id'];
		$scope.username = $window.sessionStorage['username'];
		$scope.users = [];
		socket.socket.emit("GetUsers",{id:$scope.id});
		socket.socket.on("OtherUsers",function(data){
			$scope.users = data;
			$scope.$apply();
		});
		socket.socket.on("AddUser",function(data){
			$scope.users.push(data);
			$scope.$apply();
		});
		socket.socket.on("RemoveUser",function(data){
			for(element in $scope.users){
				if($scope.users[element].id == data.id){
					$scope.users.splice(element, 1);
					$scope.$apply();
				}
			}
		});
		$scope.active_user = "";
		$scope.msgs = [];
		$scope.logout = function(){
			socket.logout($window.sessionStorage['id'])
		}
		$scope.active = function(id){
			$scope.active_user = id;
			$scope.msgs = [];
			// socket.socket.emit("GetMessages",{me:$scope.id , other:id});
		}
		$scope.send = function(){
			if ($scope.active_user == "") {
				$window.alert("يجب عليك اختيار المستخدم أولا");
			}
			else{
				msg = {msg:$scope.msg , from:$scope.id , to:$scope.active_user};
				$scope.msgs.push(msg);
				socket.socket.emit("SendMessage",msg);
				$scope.msg = "";
				$scope.$apply();
			}
		}
}]);
app.controller("LoginController",['$scope','$window','$location','socket','pageControl',function($scope,$window,$location,socket,pageControl){
		var socket = socket.socket;
		$scope.exist = false;
		$scope.wrong_password = false;
		$scope.no_user = false;
		$scope.login = function(){
			socket.emit("Authenticate",{username : $scope.username , password : $scope.password});
		}
		$scope.register = function(){
			socket.emit("Register",{username : $scope.username , password : $scope.password});
		}
		socket.on("Authenticate", function(data){
			if (data.username == true && data.password == false) {
				$scope.wrong_password = true;
			}
			else if (data.username == true && data.password == true) {
				pageControl.login($scope.username , $scope.password , data.id);
			}
			else{
				$scope.no_user = true;
			}
		})
		socket.on("Registered", function(data){
			pageControl.login(data.username , data.password , data.id);
		});
		socket.on("RegisterFail",function(data){
			$scope.exist = true;
		});
}]);

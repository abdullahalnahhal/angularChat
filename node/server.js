var app = require('express')();
var http = require('http');
var querystring = require('querystring');
var server = http.Server(app);
var io = require('socket.io')(server);
var presence = require("./custom_modules/presence.js").presence();
var rest = require("./custom_modules/rest.js").rest(http,querystring);
var notify = require("./custom_modules/notify.js").notify(io,presence);
var auth = require("./custom_modules/authenticate.js").auth(rest,presence,notify);

server.listen(3000, function(){
  console.log('listening on *:3000');
});
io.on('connection', function(socket){
	socket.on("Register",function(data){
		rest.request("post","/phpchat/users/register",data,function(res){
			presence.set_user(res , data.username ,data.password , socket.id);
			if (!presence.searchUserById(res)) {
				notify.oneToAll(res , "AddUser" ,{id:res, username:data.username , password:data.password ,socket_id:socket.id});
			}
			socket.emit("Registered",{id:res});
		},function(res){
			if (res == "username") {
				socket.emit("RegisterFail","username");
			}
		});
	});
	socket.on("Authenticate",function(data){
		auth.login(socket,data);
	});
	socket.on("GetUsers",function(data){
		users = presence.getUsersById(data.id);
		socket.emit("OtherUsers",users);
	});
	socket.on("Logout",function(data){
		presence.remove_user(data.id);
		notify.oneToAll(data.id , "RemoveUser" ,{id:data.id});
	});
	socket.on("GetMessages",function(data){
		rest.request("post","/phpchat/chat/getChat",data,function(res){
			console.log(res);
		});
	});
	socket.on("SendMessage",function(data){
		rest.request("post","/phpchat/chat/sendChat",data,function(res){
			console.log(res);
		},function(){
			console.log("FAILD")
		});
	});
});
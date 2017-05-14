function auth (rest,presence,notify){
	function login(socket , data){
		rest.request("post","/phpchat/users/login",data,function(res){
			if(!presence.searchUserById(res)){
				presence.set_user(res,data.username,data.password,socket.id);
				notify.oneToAll(res , "AddUser" ,{id:res , username:data.username , password:data.password ,socket_id:socket.id});
			}
			socket.emit("Authenticate" , { id:res , username:true , password:true});
		},function(res){

			if (res == "noUser") {
				msg = {username:false , password:false};
			}
			else{
				msg = {username:true , password:false};
			}
			socket.emit("Authenticate" , msg);
		})
	}
	return{
		login:login
	}
}
module.exports = {
	auth : auth
}
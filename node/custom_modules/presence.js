function presence()
{
	var online_users = {};
	var set_user = function(id,username,password,socket_id)
	{
		if (!search_by_name(username)) 
		{
			online_users[id] = {username : username , id : id ,password : password,socket_id : socket_id};
		}
		else
		{
			online_users[id] = {username : username , id : id ,password : password ,socket_id : socket_id};
		}
		return online_users[id];
	}
	var get_all_out_client = function()
	{
		clients = {};
		for (element in online_users) 
		{
			if (online_users[element].type == "out_client") 
			{
				clients[element] = online_users[element];
			}
		}
		return clients;
	}

	var remove_user = function (id){
		delete online_users[id];
		return online_users;
	}
	var search_by_name = function (user_name){
		for (users in online_users) {
			if (online_users[users].user_name == user_name) 
			{
				return online_users[users];
			}			
		}
		return false;
	}
	var getUsersById = function (id){
		users=[];
		for(element in online_users){
			if (element != id ) {
				users.push(online_users[element]);
			}
		}
		return users;
	}
	var searchUserById = function(id){
		if (online_users[id]) {
			return online_users[id];
		}
		else{
			return false;
		}
	}
	return{
		online_users : online_users,
		set_user : set_user,
		get_all_out_client : get_all_out_client,
		remove_user : remove_user,
		getUsersById : getUsersById,
		searchUserById : searchUserById
	};
}
module.exports = {
	presence : presence
}
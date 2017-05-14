function notify (io,presence){
	var oneToAll = function (id, event , msg){
		all = presence.getUsersById(id);
		for (element in all) 
		{
			socket_id = all[element].socket_id;
			io.to(socket_id).emit( event, msg );
		}
	}
	return {
		oneToAll : oneToAll
	}
}
module.exports = {
	notify : notify
}
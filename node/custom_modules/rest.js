function rest(http,querystring){
	function request(type,path,data,successCb,failCb){
		var data = querystring.stringify(data);
		options = {
			hostname: 'localhost',
			port: 80,
			path: path,
			method: type ,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
        		'Content-Length': Buffer.byteLength(data)
			}
		}

		req = http.request(options,function(res){
			res.setEncoding('utf8');
			if (res.statusCode == 200) {
				res.on("data",function(id){
					successCb(id);
				});
			}
			else{
				res.on("data",function(chunck){	
					failCb(chunck);
				});
			}
		});
		req.write(data);
		req.end();
	}
	return {
		request : request
	}
}
module.exports = {
	rest : rest
}
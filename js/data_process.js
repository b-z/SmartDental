var serverIP = "http://59.66.137.51:8000"

function GetJsonSuccess (jsonData){
	// console.log(jsonData);
	data = eval('('+jsonData+')');
	// console.log(data);
}

function SetJsonSuccess (jsonData){
}

function get_global_data() {
	var res = [];
	for (var i = 0; i < data[global_subject].length; i++) {
		var temp = $.extend(true, {}, data[global_subject][i]);
		res.push(temp);
	}
	return res;
}

function get_database() {
	//if (!localStorage.getItem('json')) {
		//data = json;
		//localStorage.setItem('json', JSON.stringify(data));
	//} else {
	$.post(serverIP+"/getJson","nomeaning",GetJsonSuccess,"text");
	//}
}

function modify_post(msgid, key, value) {
	data[global_subject][msgid][key] = value;
	$.post(serverIP+"/updateJson",JSON.stringify(data),SetJsonSuccess,"text");
	//localStorage.setItem('json', JSON.stringify(data));
}

function modify_post_response(msgid, responseid, key, value) {
	data[global_subject][msgid]['responses'][responseid][key] = value;
	$.post(serverIP+"/updateJson",JSON.stringify(data),SetJsonSuccess,"text");
	//localStorage.setItem('json', JSON.stringify(data));
}

function add_post(msg) {
	var new_msg = {
		type : global_subject,
		title : msg.title,
		time : msg.time,
		author : msg.author,
		img : msg.img,
		favor : msg.favor,
		content : msg.content,
		responses : msg.responses
	};
	
	data[global_subject].push(new_msg);
	$.post(serverIP+"/mergeJson",JSON.stringify(new_msg),SetJsonSuccess,"text");
	//localStorage.setItem('json', JSON.stringify(data));
}

function add_post_response(msgid, response) {
	var new_res = {
		author : response.author,
		img : response.img,
		time : response.time,
		favor : response.favor,
		content : response.content
	};
	
	data[global_subject][msgid]['responses'].push(new_res);
	$.post(serverIP+"/updateJson",JSON.stringify(data),SetJsonSuccess,"text");
	//localStorage.setItem('json', JSON.stringify(data));
}

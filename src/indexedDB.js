//server Object
function serverObj() {
	this.ip = "";
	this.company = "";
	this.staff = [];
	this.country = "";
	this.city = "";
}

function staffObj(firstName,lastName,phone,position) {
	this.firstName = firstName;
	this.lastName = lastName;
	this.phone = phone;
	this.position = position;
}

function genServers() {
	var servers = [];
	indexedDB.deleteDatabase('serverList')
	for (var i = 0;i < 100;i++) {
		servers[i] = new serverObj;
		servers[i].ip = chance.phone();
		servers[i].company = chance.word() + "." + chance.tld();
		servers[i].country = chance.country();
		servers[i].city = chance.city();
		servers[i].staff.push({first:chance.first(),last:chance.last(),phone:chance.phone,position:"Manager"});
		servers[i].staff.push({first:chance.first(),last:chance.last(),phone:chance.phone,position:"Administrator"});
		//servers[i].staff.push(new staffObj(chance.first(),chance.last(),chance.phone,"Manager"));
		//servers[i].staff.push(new staffObj(chance.first(),chance.last(),chance.phone,"Administrator"));
	}
	console.log(JSON.stringify(servers[4]));
	var db;
	var request = window.indexedDB.open("serverList", 5);
	 
	request.onerror = function(event) {
		console.log("error: ");
	};
	 
	request.onsuccess = function(event) {
		db = request.result;
		console.log("success: " + db);
	};
	 
	request.onupgradeneeded = function(event) {
		var db = event.target.result;
		var objectStore = db.createObjectStore("servers", {autoIncrement: true});
		for (var i in servers) {
		        objectStore.add(servers[i]);      
		}
	}	
}

function indexedDBCheck() {
	if (!window.indexedDB) {
    	window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
	}
	else {
		return true;
	}
	
}


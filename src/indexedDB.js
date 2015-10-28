//server Object
function Server(data) {
	this.ip = data.ip;
	this.owner = data.owner;
	this.hostName = data.hostName;
	this.type = data.type;
}

function Company(data) {
	this.companyName = data.companyName;
	this.county = data.county;
	this.city = data.city;
	this.owner = data.owner;
	this.admin = data.admin;
}

function Person(data) {
	this.sinNum = data.sinNum;
	this.first = data.first;
	this.last = data.last;
	this.birthDate = data.birthDate;
	this.status = data.status;
	this.employer = data.employment;
	this.jobTitle = data.jobTitle;
	this.workPhone = data.workPhone;
	this.homePhone = data.homePhone;
}

function genServers() {
	var servers = [];
	var companies = [];
	var people = [];
	for (var i = 0;i < 100;i++) {
		//Create a company
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
}

function initDatabase() {
	indexedDB.deleteDatabase('company');
	indexedDB.deleteDatabase('people');
	indexedDB.deleteDatabase('servers');
	indexedDB.deleteDatabase('DataTable');
	/*if(db.objectStoreNames.contains("company")) {
		db.deleteObjectStore("company");
  	}
  	if(db.objectStoreNames.contains("people")) {
		db.deleteObjectStore("people");
  	}
  	if(db.objectStoreNames.contains("servers")) {
		db.deleteObjectStore("servers");
  	}*/


	var db;
	var request = window.indexedDB.open("DataTable", 2);
	 
	request.onerror = function(event) {
		console.log("error: ");
	};
	 
	request.onsuccess = function(event) {
		db = request.result;
		console.log("success: " + db);
	};
	 
	request.onupgradeneeded = function(event) {
		var db = event.target.result;

		var objectStore = db.createObjectStore("Test", {autoIncrement: true});
		var complexObject = new Server({ip: "192.168.0.1",owner: "unknonwn",hostName:"localHost",type:"Public Access Server"});
		objectStore.add({testData: "Test", testArray: [complexObject,complexObject,complexObject,complexObject,complexObject], testObject: complexObject}); 
		objectStore.add({testData: "Test2", testArray: [12,13,14,56,78], testObject: {test2: "Hello World2"}});      
		objectStore.add({testData: "Test3", testArray: [12,13,14,56,78], testObject: {test2: "Hello World3"}});      
		objectStore.add({testData: "Test4", testArray: [12,13,14,56,78], testObject: {test2: "Hello World4"}});   

		var objectStoreCompany = db.createObjectStore("company", {autoIncrement: true});
		var company = new Company({companyName: "Sample Company",city: "Test",owner: "Test",admin: "Test",county: "test"})
		objectStoreCompany.add(company); 

		var objectStorePerson = db.createObjectStore("people", {autoIncrement: true});
		var person = new Person({firstName: "Sample", lastName: "Person"})
		objectStorePerson.add(person); 

		var objectStoreServer = db.createObjectStore("servers", {autoIncrement: true});
		var server = new Server({ip: "0.0.0.0"})
		objectStoreServer.add(server);         
	}
}

function addCompany() {
	var db;
	var request = window.indexedDB.open("DataTable");
	request.onsuccess = function(event)
	{
		var idb = event.target.result;
		var trans = idb.transaction('company', 'readwrite');
		var store = trans.objectStore('company');
	 
		// add
		var company = new Company({companyName: chance.companyName() ,city: chance.city(),owner: "",admin: "",county: chance.country({full: true})})
		var requestAdd = store.add(company);
	 
		requestAdd.onsuccess = function(event) {
		    // do something
		    console.log('Company added' + event);
		}
	 
		requestAdd.onfailure = function(event) {
		    // failed
		    console.log('Company FAILED TO ADD' + event);
		}
	}
	request.onerror = function(event) {
		console.log("error: ");
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


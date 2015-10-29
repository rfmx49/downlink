function indexedDBCheck() {
	if (!window.indexedDB) {
    	window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
	}
	else {
		return true;
	}	
}

function initDatabase() {
	//delete old datbase
	indexedDB.deleteDatabase(_DataBaseName);

	var db;
	var request = window.indexedDB.open(_DataBaseName, 2);
	 
	request.onerror = function(event) {
		console.log("error: ");
	};
	 
	request.onsuccess = function(event) {
		db = request.result;
		console.log("success: " + db);
	};
	 
	request.onupgradeneeded = function(event) {
		var db = event.target.result; 

		var objectStoreCompany = db.createObjectStore("company", {autoIncrement: true});
		//var company = new Company()
		//objectStoreCompany.add(company); 

		var objectStorePerson = db.createObjectStore("people", {autoIncrement: true});
		objectStorePerson.createIndex('firstIndex', 'first', {unique: false});
		objectStorePerson.createIndex('lastIndex', 'last', {unique: false});
		objectStorePerson.createIndex('employerIndex', 'employer', {unique: false});
		objectStorePerson.createIndex('sinIndex', 'sinNumber', {unique: false});
		//var person = new Person()
		//objectStorePerson.add(person); 

		var objectStoreServer = db.createObjectStore("servers", {autoIncrement: true});
		//var server = new Server()
		//objectStoreServer.add(server);         
	}
}

function addCompany() {
	var db;
	var request = window.indexedDB.open(_DataBaseName);
	request.onsuccess = function(event)
	{
		var idb = event.target.result;
		var trans = idb.transaction('company', 'readwrite');
		var store = trans.objectStore('company');
	 
		// add
		var company = new Company({companyName: chance.companyName(), industry: chance.companyIndustry() ,city: chance.city(),owner: "",admin: "",county: chance.country({full: true})})
		var requestAdd = store.add(company);
	 
		requestAdd.onsuccess = function(event) {
		    // do something
		    console.log('Company added ID: ' + event.target.result);
		    
		    //add base servers
		    addCompanyServers({owner: event.target.result, hostName: "Public-Access", type:"company-public", network:"internet"});
		    addCompanyServers({owner: event.target.result, hostName: "internalServer", type:"company-internal", network:"internet"});

		    //add base staff(admin/manager)
		    addCompanyStaff({type: "adult", status: "Active", employer: event.target.result, jobTitle: "Administrator"})
		    addCompanyStaff({type: "adult", status: "Active", employer: event.target.result, jobTitle: "Manager"})
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

function addCompanyServers(data) {
	
	var db;
	var request = window.indexedDB.open(_DataBaseName);
	request.onsuccess = function(event)
	{
		var idb = event.target.result;
		var trans = idb.transaction('servers', 'readwrite');
		var store = trans.objectStore('servers');
	 
		// Add Server
		var server = [];
		var server = new Server({ip: chance.ip() ,owner: data.owner, hostName: data.hostName ,type: data.type ,network: data.network})
		var requestAdd = store.add(server);
	 
		requestAdd.onsuccess = function(event) {
		    // do something
		    console.log('server added ID: ' + event.target.result)		    
		}
	 
		requestAdd.onfailure = function(event) {
		    // failed
		    console.log('server FAILED TO ADD' + event);
		}
	}
	request.onerror = function(event) {
		console.log("error: ");
	}	
}

function addCompanyStaff(data) {

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
	
	var db;
	var request = window.indexedDB.open(_DataBaseName);
	request.onsuccess = function(event)
	{
		var idb = event.target.result;
		var trans = idb.transaction('people', 'readwrite');
		var store = trans.objectStore('people');
	 
		// Add Person
		var person = [];
		var person = new Person({sinNum: chance.ssn({canadaSin: true}) ,first: chance.first(), last: chance.first() ,birthDate: chance.birthday({string: true, american: false, type: data.type}) ,status: data.status, employer: data.employer, jobTitle: data.jobTitle,workPhone: chance.phone(),homePhone: chance.phone()})
		var requestAdd = store.add(person);
	 
		requestAdd.onsuccess = function(event) {
		    // do something
		    console.log('person added ID: ' + event.target.result)		    
		}
	 
		requestAdd.onfailure = function(event) {
		    // failed
		    console.log('person FAILED TO ADD' + event);
		}
	}
	request.onerror = function(event) {
		console.log("error: ");
	}	
}

//Look Ups
//Look Ups
//Look Ups

function getCompany(options) {
	if (typeof options === 'undefined') { return false; }
	
	var db;
	var requestOpen = window.indexedDB.open(_DataBaseName);
	requestOpen.onsuccess = function(event)
	{
		var idb = event.target.result;
		var trans = idb.transaction('company', 'readonly');
		var store = trans.objectStore('company');
	 
		// get
		var requestGet = store.get(options.key);
	 
		requestGet.onsuccess = function(event) {
		    console.log('Company retreived.' + event);
		    return event.target.result;
		}
		 	
		requestGet.onfailure = function(event) {
		    // failed
		    console.log('Company FAILED TO GET' + event);
		}
	}
	requestOpen.onerror = function(event) {
		console.log('error getting company');
	}	
}

function searchPerson(options) {
	if (typeof options === 'undefined') { return false; }
	//options = {last: "", first: "", sinNumber: "", employer: ""}
	
	if (typeof options === 'undefined') { return false; }
	
	var db;
	var requestOpen = window.indexedDB.open(_DataBaseName);
	requestOpen.onsuccess = function(event)
	{
		var idb = event.target.result;
		var trans = idb.transaction('people', 'readonly');
		var store = trans.objectStore('people');
	 
		// get
		var index = store.index('firstIndex');
		var result = index.openCursor(IDBKeyRange.only(options.first));
	 	//var result = index.openCursor
		result.onsuccess = function(event) {
			var cursor = event.target.result;
			if (cursor) {
				console.log('person retreived.' + JSON.stringify(event.target.result.value));
				//return event.target.result;
				cursor.continue();
			};
		}	 	
		result.onfailure = function(event) {
		    // failed
		    console.log('person FAILED TO find' + event);
		}
	}
	requestOpen.onerror = function(event) {
		console.log('error getting company');
	}	
}


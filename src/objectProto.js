//server Object
function Server(data) {
	this.ip = data.ip;
	this.owner = data.owner;
	this.hostName = data.hostName;
	this.type = data.type;
	this.network = data.network; //LAN WAN/Intranet  Internet
}

function Company(data) {
	this.companyName = data.companyName;
	this.county = data.county;
	this.city = data.city;
	this.owner = data.owner;
	this.admin = data.admin;
	this.industry = data.industry;
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

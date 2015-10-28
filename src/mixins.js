function initMixins() {

	chance.mixin({
		'companyName': function() {
			return chance.last() + " " + chance.pick(['SP','GP','LP','Corporation','Joint Venture','Limited','Incorporated','Ltd.','Corp.','Inc.','Company.']);
		}
	});

}
		

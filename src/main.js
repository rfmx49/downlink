//GLOBAL VARIBLES

var _DataBaseName;
_DataBaseName = 'TestData';

var colourPalette = {};
colourPalette= { toolBar: { 
					backGround: '375C8C',
					border: '7E9DA8',
					button: { 
						inactive: '3E71B3',
						hover: '5A79A1',
						border: '000000',
						borderHover: 'D5F8FB',
						active: '8FB0BF'
					},
					popup: {
						inactive: '8FB0BF',
						border: 'D5F8FB',
						hover: '9BDAF2',
						borderHover: '000000'
						}
					}
				}


function DEBUGgenCompanies(amount) {
	for (var i = 0;i < amount;i++) {
		addCompany();
	}
}

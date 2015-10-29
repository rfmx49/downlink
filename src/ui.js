function createUi() {
	$( "#bodyToolBar" ).draggable({containment: "#bodyContain", scroll: false});
}

function textToArray() {
	var arrayOfLines = $('#texttoarray').val().split('\n');
	console.log(JSON.stringify(arrayOfLines));
}

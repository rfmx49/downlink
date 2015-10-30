function createUi() {
	//creeate toolbar Items
	createToolBar();
	var toolBarItems = 9;
	$( "#bodyToolBar" ).draggable({containment: "#bodyContain", scroll: false});
	var toolBarHeight = $( "#bodyToolBar" ).height();
	var toolBarWidth = $( "#bodyToolBar" ).width();
	
	$('.appMenuLarge').css({"height": toolBarHeight + "px", "width": (((toolBarWidth/toolBarItems)*2) - (toolBarWidth*.04)) + "px"});
	$('.appMenuSmall').css({"height": (toolBarHeight/2) + "px", "width": (((toolBarWidth/toolBarItems)) - (toolBarWidth*.04)) + "px"});
	$('.appmenuEmpty').css({"height": (toolBarHeight/2) + "px"});
     //fix toolbar width
     $( "#bodyToolBar" ).css({width: ($('#toolBarButtons').width() + ($('#toolBarButtons').width()*.025)) + 'px', height: ($('#toolBarButtons').height()) + 'px'});

     //init button controls
     initColourPalette();
     initButtonControls();
}

function initButtonControls() {

	$( '#bodyToolBar' )
		.mousedown(function() {
			console.log('clicked ' + this.id);
			$("#appMenuPop").remove();
		});
	$( '.appMenuLarge, .appMenuSmall' )
		.click(function(event) {
			event.stopPropagation();
			console.log('clicked ' + this.id);
			toolBarButtonClick(this.id);
		})
		.mouseover(function() {
			$( this ).css({"background-color": colourPalette.toolBar.button.hover, "border-color": colourPalette.toolBar.button.borderHover});
		})
		.mouseout(function() {
			$( this ).css({"background-color": colourPalette.toolBar.button.inactive, "border-color": colourPalette.toolBar.button.border});
		});
}

function initColourPalette() {
	//$( this ).css({"background-color": "A9B0B3"});
	//Initial elements
	$("#bodyToolBar").css({"background-color": colourPalette.toolBar.backGround, "border-color": colourPalette.toolBar.border});
	$('.appMenuLarge, .appMenuSmall').css({"background-color": colourPalette.toolBar.button.inactive, "border-color": colourPalette.toolBar.button.border});
}

function createToolBar() {
	var numberOfMenuItems = 7;
	var toolBarHTML = 	'<table id="toolBarButtons"> \
							<tr> \
								<td colspan="2" rowspan="2"><div id="appMenu" class="appMenuLarge">M</div></td> \
								<td colspan="' + (numberOfMenuItems-2) + '"><div class="appmenuEmpty"></div></td> \
							</tr> \
							<tr>'
	for (var i = 1; i <= numberOfMenuItems; i++) {
		toolBarHTML = toolBarHTML + '<td><div id="app_' + i + '" class="appMenuSmall">' + i + '</div></td>'
	}
	toolBarHTML = toolBarHTML + '</tr></table>'
							
	$('#bodyToolBar').html("");
	$('#bodyToolBar').html(toolBarHTML);

	//position at bottom
	$('#bodyToolBar').css({"top":($('#bodyContain').height() - $('#bodyToolBar').height() * 2)+ "px"});
	
}

function textToArray() {
	var arrayOfLines = $('#texttoarray').val().split('\n');
	console.log(JSON.stringify(arrayOfLines));
}

function toolBarLocation() {
	var pos = {top: false, bot: false, left: false, right: false}
	var bodyHeight = $('#bodyContain').height();
	var toolBarTop = $("#bodyToolBar").offset().top + ($("#bodyToolBar").height()/2);
	var bodyWidth = $('#bodyContain').width();
	var toolBarLeft = $("#bodyToolBar").offset().left + ($("#bodyToolBar").width()/2);
	if (toolBarTop < (bodyHeight/2)) { 
		pos.top = true;
	} else { pos.bot = true; }
	if (toolBarLeft < (bodyWidth/2)) { 
		pos.left = true;
	} else { pos.right = true; }
	return pos;
}

function toolBarButtonClick(buttonID) {
	if (buttonID == 'appMenu') {
		if ($('#appMenuPop').length == 1) { 
			$("#appMenuPop").remove();
			return; 
		}
		$("#bodyToolBar").append('<div id="appMenuPop"></div>')
		var appMenuOrentation = toolBarLocation();
		var newTop = 0;
		var appMenuPopHTML= '<table class="popUpItemTable">\
						<tr class="popUpItemTr"><td id="popUpItem_8" class="popUpItem">Menu 8</td></tr>\
						<tr class="popUpItemTr"><td id="popUpItem_7" class="popUpItem">Menu 7</td></tr>\
						<tr class="popUpItemTr"><td id="popUpItem_6" class="popUpItem">Menu 6</td></tr>\
						<tr class="popUpItemTr"><td id="popUpItem_5" class="popUpItem">Menu 5</td></tr>\
						<tr class="popUpItemTr"><td id="popUpItem_4" class="popUpItem">Menu 4</td></tr>\
						<tr class="popUpItemTr"><td id="popUpItem_3" class="popUpItem">Menu 3</td></tr>\
						<tr class="popUpItemTr"><td id="popUpItem_2" class="popUpItem">Menu 2</td></tr>\
						<tr class="popUpItemTr"><td id="popUpItem_1" class="popUpItem">Menu 1</td></tr>\
				</table>'
		if (appMenuOrentation.bot) {
			appMenuPopHTML = '<table class="popUpItemTable">\
						<tr class="popUpItemTr"><td id="popUpItem_1" class="popUpItem">Menu 1</td></tr>\
						<tr class="popUpItemTr"><td id="popUpItem_2" class="popUpItem">Menu 2</td></tr>\
						<tr class="popUpItemTr"><td id="popUpItem_3" class="popUpItem">Menu 3</td></tr>\
						<tr class="popUpItemTr"><td id="popUpItem_4" class="popUpItem">Menu 4</td></tr>\
						<tr class="popUpItemTr"><td id="popUpItem_5" class="popUpItem">Menu 5</td></tr>\
						<tr class="popUpItemTr"><td id="popUpItem_6" class="popUpItem">Menu 6</td></tr>\
						<tr class="popUpItemTr"><td id="popUpItem_7" class="popUpItem">Menu 7</td></tr>\
						<tr class="popUpItemTr"><td id="popUpItem_8" class="popUpItem">Menu 8</td></tr>\
				</table>'
		}
		$("#appMenuPop").html(appMenuPopHTML);
		$("#appMenuPop").css({"position": "absolute", "width": ($('.appMenuSmall').width()*5 + 'px')});
		if (appMenuOrentation.bot) {
			newTop = $("#bodyToolBar").offset().top - $("#appMenuPop").offset().top - ($("#bodyToolBar").height()*1.15);
			$("#appMenuPop").css({"top": newTop + "px"});
		}/* else {
			newTop = $("#bodyToolBar").offset().top + $("#bodyToolBar").height();
			$("#appMenuPop").css({"top": newTop + "px"});
		}*/

		//apply css to popup.
		$("#appMenuPop").css({"background-color": colourPalette.toolBar.popup.inactive,"border-color": colourPalette.toolBar.popup.border, });
		$(".popUpItemTable").css({"width": "100%"});

		//add menuitem mouse events.
		$('.popUpItemTr')
			.click(function(event) {
				event.stopPropagation();
				console.log('clicked ' + this.id);;
			})
			.mouseover(function() {
				$( this ).css({"background-color": colourPalette.toolBar.popup.hover, "border-color": colourPalette.toolBar.popup.borderHover});
			})
			.mouseout(function() {
				$( this ).css({"background-color": colourPalette.toolBar.popup.inactive, "border-color": colourPalette.toolBar.popup.border});
			});
	} else {
		$("#appMenuPop").remove();
	}
}

function makeCastle() {
	//If the castle layer already exists, don't make it again, just reload it
	if ( typeof clayer == undefined) {

	} else {
		tlayer.hide();
		layer.hide();
		clayer.show();
	}
}

function hideAllLayersExcept(stage, layer) {
	for (var i = 0; i < stage.children.length; i++) {
		if (stage.children[i] == layer)
			stage.children[i].show();
		else
			stage.children[i].hide();
	}
}

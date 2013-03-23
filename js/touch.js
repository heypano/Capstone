function enableDraw(){
	drawingDisabled=false;
	stage.on("touchstart", startMove);
	stage.on("mousedown", startMove);
	stage.on("touchend", endMove);
	stage.on("mouseup", endMove);
}

function enableDebug(){
	if(levelState==2){
		stage.on("touchstart", startDebug);
		stage.on("mousedown", startDebug);

	}
}

function disableTouch(){
	drawingDisabled=true;
	stage.off("touchstart");
	stage.off("touchmove");
	stage.off("touchend");
	stage.off("mousedown");
	stage.off("mousemove");
	stage.off("mouseup");
}
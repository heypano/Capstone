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

function disableSideButtons(){
	$("#speakerButton").unbind("click");
	$("#castleButton").unbind("click");
	$("#enterButton").unbind("click");
}

function enableSideButtons(){
	$("#speakerButton").unbind("click");
	$("#castleButton").unbind("click");
	$("#enterButton").unbind("click");
	//Speaker
	$("#speakerButton").click(function(){
		var levelThing = levelState;
		if(inCastle)levelThing = "castle";
		else if(inProgram)levelThing = "program";
		speakerStuff(levelThing);

	});
	//Speaker
	$("#castleButton").click(function(){
		if(!inCastle){
			if(inProgram){
				removeProgram();
			}
			makeCastle();
		}
		else{
			removeCastle();
		}
	});
	$("#enterButton").click(function(){
		if(inProgram){
			removeProgram();
		}
		else{
			if(inCastle)removeCastle();
			makeProgram();
		}
	});
}

function speakerStuff(levelThing){
		if($("#speakerButton")[0][levelThing]>=3)$("#speakerButton").hide();
		else $("#speakerButton").show();
	
		if(typeof $("#speakerButton")[0][levelThing] == "undefined"){
			$("#speakerButton")[0][levelThing] = 1; // How many times has this been pressed
		}
		else{
			$("#speakerButton")[0][levelThing]++;
		}
		if(($("#speakerButton")[0][levelThing]) <=3 ){ // Don't play things more than twice
			soundManager.playSound("l"+levelThing,"speaker");
		}
		if($("#speakerButton")[0][levelThing]>=3)$("#speakerButton").hide();
}

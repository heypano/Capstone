function makeLevel2() {
	levelState = 2; //Keeps track of what level we are on
	delete currentSound;
	$('#pageTitle').html("Level 2");
	currentSound = new Audio("sounds/drawaline.mp3");
	//TODO robotObj.loadandplay("sounds/noidea.mp3");
	soundManager.playSound("l2","mistakehelpmedebug");
	attemptCounter = 0;
	//Draw the maze
	drawMaze();
	//Add the Plug to the stage
	addPlugToStage();
	//The robot is not moving
	disableTouch();
	//Make guidelines
	guidelines();
	//Enable debugging
	enableDebug();
	debugged = false;
	moving = false;
	robotObj.moveToTop();
	layer.draw();
}


function guidelines(){
	greenLine = new Kinetic.Line({
		//[0, 0, 0,200,500,200,500,400,200,400,200,600,500,600]
		points : [120,120,600,120,600,500],
		stroke : "green",
	});
	greenLine.setStrokeWidth(10);
	redLine = new Kinetic.Line({
		points : [600,500,300,500],
		stroke : "red",
	});
	redLine.setStrokeWidth(10);
	layer.add(greenLine);
	layer.add(redLine);
}

function removeGuidelines(){
	if(typeof greenLine!= "undefined")greenLine.remove();
	if(typeof redLine!= "undefined")redLine.remove();
	layer.drawScene();
}

function startDebug(){	
	stage.on("touchdown", debugFind);
	stage.on("mousedown", debugFind);
}

function debugFind(){
	var position = stage.getUserPosition();
	var x = position.x;
	var y = position.y;
	if(y<=520 && y>=480 && x>=300 && x<=600 && !debugged){
				debugged = true;
				redLine.remove();
				disableTouch();
				enableDraw();
				soundManager.l2.speaker = new Audio("sounds/speaker/2_speakerinstrdebug2.mp3");
				soundManager.playSound("l2","yourerightdebug");
				resetRobot();
	}
}

//Removes level	1
function removeLevel2() {
	//Remove event listeners
	removeAllStars();
	/*layer.remove(line);
	delete line;*/
	/*stage.off("touchstart");
	stage.off("mousedown");
	stage.off("touchmove");
	stage.off("mousemove");
	stage.off("touchend");
	stage.off("mouseup");*/
	//Remove everything from the layer
	//layer.removeChildren();
}

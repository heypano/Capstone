function makeLevel1() {
	levelState = 1; //Keeps track of what level we are on
	delete currentSound;
	$('#pageTitle').html("Level 1");
	currentSound = new Audio("sounds/drawaline.mp3");
	robotObj.loadandplay("sounds/noidea.mp3");
	attemptCounter = 0;
	//Draw the maze
	drawMaze();
	//Add the Plug to the stage
	addPlugToStage();
	//The robot is not moving
	moving = false;
}


//Removes level	1
function removeLevel1() {
	//Remove event listeners
	removeAllStars();
	removePlug();
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


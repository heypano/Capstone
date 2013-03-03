function makeLevel1() {
	levelState = "Level1"; //Keeps track of what level we are on
	delete currentSound;
	currentSound = new Audio("sounds/canyouhelptherobotgettotheplug.mp3");
	attemptCounter = 0;
	//Draw the maze
	drawMaze();
	//The robot is not moving
	moving = false;


}


//Removes level	1
function removeLevel1() {
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


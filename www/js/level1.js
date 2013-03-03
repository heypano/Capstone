function makeLevel1() {
	delete currentSound;
	currentSound = new Audio("sounds/canyouhelptherobotgettotheplug.mp3");
	
	//Create the line for moving the robot -- the one that is drawn
	line = new Kinetic.Line({
		points : [100, 100],
		stroke : "black"
	});
	layer.add(line);
	layer.add(rect);

	//Add the Robot to the stage
	addRobotToStage();
	//Add the Plug to the stage
	addPlugToStage();
	//Draw the maze
	drawMaze();
	//Make the new line
	points = new Array();
	//The robot is not moving
	moving = false;

	//Set touch events for line
	stage.on("touchstart", startMove);
	stage.on("mousedown", startMove);
	stage.on("touchend", endMove);
	stage.on("mouseup", endMove);

	//Redraw the layer
	layer.draw();

	//Add the layer to the stage
	stage.add(layer);

}


//Removes level	1
function removeLevel1() {
	//Remove event listeners
	removeAllStars();
	
	/*stage.off("touchstart");
	stage.off("mousedown");
	stage.off("touchmove");
	stage.off("mousemove");
	stage.off("touchend");
	stage.off("mouseup");*/
	//Remove everything from the layer
	//layer.removeChildren();
}


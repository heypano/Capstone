function makeLevel0(){
	delete currentSound;
	$('#pageTitle').html("Welcome!");
	currentSound = new Audio("sounds/drawaline.mp3");
	attemptCounter = 0;
	//Draw the maze
	drawMaze();
	//Add the Plug to the stage
	addPlugToStage();
	//The robot is not moving
	moving = false;
}

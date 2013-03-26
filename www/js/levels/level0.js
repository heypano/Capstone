function makeLevel0(){
	delete currentSound;
	$('#pageTitle').html("Welcome!");
	soundManager.playSound("l0","introbyrobot");
	attemptCounter = 0;
	//Draw the maze
	drawMaze();
	//Add the Plug to the stage
	addPlugToStage();
	//The robot is not moving
	moving = false;
	//robotObj.moveToTop();
	layer.draw();
}

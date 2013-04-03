function makeLevel0(){
	delete currentSound;
	if(!inCastle && !inProgram){
		$('#pageTitle').html("Welcome!");	
	}
	soundManager.playSound("lglossary","program");
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

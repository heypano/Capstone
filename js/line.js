//Global Variables
//line
//lineDrawTimer
//points

prevPoint = null;  //Global variable that keeps track of the previous point drawn on the line

//Start drawing line (touch down)
function startMove(event) {
	if (robotMoving) // If the robot is moving, do nothing
		return;
	if (moving) {
		moving = false;
		layer.draw();
	} else {
		//Remove previous line
		removeLine(line, points);
		//Get new point
		var newPoint = stage.getUserPosition();
		//Put it in array
		points.push(newPoint);
		//Print the line
		line.setPoints(points);
		//Start moving
		moving = true;
		//Refresh screen
		layer.drawScene();
		//Start collecting information on line every second
		lineDrawTimer = setInterval(continueMove,50);
		
	}
}


//Continue drawing line 
function continueMove(event) {
	if (robotMoving)
		return;
	if (moving) {
		//Get new point
		var newPoint = stage.getUserPosition();
		if(!newPoint)return;
		//Depending on whether this is the right chunk, draw the line or not
		newChunk = getChunk(newPoint.x, newPoint.y);
		if (prevPoint != null)
			currentChunk = getChunk(prevPoint.x, prevPoint.y);
		else
			currentChunk = newChunk;
		if (newChunk != currentChunk && newChunk != currentChunk - 1 && newChunk != currentChunk + 1)
			return;

		prevPoint = newPoint;
		//Put it in array
		points.push(newPoint);

		//Print the line
		line.setPoints(points);
		//Start moving
		moving = true;
		//Refresh screen
		layer.drawScene();
	}
}

//Stop moving (touch down)
function endMove(event) {
	if (robotMoving)
		return;
	moving = false;
	clearInterval(lineDrawTimer);
	moveRobot();
}

//Remove line
function removeLine() {
	if (!points)
		return;
	// If points isn't defined
	delete points;
	points = new Array({
		x : 100,
		y : 100
	});
	//points.splice(1, points.length); //Empty the array
	line.setPoints(points);
	//Clear the line
	//layer.drawScene(); //Redraw stage
}
//Global Variables
//line
//lineDrawTimer
//points

prevPoint = null;  //Global variable that keeps track of the previous point drawn on the line
drawingDisabled=false //If drawing is disabled these will fail


//Start drawing line (touch down)
function startMove(event) {
	if(drawingDisabled) return;
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
		//console.log("Current Chunk: "+currentChunk+". New Chunk: "+newChunk);
		if(levelState==0 || levelState==1){ //Level 0 and 1
			if (newChunk != currentChunk && newChunk != currentChunk - 1 && newChunk != currentChunk + 1)
			return;			
		}
		else if(levelState==2){
			if(currentChunk<4 || newChunk<4)return; //No interaction at this point
			if(currentChunk==4){ //Intersection
				if(newChunk != 4 && newChunk != 5 && newChunk != 6 && newChunk != 3)return;
			}
			else if(currentChunk==5){//Deadend
				if(newChunk!=5 && newChunk!=4) return;
			}
			else {
				if(newChunk != currentChunk && newChunk != currentChunk - 1 && newChunk != currentChunk + 1)
				return;
			}
		}
		
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

//Stop moving (touch up)
function endMove(event) {
	if(drawingDisabled)return;
	if (robotMoving)
		return;
	moving = false;
	if(typeof lineDrawTimer != undefined){
		clearInterval(lineDrawTimer);
	}
	moveRobot();
}

//Remove line
function removeLine() {
	if (!points)
		return;
	// If points isn't defined
	delete points;
	
	if(levelState==0 || levelState==1){startx=100;starty=100;}
	else if(levelState==2){startx=600;starty=500;}
	else{
		startx=100;starty=100;
	}
	points = new Array({
		x : startx,
		y : starty
	});
	//points.splice(1, points.length); //Empty the array
	line.setPoints(points);
	prevPoint=null;
	//Clear the line
	//layer.drawScene(); //Redraw stage
}


/*
//returns whether two line segments intersect or not
function getIntersect(pointa, pointb, pointc, pointd){
	var slope1 = getSlope(pointa,pointb);
	var slope2 = getSlope(pointb,pointc);
	var intercept1 = getIntercept(pointa,slope1);
	var intercept2 = getIntercept(pointc,slope2);
	if(slope1 == slope2) return false;
	
	var ix = (intercept2-intercept1)/(slope1-slope2);
	var iy = (intercept2*slope1 - intercept1*slope2)/(slope1-slope2);
	if((ix <= Math.max(pointa.x,pointb.x)) && (ix >= Math.min(pointa.x,pointb.x)) && (iy <= Math.max(pointa.y,pointb.y)) && (iy >= Math.min(pointa.y,pointb.y)))return true;
	else return false;
}

//get slope given two points
function getSlope(pointa,pointb){
	return (pointb.y-pointa.y)/(pointb.x-pointa.x);
}

//get y intercept given a point and a slope
function getIntercept(pointa,slope){
	return (pointa.y - (slope*pointa.x));
}

*/
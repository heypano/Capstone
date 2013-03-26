//Global Variables
//line
//lineDrawTimer
//points

prevPoint = null;  //Global variable that keeps track of the previous point drawn on the line
drawingDisabled=false //If drawing is disabled these will fail


//Start drawing line (touch down)
function startMove(event) {
	if(drawingDisabled){
		return;
	} 
	if (robotMoving){// If the robot is moving, do nothing
		console.log("MNOO");
		return;
	} 
	if (moving) {
		moving = false;
		layer.draw();
	} else {
		var newPoint = stage.getUserPosition();
		//Only if line starts on robot
		if(!startedOnRobot(robotObj,newPoint)){
			return;	
		}
		//Remove previous line
		removeLine(line);
		//Get new point
		if(levelState==2 && getChunk(newPoint.x,newPoint.y)<4)return;
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
		newPoint = stage.getUserPosition();
		if(!newPoint){
			endMove();
			return;
			}
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
			line.setStrokeWidth(10);
			if(currentChunk<4 || newChunk<4)return; //No interaction at this point
			if(currentChunk==4){ //Intersection
				if(newChunk != 4 && newChunk != 5 && newChunk != 6 && newChunk != 3)return;
				line.setStroke("green");
			}
			else if(currentChunk==5){//Deadend
				if(newChunk!=5 && newChunk!=4) return;
				line.setStroke("red");
			}
			else {
				line.setStroke("green");
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
	if(levelState==2){
		line.setStrokeWidth(10);	
	}
	else{
		line.setStroke("black");
		line.setStrokeWidth(2);
	} 
	if(typeof lineDrawTimer != "undefined"){
		clearInterval(lineDrawTimer);
	}
	moveRobot();
}

//Remove line
function removeLine(line) {
	if(typeof line == "undefined")line = window.line;
	line.setStrokeWidth(2);
	line.setStroke("black");
	if(typeof points!= "undefined")delete points;
	
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


function startedOnRobot(robotObj,point){
	var rl = robotObj.getX();
	var rt = robotObj.getY();
	var rr = rl + robotObj.twidth;
	var rb = rt + robotObj.theight;
	return isPointWithin(point.x,point.y,rl,rr,rt,rb);
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
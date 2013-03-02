/*Global Variables*/
//robotObj
//plugObj
//stageWidth // stageHeight // stageX // stageY
//.twidth
//.theight

//TODO Images should not be draggable, text should not be selectable
//TODO If line gets dragged out of the field, start moving
//TODO Optimize line construction by not using touchmove (do setInterval and check)
//TODO Why are there more than one layers
//TODO: Make sure line started on robot
//TODO: Make bounding boxes? maybe

levelState = "Level1";
playerStars = 0;
prevPoint = null;
goingUp = false;
goingLeft = false;
stageWidth = 700;
stageHeight = 730;
$(document).ready(function() {

	/* Initialization */
	//Create the stage
	stage = new Kinetic.Stage({
		container : 'stage',
		width : stageWidth,
		height : stageHeight
	});
	stageX = stage.getX();
	stageY = stage.getY();
	//Create the layer
	layer = new Kinetic.Layer();
	//Create the border for the stage
	rect = new Kinetic.Rect({
		x : 0,
		y : 0,
		width : 700,
		height : 730,
		fill : 'none',
		stroke : 'black',
		strokeWidth : 4
	});

	makeLevel1();
	//removeLevel1();
});

function makeLevel1() {
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
	stage.on("touchmove", continueMove);
	stage.on("mousemove", continueMove);
	stage.on("touchend", endMove);
	stage.on("mouseup", endMove);

	//Redraw the layer
	layer.draw();

	//Add the layer to the stage
	stage.add(layer);

}

//Start drawing line (touch down)
function startMove(event) {
	if (robotMoving)
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
	}
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

//Continue drawing line (touch move)
function continueMove(event) {
	if (robotMoving)
		return;
	if (moving) {
		//Get new point
		var newPoint = stage.getUserPosition();
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
	moveRobot();
}

//Draw maze
function drawMaze() {
	mazeline = new Kinetic.Line({
		points : [0, 0, 200, 0, 200, 500, 200, 0, 0, 0, 0, 732, 400, 732, 400, 200],
		stroke : "black"
	});
	layer.add(mazeline);
}

//Add robot to stage
function addRobotToStage() {
	//The robot
	robotImageObj = new Image();
	robotMoving = false;
	// is the robot moving? if it is then we don't do stuff
	robotObj = '';
	// The Kinetic.Image object
	robotImageObj.onload = function() {
		robotObj = new Kinetic.Image({
			x : 20,
			y : 10,
			image : robotImageObj,
		});
		layer.add(robotObj);
		layer.drawScene();
		robotObj.twidth = robotImageObj.width;
		robotObj.theight = robotImageObj.height;
	}
	robotImageObj.src = "img/robot.png";
}

//Add plug to stage
function addPlugToStage() {
	//The robot
	plugImageObj = new Image();
	// The Kinetic.Image object
	plugImageObj.onload = function() {
		plugX = 500;
		plugY = 500;
		plugObj = new Kinetic.Image({
			x : plugX,
			y : plugY,
			image : plugImageObj,
		});
		layer.add(plugObj);
		layer.drawScene();
		plugWidth = plugImageObj.width;
		plugHeight = plugImageObj.height;
	}
	plugImageObj.src = "img/plug.png";
}

//While the robot is moving
function moveRobot() {
	robotMoving = true;
	var pointNo = 0;
	//Counts what point we are on
	var prevTime = 0;
	//This is the previous time where this is called
	//These offsets are used to make the robot look like it's moving from it's center
	var xoffset = robotObj.getWidth() / 2;
	var yoffset = robotObj.getHeight() / 2;
	var anim = new Kinetic.Animation(function(frame) {
		if (!points.length || pointNo >= points.length - 1) {//Animation end condition (scanned entire line or line doesn't exist)
			resetRobot();
			removeLine();
			anim.stop();
			robotMoving = false;
			return;
		} else if (frame.time - prevTime > 20) {// Animation continues:
			prevTime = frame.time;
			robotObj.setX(points[pointNo].x - xoffset);
			robotObj.setY(points[pointNo].y - yoffset);
			pointNo++;
			//console.log(collides(robotObj));
		}
	}, layer);
	anim.start();
}

//Puts robot in original position
function resetRobot() {
	robotObj.setX(20);
	robotObj.setY(10);
	prevPoint = {
		x : 20,
		y : 10
	};
}

//Removes level	1
function removeLevel1() {
	//Remove event listeners
	stage.off("touchstart");
	stage.off("mousedown");
	stage.off("touchmove");
	stage.off("mousemove");
	stage.off("touchend");
	stage.off("mouseup");
	//Remove everything from the layer
	//layer.removeChildren();
}

//Is obj Colliding with something (returns what otherwise null)
function collides(obj1) {
	l1 = obj1.getX();
	r1 = l1 + obj1.twidth;
	t1 = obj1.getY();
	b1 = t1 + obj1.theight;

	//Outside of stage
	if (l1 < stageX || (r1 > stageX + stageWidth) || t1 < stageY || (b1 > stageY + stageHeight)) {
		return 1;
		// TODO change this later -- 1 means border
	}

	//Collides with plug
	if (intersecting(l1, r1, t1, b1, plugX, plugX + plugWidth, plugY, plugY + plugWidth, false)) {
		return 3;
		// TODO change this later -- 3 means plug
	}

	return 0;
	//nothing
}

function intersecting(l1, r1, t1, b1, l2, r2, t2, b2, isline) {
	if (isline == "v") {//check with vertical line
		if (l1 <= l2 && r1 >= r2) {//is it contained within the left and right side
			if (t1 >= t2 && t1 <= b2)//is the top of it between the top and the bottom of the line
				return true;
			else
				return false;
		}
	} else if (isline == "h") {
		if (t1 <= t2 && b1 >= b2) {//is it contained within the top and bottom side
			if (l1 >= l2 && l1 <= r2)//is the top of it between the top and the bottom of the line
				return true;
			else
				return false;
		}
	} else {
		if (r1 >= l2 && r1 <= r2 && b1 >= t2 && b1 <= b2)
			return true;
		else
			return false;
	}
}

function getChunk(r1, t1) {// Gets which chunk we are at in the maze(down to right)
	//[0, 0, 200, 0, 200, 500, 200, 0, 0, 0, 0, 732, 400, 732, 400, 200],
	if (r1 < 200 && t1 < 500)
		return 1;
	else if (r1 < 400 && t1 > 500)
		return 2;
	else if (r1 < 400 && t1 > 200)
		return 3;
	else if (t1 < 200)
		return 4;
	else
		return 5;
}

$(document).ready(function() {
	/*Global Variables*/

	//TODO Images should not be draggable, text should not be selectable
	//TODO If line gets dragged out of the field, start moving
	//TODO Optimize line construction by not using touchmove (do setInterval and check)
	levelState = "Level1";
	playerStars = 0;
	/* Initialization */
	//Create the stage
	stage = new Kinetic.Stage({
		container : 'stage',
		width : 700,
		height : 730
	});
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
			//TODO: Make sure line started on robot
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
	function addRobotToStage(){
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
			x = "bli";
			layer.add(robotObj);
			stage.add(layer);
		}
		robotImageObj.src = "img/robot.png";
	}
	
	//While the robot is moving
	function moveRobot() {
		robotMoving = true;
		var pointNo = 0; //Counts what point we are on
		var prevTime = 0; //This is the previous time where this is called
		//These offsets are used to make the robot look like it's moving from it's center
		var xoffset = robotObj.getWidth() / 2;  
		var yoffset = robotObj.getHeight() / 2;
		var anim = new Kinetic.Animation(function(frame) {
			if (!points.length || pointNo >= points.length - 1) { //Animation end condition (scanned entire line or line doesn't exist)
				resetRobot();
				removeLine();
				anim.stop();
				robotMoving = false;
				return;
			}
			if (frame.time - prevTime > 20) {// Animation continues:
				prevTime = frame.time;
				robotObj.setX(points[pointNo].x - xoffset);
				robotObj.setY(points[pointNo].y - yoffset);
				pointNo++;
			}
		}, layer);

		anim.start();
	}

	//Puts robot in original position
	function resetRobot() {
		robotObj.setX(20);
		robotObj.setY(10);
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



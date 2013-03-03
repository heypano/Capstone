

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
		robotObj.noidea = new Audio("sounds/noidea.mp3");
		robotObj.noidea.play();
	}
	robotImageObj.src = "img/robot.png";
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
			attemptCounter++;
			anim.stop();
			robotMoving = false;
			if(attemptCounter>0 && attemptCounter%7==0){ //every 7th time
					loadInstruction1();
			}
			return;
		} else if (frame.time - prevTime > 20) {// Animation continues:
			prevTime = frame.time;
			robotObj.setX(points[pointNo].x - xoffset);
			robotObj.setY(points[pointNo].y - yoffset);
			pointNo++;
			starsHit();
			if(collides(robotObj) == 3){ // If it hits the plug -- stop
				resetRobot();
				removeLine();
				anim.stop();
				robotMoving = false;
				removeMaze();
				removeAllStars();
				removePlug();
			}
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

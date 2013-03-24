

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
		/*robotObj.loadandplay = function(sound){
			if(typeof robotObj.sound != undefined)delete robotObj.sound;
			robotObj.sound = new Audio (sound);
			robotObj.sound.play();
			setTimeout(null,robotObj.sound.duration);
		}
		robotObj.loadandplay("sounds/outofpower.mp3");*/
		//$.trigger("robotloaded");
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
	//Save the position of the balls
	if(levelState==3){
			savedBall1x = ballObj1.getX();
			savedBall2x = ballObj2.getX();
			savedBall1y = ballObj1.getY();
			savedBall2y = ballObj2.getY();
	}
	var anim = new Kinetic.Animation(function(frame) {
		var collidesballs = collides(robotObj,plugX,plugY,plugWidth,plugHeight);
		if (!points.length || pointNo >= points.length - 1 || (levelState == 3 && collidesballs == 4)) {//Animation end condition (scanned entire line or line doesn't exist)
			if(collidesballs==4){
				soundManager.playSound("l3","ouch");
			}
			anim.stop();
			$(soundManager).bind("endqueue",function(){
				$(soundManager).unbind("endqueue");
				removeLine(line);
				attemptCounter++;
				robotMoving = false;
				if(attemptCounter>0 && attemptCounter%7==0){ //every 7th time
						loadInstruction1();
				}
				resetRobot();
				return;
				});		
			soundManager.playSound("all","ithinkishouldgoback");
			return;	
		} else if (frame.time - prevTime > 20) {// Animation continues:
			prevTime = frame.time;
			robotObj.setX(points[pointNo].x - xoffset);
			robotObj.setY(points[pointNo].y - yoffset);
			pointNo++;
			starsHit();
			var collidesR=collides(robotObj,plugX,plugY,plugWidth,plugHeight);
			if( collidesR == 3){ // If it hits the plug -- stop
				anim.stop();
				robotMoving = false;
				soundManager.playSound("all","yay");
				//Wait to make sure it got saved
				$(window).bind("saveded",function(){
					$(window).unbind("saveded");
					$(soundManager).bind("endqueue",function(){
						$(soundManager).unbind("endqueue");
						//Save the "program"
						removePlug();
						removeAllStars();
						removeMaze();
						removeLine(line);
						if(levelState==2)removeGuidelines();
						if(levelState==3){
							anim2.stop();
							removeBalls();
							}
						nextLevel();
						resetRobot();
						layer.drawScene();
						});
				});
				saveProgram();
			}
		}
	}, layer);
	anim.start();
}

//Puts robot in original position
function resetRobot() {
	if(levelState==2 && debugged==true){
		robotObj.setX(510);
		robotObj.setY(400);
		prevPoint = {
			x : 510,
			y : 400
		};
	}
	else{
		robotObj.setX(20);
		robotObj.setY(10);
		prevPoint = {
			x : 20,
			y : 10
		};
		
	}
	layer.drawScene();
}

//Loads the next level
function nextLevel(){
	removeMaze();removePlug();removeGuidelines();removeAllStars();removeBalls();
	soundManager.queue = new Queue();
	if(levelState==0)makeLevel1();
	else if(levelState==1)makeLevel2();
	else if(levelState==2)makeLevel3();
	else if(levelState==3)makeLevel4();
	moving=false;
}

function replaceRobotImage(image){
	robotObj.setImage(image);
	layer.draw();
}

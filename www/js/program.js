program = new Array(); //Contains all of the saved "programs"
replaying = false;
function reproduceLevel(l){
	//TODO STOP SOUNDS?
	if(typeof program[l] == 'undefined'){ // That means the program hasn't been saved
		//TODO trigger something to say that it returned?
		return;
	}
	programInfo = program[l];
	replaying = true;
	//HIDE EVERYTHING TEMPORARILY
	layer.hide();
	//Disable touch
	disableTouch();
	//load a new layer
	tlayer = new Kinetic.Layer();
	shutUp();
	tlayer.add(rect);
	thisstararray = new Array();
	addStars(l,tlayer,thisstararray);
	
	
	programInfo.playStuff = playStuff;	
	stage.add(tlayer);
	programInfo.playStuff(l);
	
}

function playStuff(l){
	//load the things (the stars for the level too but be careful not to regetthem!)
	//Play the animation
	//Exit
	tlayer.add(this.robotObj);
	tlayer.add(this.plugObj);
	if(l==0){
		this.line.setPoints(this.points);
		tlayer.add(this.line);
	}
	else if(l<4){
		this.line.setPoints(this.points);
		tlayer.add(this.line);
		tlayer.add(this.mazeline);
	}
	tlayer.drawScene();
	var anim = reanimate(tlayer,this.robotObj,this.points,l,this.plugObj.plugX,this.plugObj.plugY,this.plugObj.plugWidth,this.plugObj.plugHeight);
	anim.start();
}

function removeTempLayer(){
	layer.add(rect);
	tlayer.remove();
	delete tlayer;
	layer.show();
	replaying = false;
	//Reenable touch or whatever
}

function restoreStuff(callback){
	callback();
}

//Saves program based on level
function saveProgram(){
	//Don't save if replaying
	if(replaying){
		$(window).trigger("saveded");
		return;
	}
	program[levelState] = new Object();
	if(typeof points != 'undefined'){
		program[levelState].points= points.clone();
		}
	else{
		program[levelState].points= null;
		}	
	if(typeof line != 'undefined'){
		program[levelState].line= $.extend({}, line);
		}
	else{
		program[levelState].line= null;
		}	
	if(typeof mazeline != 'undefined'){
		program[levelState].mazeline = $.extend({}, mazeline);
		}
	else{
		program[levelState].mazeline = null;
		}
	if(typeof robotObj != 'undefined'){
		program[levelState].robotObj = $.extend({}, robotObj); // Cloning object
		}
	else{
		program[levelState].robotObj = null;
		}
	if(typeof plugObj != 'undefined'){
		program[levelState].plugObj = $.extend({}, plugObj); // Cloning object
		}
	else{
		program[levelState].plugObj = null;
		}

	//Balls position
	//savedBall1x, savedBall1y, savedBall2x, savedBall2y
	
	
	//TODO Last level
	$(window).trigger("saveded");
}

function reanimate(layer,robotObj,points,levelState,plugX,plugY,plugWidth,plugHeight){
	robotMoving = true;
	var pointNo = 0;
	//Counts what point we are on
	var prevTime = 0;
	//This is the previous time where this is called
	//These offsets are used to make the robot look like it's moving from it's center
	var xoffset = robotObj.getWidth() / 2;
	var yoffset = robotObj.getHeight() / 2;
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
				robotMoving = false;
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
			starsHit(layer,thisstararray);
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
						if(levelState==3){
							anim2.stop();
							}
						removeTempLayer();
						});
				});
				saveProgram();
			}
		}
	}, layer);
	return anim;
}

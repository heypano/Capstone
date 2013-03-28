program = new Array(); //Contains all of the saved "programs"
replaying = false;
prlayer = new Kinetic.Layer();
programImageArray = new Object();
inProgram=false;
loadImage("img/level0.png",50,300,null,prlayer,programImageArray,true,0);//0
loadImage("img/level1.png",250,300,null,prlayer,programImageArray,true,1);
loadImage("img/level2.png",450,300,null,prlayer,programImageArray,true,2);
loadImage("img/level3.png",150,500,null,prlayer,programImageArray,true,3);
loadImage("img/level4.png",350,500,null,prlayer,programImageArray,true,4);
replayText = new Kinetic.Text({
	x : 100,
	y : 100,
	text : "REPLAY PROGRAMS",
	fontSize : 50,
	fontWeight : 100,
	fontFamily : 'Arial',
	fill : 'Black'
});
prlayer.add(replayText);

function makeProgram() {
	//If the castle layer already exists, don't make it again, just reload it
	shutUp();
	disableTouch();
	enableButtonsForProgram();
	inProgram=true;
	prlayer.add(rect);
	if (!stage.isAncestorOf(prlayer)) {
		stage.add(prlayer);
	} else {
	}
	refreshProgramButtons();
	if(gameCompleted)$("#enterButton").hide();
	//soundManager.playSound("lprogram","love");
	hideAllLayersExcept(stage,prlayer);
}


function enableButtonsForProgram(){
	stage.on("mousedown", pbuttonstuff);
	stage.on("touchstart", pbuttonstuff);
}

function pbuttonstuff(e){
	var buttonType = isButton(e.pageX, e.pageY);
	reproduceLevel(buttonType);
}

function refreshProgramButtons(){
	for(var i=0;i<program.length;i++){
		programImageArray["p"+i].show();
	}
	prlayer.draw();
}

function removeProgram(){
	var layer;
	shutUp();
	if(inCastle)layer = window.clayer;
	else layer = window.layer;
	inProgram=false;
	layer.add(rect);
	hideAllLayersExcept(stage,layer);
	disableTouch();
	restoreLevelState(levelState);
	layer.draw();
}

function reproduceLevel(l){
	//TODO STOP SOUNDS?
	console.log("Test "+l);
	disableSideButtons();
	if(typeof program[l] == 'undefined'){ // That means the program hasn't been saved
		//TODO trigger something to say that it returned?
		return;
	}
	programInfo = program[l];
	replaying = true;
	//HIDE EVERYTHING TEMPORARILY
	prlayer.hide();
	
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
		if(l==3){
			this.ballObj1.setX(savedBall1x);
			this.ballObj2.setX(savedBall2x);
			this.ballObj1.setY(savedBall1y);
			this.ballObj2.setY(savedBall2y);
			tlayer.add(this.ballObj1);
			tlayer.add(this.ballObj2);
		}
		this.line.setPoints(this.points);
		tlayer.add(this.line);
		if(this.mazeline)tlayer.add(this.mazeline);
	}
	else if(l==4){
		for(key in this.imageArray){
			tlayer.add(imageArray[key]);
		}
		Buttons(tlayer);
		makeConnectorGrid(tlayer);
		for(key in this.commandList){
			var n = this.commandList[key];
			if(typeof n == "function")continue;
			if (n == "u") {
				addCodeLine("GO UP",tlayer);
				soundManager.playSound("l4", "executeup");
			} else if (n == "d") {
				addCodeLine("GO DOWN",tlayer);
				soundManager.playSound("l4", "executedown");
			} else if (n == "l") {
				addCodeLine("GO LEFT",tlayer);
				soundManager.playSound("l4", "executeleft");
			} else if (n == "r") {
				addCodeLine("GO RIGHT",tlayer);
				soundManager.playSound("l4", "executeright");
			}
		}
		playAnimation(this.commandsToExecute, this.movement, this.robotObj, tlayer);
	}
	tlayer.drawScene();
	if(l!=4){
		var anim = reanimate(tlayer,this.robotObj,this.points,l,this.plugObj.plugX,this.plugObj.plugY,this.plugObj.plugWidth,this.plugObj.plugHeight);
		if(l==3)animateBalls(tlayer,this.ballObj1,this.ballObj2);
		anim.start();
	}
}

function removeTempLayer(){
	layer.add(rect);
	if(typeof tlayer != "undefined"){
		tlayer.remove();
		delete tlayer;
	}
	prlayer.show();
	enableButtonsForProgram();
	replaying = false;
	enableSideButtons();
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
	if(typeof ballImageObj1 != 'undefined'){
		program[levelState].ballObj1 = $.extend({}, ballObj1); // Cloning object
		}
	else{
		program[levelState].ballObj1 = null;
		}
	if(typeof ballImageObj2 != 'undefined'){
		program[levelState].ballObj2 = $.extend({}, ballObj2); // Cloning object
		}
	else{
		program[levelState].ballObj2 = null;
		}
	if(typeof commandList != 'undefined'){
		program[levelState].commandList = $.extend({}, commandList); // Cloning object
		}
	else{
		program[levelState].commandList = null;
		}
	if(typeof commandList != 'undefined'){
		program[levelState].imageArray = $.extend({}, imageArray); // Cloning object
		}
	else{
		program[levelState].imageArray = null;
		}
	if(typeof lastCommandsToExecute != 'undefined'){
		program[levelState].commandsToExecute = $.extend({}, lastCommandsToExecute); // Cloning object
		}
	else{
		program[levelState].commandsToExecute = null;
		}
	if(typeof lastMovement != 'undefined'){
		program[levelState].movement = $.extend({}, lastMovement); // Cloning object
		}
	else{
		program[levelState].movement = null;
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
			var collidesR=collides(robotObj,plugX,plugY,plugWidth,plugHeight,levelState);
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

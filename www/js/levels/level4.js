function makeLevel4() {
	levelState = 4;
	//Keeps track of what level we are on
	delete currentSound;
	if(!inCastle && !inProgram)$('#pageTitle').html("Level 4");
	currentSound = new Audio("sounds/drawaline.mp3");
	soundManager.playSound("l4", "toomanythings");
	attemptCounter = 0;
	soundCounter = 0;
	//Add the Plug to the stage
	addPlugToStage();
	//Stars
	imageArray = new Object();
	/*imageArray.prototype.countAttrs = function(){
	 var count = 0;
	 for (var k in this){
	 if(foo.hasOwnProperty(k)){
	 count++;
	 }
	 }
	 return count;
	 }*/
	commandList = new Array();
	gridX = 0;
	gridY = 0;
	drawMaze();
	makeGrid();
	disableTouch();
	Buttons();
	loadImage("img/highlight.png", 364, 505, null, layer,imageArray,true,50);
	loadInstruction5();
}

function Buttons(layer) {
	if(typeof layer == "undefined")layer=window.layer;
	leftB = new Object();
	leftB.name = "l";
	upB = new Object();
	upB.name = "u";
	downB = new Object();
	downB.name = "d";
	rightB = new Object();
	rightB.name = "r";
	loadImage("img/leftButton.png", 30, 600, leftB, layer);
	loadImage("img/upButton.png", 130, 510, upB, layer);
	loadImage("img/downButton.png", 130, 600, downB, layer);
	loadImage("img/rightButton.png", 230, 600, rightB, layer);
	buttonBorder = new Kinetic.Line({
		points : [5, 450, 350, 450, 350, 725, 350, 450, 695, 450],
		stroke : '#ababab',
		strokeWidth : 5,
		lineCap : 'round',
		lineJoin : 'round'
	});
	attentionText = new Kinetic.Text({
		x : 100,
		y : 460,
		text : 'ATTENTION!',
		fontSize : 35,
		fontWeight : 100,
		fontFamily : 'Impact',
		fill : 'red'
	});
	layer.add(attentionText);
	programText = new Kinetic.Text({
		x : 420,
		y : 460,
		text : 'PROGRAM CODE',
		fontSize : 35,
		fontWeight : 100,
		fontFamily : 'Impact',
		fill : 'Black'
	});
	layer.add(programText);
	codeText = new Kinetic.Text({
		x : 400,
		y : 480,
		text : "",
		fontSize : 32,
		fontWeight : 100,
		fontFamily : 'Arial',
		fill : 'Black'
	});
	layer.add(codeText);
	layer.add(buttonBorder);
	if(!replaying)enableButtonsForLevel4();
}

function makeGrid(layer) {
	if(typeof layer == "undefined")layer=window.layer;
	loadImage("img/cat.png", 50, 220, null, layer);
	loadImage("img/treat1.png", 50, 370, null, layer);
	loadImage("img/cat.png", 580, 60, null, layer);
	loadImage("img/treat1.png", 240, 80, null, layer);
	loadImage("img/dogfood.png", 210, 220, null, layer);
	loadImage("img/treat2.png", 460, 80, null, layer);
	loadImage("img/cat.png", 420, 220, null, layer);
	loadImage("img/treat2.png", 270, 370, null, layer);
	loadImage("img/crocodile.png", 430, 350, null, layer);
	makeConnectorGrid();
}

function makeConnectorGrid(layer) {
	if(typeof layer == "undefined")layer=window.layer;
	connectorGrid = new Array();
	connectorGrid.push(new Kinetic.Line({
		points : [170, 100, 220, 100],
		stroke : 'black',
		strokeWidth : 1,
	}));
	connectorGrid.push(new Kinetic.Line({
		points : [350, 100, 440, 100],
		stroke : 'black',
		strokeWidth : 1,
	}));
	connectorGrid.push(new Kinetic.Line({
		points : [530, 100, 580, 100],
		stroke : 'black',
		strokeWidth : 1,
	}));
	connectorGrid.push(new Kinetic.Line({
		points : [170, 250, 220, 250],
		stroke : 'black',
		strokeWidth : 1,
	}));
	connectorGrid.push(new Kinetic.Line({
		points : [350, 250, 440, 250],
		stroke : 'black',
		strokeWidth : 1,
	}));
	connectorGrid.push(new Kinetic.Line({
		points : [530, 250, 580, 250],
		stroke : 'black',
		strokeWidth : 1,
	}));
	connectorGrid.push(new Kinetic.Line({
		points : [170, 400, 250, 400],
		stroke : 'black',
		strokeWidth : 1,
	}));
	connectorGrid.push(new Kinetic.Line({
		points : [350, 400, 410, 400],
		stroke : 'black',
		strokeWidth : 1,
	}));
	//Vertical
	connectorGrid.push(new Kinetic.Line({
		points : [100, 180, 100, 220],
		stroke : 'black',
		strokeWidth : 1,
	}));
	connectorGrid.push(new Kinetic.Line({
		points : [100, 320, 100, 360],
		stroke : 'black',
		strokeWidth : 1,
	}));
	connectorGrid.push(new Kinetic.Line({
		points : [300, 140, 300, 210],
		stroke : 'black',
		strokeWidth : 1,
	}));
	connectorGrid.push(new Kinetic.Line({
		points : [300, 320, 300, 360],
		stroke : 'black',
		strokeWidth : 1,
	}));
	connectorGrid.push(new Kinetic.Line({
		points : [500, 140, 500, 210],
		stroke : 'black',
		strokeWidth : 1,
	}));
	connectorGrid.push(new Kinetic.Line({
		points : [500, 330, 500, 360],
		stroke : 'black',
		strokeWidth : 1,
	}));
	connectorGrid.push(new Kinetic.Line({
		points : [650, 160, 650, 230],
		stroke : 'black',
		strokeWidth : 1,
	}));
	for (var i = 0; i < connectorGrid.length; i++) {
		layer.add(connectorGrid[i]);
	}
}

function loadImage(filepath, x, y, reference, layer, imageArray, hide, sendto, callback) {
	if(typeof layer == "undefined")layer=window.layer;
	if(typeof imageArray == "undefined")imageArray=window.imageArray;
	if(typeof hide == "undefined")hide=false;
	var imag = new Image();
	//imag.onload = (loadImg)(imag,x,y);
	imag.onload = function() {
		imagObj = new Kinetic.Image({
			x : x,
			y : y,
			image : imag,
		});
		layer.add(imagObj);
		if(typeof sendto == "undefined"){
			sendto=keylength(imageArray);
		}
		imageArray["p" + sendto] = imagObj;
		if ( typeof reference != "undefined" && reference!=null) {
			reference.button = imagObj;
			buttonFunctionality(reference);
		}
		imagObj.setDimensions = setDimensions;
		imagObj.setDimensions();
		if(hide==true)imagObj.hide();
		layer.drawScene();
		if(typeof callback != "undefined"){
			callback();
		}
	}
	imag.src = filepath;
}

function buttonFunctionality(reference) {
	reference.button.name = reference.name;

	/*reference.button.on("touchstart",control);
	 reference.button.on("mousedown",control);*/
}

function buttonstuff(e) {
	var buttonType = isButton(e.pageX, e.pageY);
	if (commandList.length == 6) return;
	if (buttonType == 'u')
		control('u');
	else if (buttonType == 'l')
		control('l');
	else if (buttonType == 'r')
		control('r');
	else if (buttonType == 'd')
		control('d');
	//console.log("pressed buttonType "+buttonType);
}

function control(n) {//u d l r
	if (commandList.length == 6) return;
	commandList.push(n);
	//Add codelines
	if (n == "u") {
		addCodeLine("GO UP");
		soundManager.playSound("l4", "executeup");
	} else if (n == "d") {
		addCodeLine("GO DOWN");
		soundManager.playSound("l4", "executedown");
	} else if (n == "l") {
		addCodeLine("GO LEFT");
		soundManager.playSound("l4", "executeleft");
	} else if (n == "r") {
		addCodeLine("GO RIGHT");
		soundManager.playSound("l4", "executeright");
	}
	if (commandList.length == 6) {
		disableSideButtons();
		disableTouch();
		$(soundManager).bind("endqueue",function(){
			$(soundManager).unbind("endqueue");
			//Execute the animation
			gridMove();
		});

	}
}

function gridMove() {
	var newGridX = 0;
	var newGridY = 0;
	var commandsToExecute = new Array();
	var movement = new Array();
	for (var i = 0; i < commandList.length; i++) {
		var commandType = commandList[i];
		if (commandType == "u") {
			if (newGridY > 0) {
				commandsToExecute.push(commandType);
				newGridY--;
				//console.log("Moving up");
			} else {
				commandsToExecute.push("n");
				//console.log("Not moving up");
			}
		} else if (commandType == "d") {
			if ((newGridY < 2 && newGridX < 3) || (newGridY < 1)) {
				commandsToExecute.push(commandType);
				newGridY++;
				//console.log("Moving down");
			} else {
				commandsToExecute.push("n");
				//console.log("Not moving down");
			}
		} else if (commandType == "l") {
			if (newGridX > 0) {
				commandsToExecute.push(commandType);
				newGridX--;
				//console.log("Moving left");
			} else {
				commandsToExecute.push("n");
				//console.log("Not moving left");
			}
		} else if (commandType == "r") {
			if ((newGridX < 3 && newGridY < 2) || (newGridX < 2)) {
				commandsToExecute.push(commandType);
				newGridX++;
				//console.log("Moving right");
			} else {
				commandsToExecute.push("n");
				//console.log("Not moving right");
			}
		}
		//Store X,Y
		movement.push({
			x : newGridX,
			y : newGridY
		});
	}
	playAnimation(commandsToExecute, movement);
}

function playAnimation(commandsToExecute, movement, robotObj, layer) {
	if(typeof robotObj == "undefined")robotObj=window.robotObj;
	if(typeof layer == "undefined")layer=window.layer;
	if(replaying)resetRobot();

	robotObj.moveToTop();
	//console.log(commandsToExecute,movement);
	prevTime = 0;
	movementState = 0;
	lastCommandsToExecute = commandsToExecute;
	lastMovement = movement;
	//console.log(commandsToExecute);
	//console.log(movement);
	highlighttrick(1);
	anim3 = new Kinetic.Animation(function(frame) {
		var timePassed = frame.time - prevTime;
		if (timePassed < 0)
			timePassed = -timePassed;
		if (timePassed > 20) {// Animation continues:
			if(soundManager.isPlaying)return;
			if (movementState >= commandsToExecute.length) {//Out of things to do
				resetAnim4();
			}
			var toGridX = movement[movementState].x;
			var toGridY = movement[movementState].y;
			realRobX = robotObj.getX();
			realRobY = robotObj.getY();
			//console.log("Real robot position: ("+realRobX+", "+realRobY+")");
			prevTime = frame.time;
			if (commandsToExecute[movementState] == "u") {
				robotObj.setY(realRobY - 4);
			} else if (commandsToExecute[movementState] == "d") {
				robotObj.setY(realRobY + 4);
			} else if (commandsToExecute[movementState] == "l") {
				robotObj.setX(realRobX - 4);
			} else if (commandsToExecute[movementState] == "r") {
				robotObj.setX(realRobX + 4);
			} else if (commandsToExecute[movementState] == "n") {
				//PLAY SOUND
						
					soundManager.playSound("l4", "cantgothatway");
					$(soundManager).bind("endqueue",function(){
						$(soundManager).unbind("endqueue");
						highlighttrick(movementState+2);
						movementState++;
						return;
						});	
						return;
			}
			if(!replaying)starsHit();
			else{
				starsHit(tlayer,thisstararray);
			}
			//When have we reached our destination
			if (toGridX == 0 && toGridY == 0) {
				if (isCloseTo(realRobX, 20) && isCloseTo(realRobY, 10)) {
					highlighttrick(movementState+2);
					movementState++;
				}
			} else if (toGridX == 1 && toGridY == 0) {
				if (isCloseTo(realRobX, 210) && isCloseTo(realRobY, 10)) { //treatcircle
					soundManager.playSound("l4","yummy");
					highlighttrick(movementState+2);
					movementState++;
				}
			} else if (toGridX == 2 && toGridY == 0) {7
				if (isCloseTo(realRobX, 430) && isCloseTo(realRobY, 10)) { //treatstick
					soundManager.playSound("l4","treat");
					highlighttrick(movementState+2);
					movementState++;
				}
			} else if (toGridX == 3 && toGridY == 0) {
				if (isCloseTo(realRobX, 560) && isCloseTo(realRobY, 10)) { //cat
					soundManager.playSound("l4","cat");
					highlighttrick(movementState+2);
					movementState++;
				}
			} else if (toGridX == 0 && toGridY == 1) {					  
				if (isCloseTo(realRobX, 20) && isCloseTo(realRobY, 150)) { //cat
					soundManager.playSound("l4","cat");
					highlighttrick(movementState+2);
					movementState++;
				}
			} else if (toGridX == 1 && toGridY == 1) {
				if (isCloseTo(realRobX, 210) && isCloseTo(realRobY, 150)) { //dogfood
					soundManager.playSound("l4","mmmmdogfood");
					highlighttrick(movementState+2);
					movementState++;
				}
			} else if (toGridX == 2 && toGridY == 1) {
				if (isCloseTo(realRobX, 430) && isCloseTo(realRobY, 150)) { //cat
					soundManager.playSound("l4","cat");
					highlighttrick(movementState+2);
					movementState++;
				}
			} else if (toGridX == 3 && toGridY == 1) {
				if (isCloseTo(realRobX, 560) && isCloseTo(realRobY, 150)) { //plug
					//If we reached the plug
					soundManager.playSound("l4", "completed");
					saveProgram();
					//commandsToExecute[movementState] = "x";
					$(soundManager).bind("endqueue",function(){
						$(soundManager).unbind("endqueue");
						for (var i=0;i<15;i++){
							addStarPoint();
						}
						anim3.stop();
						gameCompleted=true;
						removeLevel4();
						enableSideButtons();
						return;
						});
					return;	
				}
			} else if (toGridX == 0 && toGridY == 2) {
				if (isCloseTo(realRobX, 20) && isCloseTo(realRobY, 280)) { //treatcircle
					soundManager.playSound("l4","yummy");
					highlighttrick(movementState+2);
					movementState++;
				}
			} else if (toGridX == 1 && toGridY == 2) {
				if (isCloseTo(realRobX, 210) && isCloseTo(realRobY, 280)) { //treatstick
					soundManager.playSound("l4","treat");
					highlighttrick(movementState+2);
					movementState++;
				}
			} else if (toGridX == 2 && toGridY == 2) {
				if (isCloseTo(realRobX, 430) && isCloseTo(realRobY, 280)) { //crocodile
					soundManager.playSound("l4","crocodile");
					highlighttrick(movementState+2);
					movementState++;
				}
			}
		}
	}, layer);
	anim3.start();
}

function resetAnim4() {
	movementState = 0;
	anim3.stop();
	soundManager.playSound("all", "ithinkishouldgoback");
	$(soundManager).bind("endqueue",function(){
		$(soundManager).unbind("endqueue");
		resetRobot();
		enableButtonsForLevel4();
		//empty the commandList
		delete commandList;
		commandList = new Array();
		clearCodeText();
	});
}

function addCodeLine(line,layer) {
	if(typeof layer == "undefined")layer=window.layer;
	var cur = codeText.getText();
	codeText.setText(cur + "\n" + line);
	//highlighttrick(commandList.length);
	layer.drawScene();
}

function clearCodeText() {
	codeText.setText('');
	
}

function isCloseTo(x, y) {
	return ((x < (y + 5)) && (x > (y - 5)));
}

function removeLevel4() {
	/*
	if(replaying){
		removeTempLayer();
		return;
	}
	var length = layer.children.length;
	for (var i = length - 1; i > 2; i--) {//i=2 to skip rectangle,line and robot
		layer.children[i].remove();
	}
	resetRobot();*/
	makeProgram();
}

function setDimensions() {
	this.tleft = this.getX();
	this.ttop = this.getY();
	this.tright = this.tleft + this.getWidth();
	this.tbottom = this.ttop + this.getHeight();
}

function isButton(x, y) {
	if(inCastle){
		if(isPointWithin(x, y, castleImageArray.p11.tleft, castleImageArray.p11.tright, castleImageArray.p11.ttop, castleImageArray.p11.tbottom)){
			return 'c';
		}
		else if(isPointWithin(x, y, castleImageArray.p10.tleft, castleImageArray.p10.tright, castleImageArray.p10.ttop, castleImageArray.p10.tbottom)){
			return 'r';
		}
	}
	else if(inProgram){
		var limit = levelState;
		if(gameCompleted)limit=5;
		for(var i = 0; i<limit; i++){
			if(isPointWithin(x, y, programImageArray["p"+i].tleft, programImageArray["p"+i].tright, programImageArray["p"+i].ttop, programImageArray["p"+i].tbottom)){
				console.log(i);
				return i;
			}
		}
		return -1;
	}
	else if (isPointWithin(x, y, upB.button.tleft, upB.button.tright, upB.button.ttop, upB.button.tbottom))
		return 'u';
	else if (isPointWithin(x, y, downB.button.tleft, downB.button.tright, downB.button.ttop, downB.button.tbottom))
		return 'd';
	else if (isPointWithin(x, y, leftB.button.tleft, leftB.button.tright, leftB.button.ttop, leftB.button.tbottom))
		return 'l';
	else if (isPointWithin(x, y, rightB.button.tleft, rightB.button.tright, rightB.button.ttop, rightB.button.tbottom))
		return 'r';
}

function enableButtonsForLevel4() {
	stage.on("mousedown", buttonstuff);
	stage.on("touchstart", buttonstuff);
}


function highlighttrick(l){
	highlight = imageArray.p50;
	if(l==-1){
		highlight.hide();
	}
	else {
		highlight.show();
		highlight.setY(505+33*(l-1));
	}
	layer.draw();
}

function makeCastle() {
	//If the castle layer already exists, don't make it again, just reload it
	shutUp();
	disableTouch();
	enableButtonsForCastle();
	$('#pageTitle').html("Castle");
	$('#pageSubTitle').html("FUN!");
	inCastle=true;
	if ( typeof clayer == "undefined") {
		clayer = new Kinetic.Layer();
		castleImageArray = new Object();
		loadImage("/Capstone/img/castle1.png",10,10,null,clayer,castleImageArray,false,0);//0
		loadImage("/Capstone/img/castle2.png",10,10,null,clayer,castleImageArray,true,1);
		loadImage("/Capstone/img/castle3.png",10,10,null,clayer,castleImageArray,true,2);
		loadImage("/Capstone/img/castle4.png",10,10,null,clayer,castleImageArray,true,3);
		loadImage("/Capstone/img/castle5.png",10,10,null,clayer,castleImageArray,true,4);
		loadImage("/Capstone/img/robot1.png",160,350,null,clayer,castleImageArray,false,5);//5
		loadImage("/Capstone/img/robot2.png",160,350,null,clayer,castleImageArray,true,6);
		loadImage("/Capstone/img/robot3.png",160,350,null,clayer,castleImageArray,true,7);
		loadImage("/Capstone/img/robot4.png",160,350,null,clayer,castleImageArray,true,8);
		loadImage("/Capstone/img/robot5.png",160,350,null,clayer,castleImageArray,true,9);
		loadImage("/Capstone/img/robotpart.png",500,50,null,clayer,castleImageArray,false,10,showParts);//10
		loadImage("/Capstone/img/castlepart.png",500,300,null,clayer,castleImageArray,false,11,showParts);//11
		castleImageKey=0;
		robotImageKey=5;
		stage.add(clayer);
		soundManager.playSound("lcastle","speaker");
	}
	$("#prettyButton").show();
	clayer.add(rect);
	showParts();
	clayer.draw();
	soundManager.playSound("lcastle","love");
	hideAllLayersExcept(stage,clayer);
}

function showParts(){
	if(typeof castleImageArray.p10 == "undefined" || typeof castleImageArray.p11 == "undefined")return;
	if(playerStars<3){
		if(castleImageArray.p10)castleImageArray.p10.hide();
		if(castleImageArray.p11)castleImageArray.p11.hide();
		soundManager.playSound("lcastle","notenough");
	}
	else{
		if(robotImageKey<9)castleImageArray.p10.show();
		if(castleImageKey<4)castleImageArray.p11.show();
	}
	clayer.draw();
}

function removeCastle(){
	var layer;
	shutUp();
	if(gameCompleted)layer = window.prlayer;
	else layer = window.layer;
	inCastle=false;
	layer.add(rect);
	hideAllLayersExcept(stage,layer);
	disableTouch();
	if(!gameCompleted){restoreLevelState(levelState);}
	else makeProgram();
	$("#prettyButton").hide();
	layer.draw();
	
}

function betterCastle(){
	var castleImage = castleImageArray["p"+castleImageKey];
	castleImage.hide();
	castleImageKey++;
	castleImage = castleImageArray["p"+castleImageKey];
	castleImage.show();
	if(castleImageKey==4){
		castleImageArray.p11.remove();
	}
	soundManager.playSound("lcastle","yaycastle");
	clayer.draw();
}

function betterRobot(){
	var robotImage = castleImageArray["p"+robotImageKey];
	robotImage.hide();
	robotImageKey++;
	replaceRobotImage(castleImageArray["p"+robotImageKey].getImage());
	robotImage = castleImageArray["p"+robotImageKey];
	robotImage.show();
	if(robotImageKey==9){
		castleImageArray.p10.remove();
	}
	soundManager.playSound("lcastle","yayrobot");
	clayer.draw();
}

function enableButtonsForCastle() {
	stage.on("mousedown", cbuttonstuff);
	stage.on("touchstart", cbuttonstuff);
}

function cbuttonstuff(e){
	var buttonType = isButton(e.pageX, e.pageY);
	buyStuff(buttonType);
}

function buyStuff(c){
	if(playerStars>=3){
		if(c=='c' && castleImageKey<4)betterCastle();
		else if(c=='r' && robotImageKey<9)betterRobot();
		else{
			showParts();
			return;
		}
		showParts();
		setStarPoints(playerStars-3);
	}
	else{
		//TODO Play sound for not enough
	}
}


function hideAllLayersExcept(stage, layer) {
	for (var i = 0; i < stage.children.length; i++) {
		if (stage.children[i] == layer)
			stage.children[i].show();
		else
			stage.children[i].hide();
	}
	layer.draw();
}

function restoreLevelState(toLevelState){
	inCastle = false;
	if(toLevelState==0 || toLevelState==1 || toLevelState==3){
		enableDraw();
	}
	else if(toLevelState==2){
		if(debugged==true)enableDraw();
		else enableDebug();
	}
	else if(toLevelState==4){
		enableButtonsForLevel4();
	}
	$('#pageTitle').html("Level "+toLevelState);
	$('#pageSubTitle').html("Help the robot get to the plug!");
	levelState = toLevelState;
	if(typeof line != "undefined")removeLine();
	resetRobot();
}

function stopAllAnimations(){
	
}

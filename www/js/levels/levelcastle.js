function makeCastle() {
	//If the castle layer already exists, don't make it again, just reload it
	shutUp();
	disableTouch();
	enableButtonsForCastle();
	inCastle=true;
	if ( typeof clayer == "undefined") {
		clayer = new Kinetic.Layer();
		castleImageArray = new Object();
		loadImage("img/castle1.png",10,10,null,clayer,castleImageArray,false);//0
		loadImage("img/castle2.png",10,10,null,clayer,castleImageArray,true);
		loadImage("img/castle3.png",10,10,null,clayer,castleImageArray,true);
		loadImage("img/castle4.png",10,10,null,clayer,castleImageArray,true);
		loadImage("img/castle5.png",10,10,null,clayer,castleImageArray,true);
		loadImage("img/robot1.png",60,500,null,clayer,castleImageArray,false);//5
		loadImage("img/robot2.png",60,500,null,clayer,castleImageArray,true);
		loadImage("img/robot3.png",60,500,null,clayer,castleImageArray,true);
		loadImage("img/robot4.png",60,500,null,clayer,castleImageArray,true);
		loadImage("img/robot5.png",60,500,null,clayer,castleImageArray,true);
		loadImage("img/robotpart.png",500,50,null,clayer,castleImageArray,false);//10
		loadImage("img/castlepart.png",500,300,null,clayer,castleImageArray,false);//11
		castleImageKey=0;
		robotImageKey=5;
		clayer.add(rect);
		clayer.draw();
		stage.add(clayer);
	} else {
	}
	soundManager.playSound("lcastle","love");
	hideAllLayersExcept(stage,clayer);
}

function removeCastle(){
	var layer;
	shutUp();
	if(levelState == "program")layer = window.tlayer;
	else layer = window.layer;
	inCastle=false;
	layer.add(rect);
	hideAllLayersExcept(stage,layer);
	disableTouch();
	restoreLevelState(levelState);
	layer.draw();
}

function betterCastle(){
	var castleImage = castleImageArray["p"+castleImageKey];
	castleImage.hide();
	castleImageKey++;
	castleImage = castleImageArray["p"+castleImageKey];
	castleImage.show();
	clayer.draw();
}

function betterRobot(){
	var robotImage = castleImageArray["p"+robotImageKey];
	robotImage.hide();
	robotImageKey++;
	replaceRobotImage(castleImageArray["p"+robotImageKey].getImage());
	robotImage = castleImageArray["p"+robotImageKey];
	robotImage.show();
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
		if(c=='c')betterCastle();
		else if(c=='r')betterRobot();
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
}

function restoreLevelState(toLevelState){
	if(toLevelState==0 || toLevelState==1 || toLevelState==3){
		enableDraw();
	}
	else if(toLevelState==2){
		if(debugged==true)enableDraw();
		else enableDebug();
	}
	else if(toLevelState==4){
		
	}
	levelState = toLevelState;
}


//Adds a star to x,y
function addStar(x,y,layer,starsarray){
	//The robot
	var starImageObj = new Image();
	// The Kinetic.Image object
	starImageObj.onload = function() {
		var starObj = new Kinetic.Image({
			x : x,
			y : y,
			image : starImageObj,
		});
		layer.add(starObj);
		layer.drawScene();
		starsarray.push(starObj);
	}
	starImageObj.src = "/Capstone/img/star.png";
}

//Handles hitting stars -- this will run on every move
function starsHit(layer,starsarray){
	if(typeof layer == "undefined"){
		layer = window.layer;
	}
	if(typeof starsarray == "undefined"){
		starsarray = window.starsarray;
	}

	obj1 = robotObj;
	l1 = obj1.getX();
	r1 = l1 + obj1.twidth;
	t1 = obj1.getY();
	b1 = t1 + obj1.theight;
	for(var i=0;i<starsarray.length;i++){
		var star = starsarray[i];
		if(hitTest(l1,r1,t1,b1,star.attrs.x,star.attrs.x+star.attrs.width,star.attrs.y,star.attrs.y+star.attrs.height)){
			//Remove from array
			starsarray.splice(i,1);
			//Add points if this is not a replay
			if(!replaying)addStarPoint();
			//Remove from view
			star.remove();
			//delete star;
			soundManager.playSound("all","star");
			delete star;
			return;
		}
		
	}
	layer.drawScene();
}

//Removes all stars (for new levels)
function removeAllStars(){
	var l = starsarray.length;
	if (l<=0)return;
	for(var i=l-1;i>=0;i--){
		var star = starsarray[i];
		//Remove from view
		star.remove();
		//delete star;
		delete star;
	}
	starsarray = new Array();
	layer.drawScene();
}

//Adds a star point and refreshes the variable on the screen
function addStarPoint(){
	playerStars++;
	$("#numStars").html(playerStars);
}

function setStarPoints(toP){
	playerStars=toP;
	$("#numStars").html(playerStars);
}

function addStars(l,tlayer,starsarray){
	if(typeof tlayer == "undefined"){
		tlayer = window.layer;
	}
	if(typeof starsarray == "undefined"){
		starsarray = window.starsarray;
	}
	if(l==0){
	}
	else if(l==1){
		addStar(250,50,tlayer,starsarray);
		addStar(50,500,tlayer,starsarray);
		addStar(50,250,tlayer,starsarray);
		addStar(250,300,tlayer,starsarray);
		addStar(500,100,tlayer,starsarray);
	}
	else if(l==2){
		addStar(50,500,tlayer,starsarray);
		addStar(50,250,tlayer,starsarray);
		addStar(250,620,tlayer,starsarray);
		addStar(200,300,tlayer,starsarray);
		addStar(600,500,tlayer,starsarray);
	}
	else if(l==3){
		addStar(80,500,tlayer,starsarray);
		addStar(20,240,tlayer,starsarray);
		addStar(180,220,tlayer,starsarray);
		addStar(250,360,tlayer,starsarray);
		addStar(612,500,tlayer,starsarray);	
	}
	else if(l==4){
		addStar(200,100,tlayer,starsarray);
		addStar(380,100,tlayer,starsarray);
		addStar(180,220,tlayer,starsarray);
		addStar(380,220,tlayer,starsarray);
		addStar(530,220,tlayer,starsarray);	
	}
}


//Adds a star to x,y
function addStar(x,y){
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
	starImageObj.src = "img/star.png";
}

//Handles hitting stars -- this will run on every move
function starsHit(){
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
			//Add points
			addStarPoint();
			//Remove from view
			star.remove();
			//delete star;
			delete star;
			return;
		}
		
	}
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
}

//Adds a star point and refreshes the variable on the screen
function addStarPoint(){
	playerStars++;
	$("#numStars").html(playerStars);
}

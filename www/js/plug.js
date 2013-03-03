//Global Variables
//plugObj
//plugX
//plugY
//plugWidth
//plugHeight


//Add plug to stage
function addPlugToStage() {
	//The robot
	plugImageObj = new Image();
	// The Kinetic.Image object
	plugImageObj.onload = function() {
		plugX = 500;
		plugY = 500;
		plugObj = new Kinetic.Image({
			x : plugX,
			y : plugY,
			image : plugImageObj,
		});
		layer.add(plugObj);
		layer.drawScene();
		plugWidth = plugImageObj.width;
		plugHeight = plugImageObj.height;
	}
	plugImageObj.src = "img/plug.png";
}


//Remove plug
function removePlug(){
	plugObj.remove();
	delete plugObj;
}

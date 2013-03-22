//Global Variables
//plugObj
//plugX
//plugY
//plugWidth
//plugHeight


//Add plug to stage
function addPlugToStage() {
	plugImageObj = new Image();
	// The Kinetic.Image object
	
	plugImageObj.onload = function() {
		if(levelState==0 ||levelState==1 ||levelState==3){
			plugX = 500;
			plugY = 500;
		}
		else if(levelState==2){
			plugX = 250;
			plugY = 250;
		}
		else if(levelState==4){
			plugX = 580;
			plugY = 230;
		}
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
	if(typeof plugObj != 'undefined'){
		plugObj.remove();
		delete plugObj;
	}
}

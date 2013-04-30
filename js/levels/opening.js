function startOpening(){
	tempIntroLayer = new Kinetic.Layer();
	tempIntroArray = new Object();
	tempIntroLayer.add(rect);
	loadImage("/Capstone/img/clinky.png",50,50,null,tempIntroLayer,tempIntroArray,false,0);
	loadImage("/Capstone/img/robot-for-intro.png",200,240,null,tempIntroLayer,tempIntroArray,false,1,animateIntro);
	tempIntroLayer.draw();
	stage.add(tempIntroLayer);
	$("#controls").hide();
	soundManager.playSound("all","welcome");
		$(soundManager).bind("endqueue",function(){
			$(soundManager).unbind("endqueue");
			introAnim.stop();
			tempIntroLayer.remove();
			introAnim = null;
			tempIntroLayer = null;
			tempIntroArray = null
			layer.draw();
			generalInit();
			makeLevel0();
			//Redraw the layer
			//Add the layer to the stage
			stage.add(layer);
			$("#controls").show();
			//removeLevel1();
		});
}

function animateIntro(){
	goingLeft = true;
	prevTime = 0;
	introAnim = new Kinetic.Animation(function(frame) {
		var robot = tempIntroArray.p1;
		var x = robot.getX();
		if(goingLeft && x<50)goingLeft=false;
		else if(!goingLeft && x>200)goingLeft = true;
		if(frame.time - prevTime > 20) {// Animation continues:
			prevTime = frame.time;
			if(goingLeft)robot.setX(x-10);
			else robot.setX(x+10)
			tempIntroLayer.draw();
		}
	}, layer);
	introAnim.start();
}

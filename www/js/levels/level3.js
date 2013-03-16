//removeMaze();removePlug();removeAllStars();removeGuidelines();nextLevel();

function makeLevel3() {
	levelState = 3; //Keeps track of what level we are on
	delete currentSound;
	$('#pageTitle').html("Level 3");
	currentSound = new Audio("sounds/drawaline.mp3");
	robotObj.loadandplay("sounds/noidea.mp3");
	attemptCounter = 0;
	//Balls
	animatedBalls();
	//Add the Plug to the stage
	addPlugToStage();
	//Stars
	drawMaze();
	disableTouch();
	enableDraw();
}

function animatedBalls(){
	ballImageObj1 = new Image();
	ballImageObj2 = new Image();
	
	ballImageObj1.onload = loadBall;
	ballImageObj2.onload = loadBall;

	ballImageObj1.src = "img/ball.png";
	ballImageObj2.src = "img/ball.png";
	
}

function loadBall(){
	//First ball
	if( typeof ballObj1 == "undefined"){
		ballObj1 = new Kinetic.Image({
			x : 500,
			y : 50,
			image : ballImageObj1,
		});
		layer.add(ballObj1);
		layer.drawScene();
		//If this loads first
		if(typeof ballObj2 != "undefined")animateBalls();
		}
	//Second ball
	if(typeof ballObj2 == "undefined"){
		ballObj2 = new Kinetic.Image({
			x : 50,
			y : 300,
			image : ballImageObj2,
		});
		layer.add(ballObj2);
		layer.drawScene();
		if(typeof ballObj1 != "undefined")animateBalls();
		
	}
	ballWidth = ballImageObj1.width;
	ballHeight = ballImageObj1.height;
}

function animateBalls(){
	ball1defx = 500;
	ball2defx = 50;
	ball1defy = 50;
	ball2defy = 300;
	prevTime = 0;
	anim2 = new Kinetic.Animation(function(frame) {
			if (frame.time - prevTime > 20) {// Animation continues:
				bl1 = ballObj1.getX()
				br1 = bl1 + ballWidth;
				bt1 = ballObj1.getY();
				bb1 = bt1 + ballHeight;
				bl2 = ballObj2.getX();
				br2 = bl2 + ballWidth;
				bt2 = ballObj2.getY();
				bb2 = bt2 + ballHeight;
				prevTime = frame.time;
				ballObj1.setX(bl1-3);
				ballObj1.setY(bt1+3);
				ballObj2.setX(bl2+1);
				ballObj2.setY(bt2+1);
				if(hitTest(bl1,br1,bt1,bb1,bl2,br2,bt2,bb2)){ //When the balls collide restart animation
					ballObj1.setX(ball1defx);
					ballObj1.setY(ball1defy);
					ballObj2.setX(ball2defx);
					ballObj2.setY(ball2defy);
				}
			}
		}, layer);
		anim2.start();
}

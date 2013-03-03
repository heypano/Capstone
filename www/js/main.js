/*Global Variables*/
//robotObj
//plugObj
//stageWidth // stageHeight // stageX // stageY
//.twidth
//.theight

//TODO Separate things that happen for all levels 
//TODO If touch up happens out of the field, start moving
//TODO Why are there more than one layers
//TODO Look at intersection of previous point -> newpoint line with existing maze lines instead of using chunks
//TODO: Make sure line started on robot
//TODO: Make bounding boxes? maybe
//TODO get robot coordinate variables (l1,r1,b1,t1) only once per iteration
//TODO optimize code if getting slow
//TODO if get all stars give gift
//TODO add Animation before with robot saying hi
//TODO Images should not be draggable, text should not be selectable -- not an actual problem for mobile
//For robot voice
//Audacity - delay (0.1, 0.01, 0.01, 3) - changepitch(6 semitones up)

levelState = "Level0"; //Keeps track of what level we are on
playerStars = 0; //Keeps track of how many stars a player has
stageWidth = 700; //Global variable that keeps track of the stage width
stageHeight = 730; //Global variable that keeps track of the stage height
starsarray = new Array(); //Global array that keeps track of all the stars on the stage
currentSound = null; //Global variable that keeps track of what sound should be played when the speaker button is pressed
attemptCounter = 0; //This counts how many times a certain thing has been attempted
$(document).ready(function() {

	/* Initialization */
	//Create the stage
	stage = new Kinetic.Stage({
		container : 'stage',
		width : stageWidth,
		height : stageHeight
	});
	stageX = stage.getX();
	stageY = stage.getY();
	//Create the layer
	layer = new Kinetic.Layer();
	//Create the border for the stage
	rect = new Kinetic.Rect({
		x : 0,
		y : 0,
		width : 700,
		height : 730,
		fill : 'none',
		stroke : 'black',
		strokeWidth : 4
	});
	//Speaker
	$("#speakerButton").click(function(){
		currentSound.play();
	});
	layer.draw();
	generalInit();
	makeLevel1();
	//Redraw the layer
	//Add the layer to the stage
	stage.add(layer);
	//removeLevel1();
});

//Initalizes things that are useful for (almost) all pages
function generalInit(){
	//Create the line for moving the robot -- the one that is drawn
	line = new Kinetic.Line({
		points : new Array(),
		stroke : "black"
	});
	layer.add(line);
	layer.add(rect);
	//Add the Robot to the stage
	addRobotToStage();
	//Add the Plug to the stage
	addPlugToStage();
	//Set touch events for line
	stage.on("touchstart", startMove);
	stage.on("mousedown", startMove);
	stage.on("touchend", endMove);
	stage.on("mouseup", endMove);
}


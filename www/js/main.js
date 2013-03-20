/*Global Variables*/
//robotObj
//plugObj
//stageWidth // stageHeight // stageX // stageY
//.twidth
//.theight

//VISUALS
//TODO HIGH highlight command being executed (level 5)
//TODO HIGH subtitles
//TODO HIGH Move robot to top layer
//TODO HIGH Add trail of number / if then else to balls
//TODO HIGH different animated gif based on the level
//TODO Clinky the robot title of game
//TODO LOW Show image connecting robot to plug maybe replace image?

//GAMEPLAY
//TODO HIGH move bottom right star lower in level "2"
//TODO HIGH Attempt counter for all levels
//TODO HIGH try to reproduce and fix bug level 5
//TODO HIGH free moving level (surprise)
//TODO MEDIUM if get all stars give gift
//DONE add time to show robot ON plug 

//SOUND STUFF
//TODO HIGH Make sure sounds don't play on top of each other
//TODO HIGH Wait for it to play
//TODO HIGH add star sound
//TODO HIGH only load sound once maybe? Now that I have them all don't use load and play, just play
//TODO HIGH Make "enough time passed " boolean function
//DONE HIGH animal sounds
//DONE HIGH Add sound for getting star
//DONE HIGH all speaker instructions
//DONE HIGH Add sounds for EXECUTE COMMAND GO UP, EXECUTE COMMAND GO DOWN etc (everything)
//DONE HIGH Clinky is a bit clumsy!
//DONE HIGH "Can you find the mistake? Please help me debug my program"
//DONE HIGH say "Argument Control Buttons" (level 5)
//DONE HIGH make balls say they're executing software 
//DONE HIGH sound for hitting balls (ouch + ball sound)
//DONE HIGH mention robot returning to its original state
//DONE HIGH explain why access denied (I can't go that way!)

//DRAWING
//TODO HIGH If touch up happens out of the field, start moving
//TODO HIGH Fix problem with finishing drawing outside of line
//TODO HIGH Make sure line started on robot
//DONE for level 3 make sure drawing starts at green line

//MAZE
//TODO HIGH fix chunks in level before dodgeball level
//TODO HIGH limit chunks more
//TODO HIGH make sure plug / stars don't get hit from the wrong chunk

//COLLISION DETECTION
//TODO MEDIUM Make collision with plug smoother
//TODO MEDIUM Make bounding boxes? maybe

//INTERACTION
//TODO HIGH improve debug line usability
//TODO MEDIUM Make robot talk when you click it (or flick it? or when you talk to it?)
//TODO LOW Images should not be draggable, text should not be selectable -- not an actual problem for mobile
//DONE disable touch when robot moving level 5

//CODE STUFF
//TODO LOW optimize code if getting slow
//TODO LOW get robot coordinate variables (l1,r1,b1,t1) only once per iteration
//TODO LOW add Animation before with robot saying hi
//TODO LOW Separate things that happen for all levels 

//TESTING
//For robot voice
//Audacity - delay (0.1, 0.01, 0.01, 3) - changepitch(6 semitones up)
//For instructoir voice 3 semitones up

levelState = 0; //Keeps track of what level we are on
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
	makeLevel0();
	//Redraw the layer
	//Add the layer to the stage
	stage.add(layer);
	//removeLevel1();
});

//Initalizes things that are useful for (almost) all pages
function generalInit(){
	//Cloning Arrays
	Array.prototype.clone = function() {
		return this.slice(0);
	};
	//Create the line for moving the robot -- the one that is drawn
	line = new Kinetic.Line({
		points : [100,100],
		stroke : "black"
	});
	points = new Array();
	layer.add(line);
	layer.add(rect);
	//Add the Robot to the stage
	addRobotToStage();
	//Set touch events for line
	enableDraw();
}

function skipToLevel(level){
	for(var i=0;i<level;i++){
		removeMaze();removePlug();removeGuidelines();removeAllStars();removeBalls();nextLevel();
	}
}

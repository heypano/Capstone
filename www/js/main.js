/*Global Variables*/
//robotObj
//plugObj
//stageWidth // stageHeight // stageX // stageY
//.twidth
//.theight

//TODO LOW Separate things that happen for all levels 
//DONE for level 3 make sure drawing starts at green line
//TODO make sure plug / stars don't get hit from the wrong chunk
//DONE add time to show robot ON plug 
//TODO say "Argument Control Buttons"
//TODO improve debug line usability
//TODO highlight command being executed
//TODO make balls say they're executing software (trail of numbers? if then else?)
//TODO subtitles
//TODO fix chunks in dodgeball level
//TODO move bottom right star lower in level "2"
//TODO mention robot returning to its original state
//TODO sound for hitting balls (ouch + ball sound)
//TODO different animated gif based on the level
//TODO change condition to not hit plug too easily
//TODO LOW Show image connecting robot to plug maybe replace image?
//TODO add remove previous level
//TODO HIGH Add sounds for EXECUTE COMMAND GO UP, EXECUTE COMMAND GO DOWN etc (everything)
//TODO Add sound for getting star
//TODO make fucntion "Play program"
//TODO add a lot of audio feedback for everything and wait for it to play
//TODO Fix problem with finishing drawing outside of line
//TODO "Can you find the mistake? Please help me debug my program"
//TODO Make sure sounds don't play on top of each other
//TODO Make collision with plug smoother
//TODO Make robot talk when you click it (or flick it? or when you talk to it?)
//TODO If touch up happens out of the field, start moving
//TODO Why are there more than one layers
//TODO Look at intersection of previous point -> newpoint line with existing maze lines instead of using chunks
//TODO OR: limit chunks more
//TODO: Make sure line started on robot
//TODO: Make bounding boxes? maybe
//TODO get robot coordinate variables (l1,r1,b1,t1) only once per iteration
//TODO optimize code if getting slow
//TODO if get all stars give gift
//TODO add Animation before with robot saying hi
//TODO Images should not be draggable, text should not be selectable -- not an actual problem for mobile
//TODO Move robot to top
//For robot voice
//Audacity - delay (0.1, 0.01, 0.01, 3) - changepitch(6 semitones up)

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


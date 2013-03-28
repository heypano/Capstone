/*Global Variables*/
//robotObj
//plugObj
//stageWidth // stageHeight // stageX // stageY
//.twidth
//.theight

//HIGHEST PRIORITY

//DONE HIGH Make sure line started on robot
//DONE HIGH Debug level drawing IMMEDIATELY (before sound)
//DONE HIGH disable / remove buttons while replaying
//DONE HIGH STOP DRAWING IMMEDIATELY AFTER HITTING PLUG
//DONE HIGH If touch up happens out of the field, start moving
//DONE HIGH highlight command being executed (level 5)
//DONE HIGH Make dodgeball level easier
//DONE don't let hit buttons when on level 4 and moving -- OR When 6 commands
//DONE HIGH Add the dog somewhere
//DONE HIGH fix chunks in level before dodgeball level
//DONE HIGH make sure plug / stars don't get hit from the wrong chunk
//DONE HIGH handle number of times that speaker instructions are pressed
//TODO HIGH Attempt counter for level 4
//TODO STOP INTERACTION IMMEDIATELY after hitting plug -- UNCOMMENT if( collidesR == 3)
//TODO HIGH not enough stars sound
//TODO HIGH Sound for replay (replaying)
//TODO HIGH different animated gif based on the level
//TODO HIGH Add arrows for commands
//TODO HIGH title/subtitles for replay
//TODO HIGH change castle speaker (shop doesn't exist anymore)
//TODO HIGH check button transitions
//DONE HIGH List of programs page -- replay Button
//DONE HIGH if no programs?

//VISUALS
//TODO HIGH Change color of line base3d on speed
//TODO HIGH subtitles
//TODO HIGH Move robot to top layer
//TODO HIGH Add trail of number / if then else to balls
//TODO HIGH Clinky the robot title of game (intro page?)
//TODO HIGH Back Button
//TODO LOW Show image connecting robot to plug maybe replace image?

//GAMEPLAY
//TODO HIGH do not touch button with fun level
//TODO HIGH move bottom right star lower in level "2"
//TODO HIGH try to reproduce and fix bug level 5
//TODO HIGH free moving level (surprise)
//TODO MEDIUM if get all stars give gift
//TODO LOW Execute previous program again
//DONE HIGH Castle
//DONE HIGH Shop
//DONE add time to show robot ON plug 

//SOUND STUFF
//TODO Sounds left:
//level 1 has 2 stars same place
//Speaker stops working 
//0introintro
//castlespeak
//shopspeak
//allthestarsgift
//ohnorunningout
//oopswall
//oops
//noideawheretogo
//castlelove
//4woof
//TODO RESTART sounds?
//TODO HIGH take care of speed f
//TODO More castle sounds?
//TODO Low: make ouch sound shorter\
//DONE HIGH fix "I think i should go back" to play before it goes back
//DONE HIGH Make sure sounds don't play on top of each other
//DONE HIGH only load sound once maybe? Now that I have them all don't use load and play, just play
//DONE HIGH Make "enough time passed " boolean function
//DONE HIGH Wait for it to play
//DONE HIGH add star sound
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
//DONE for level 3 make sure drawing starts at green line

//MAZE
//TODO HIGH limit chunks more

//COLLISION DETECTION
//TODO MEDIUM Make collision with plug smoother
//TODO MEDIUM Make bounding boxes? maybe

//INTERACTION
//TODO HIGH Don't let them click the speaker button super often
//TODO HIGH DONT LET PRESS BUTTONS IMMEDIATELY AFTER 6
//TODO HIGH Test overall usability when done, act like a child
//TODO MEDIUM Make robot talk when you click it (or flick it? or when you talk to it?)
//TODO LOW Images should not be draggable, text should not be selectable -- not an actual problem for mobile
//DONE HIGH improve debug line usability
//DONE disable touch when robot moving level 5

//CODE STUFF
//TODO HIGH look at todos in other places
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
inCastle=false;
gameCompleted=false;
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
	enableSideButtons();
	
	$("#enterButton").hide();
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

function keylength(obj){
  var count=0;
  for(var i in obj)
  {
    count++;
  }
  return count;
}

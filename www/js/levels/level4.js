function makeLevel4() {
	levelState = 4; //Keeps track of what level we are on
	delete currentSound;
	$('#pageTitle').html("Level 4");
	currentSound = new Audio("sounds/drawaline.mp3");
	robotObj.loadandplay("sounds/noidea.mp3");
	attemptCounter = 0;
	//Add the Plug to the stage
	addPlugToStage();
	//Stars
	imageArray = new Object();
	imgCount = 0;
	/*imageArray.prototype.countAttrs = function(){
		var count = 0;
		for (var k in this){
			if(foo.hasOwnProperty(k)){
				count++;
			}
		}
		return count;
	}*/
	drawMaze();
	makeGrid();
	Buttons();
	disableTouch();
}


function Buttons(){
	leftB = new Object();
	leftB.name = "l";
	upB = new Object();
	upB.name = "u";
	downB = new Object();
	downB.name = "d";
	rightB = new Object();
	rightB.name = "r";
	loadImage("img/leftButton.png",30,600,leftB);
	loadImage("img/upButton.png",130,510,upB);
	loadImage("img/downButton.png",130,600,downB);
	loadImage("img/rightButton.png",230,600,rightB);
	buttonBorder = new Kinetic.Line({
        points: [5,450,350,450,350,725],
        stroke: '#ababab',
        strokeWidth: 5,
        lineCap: 'round',
        lineJoin: 'round'
      });
    attentionText = new Kinetic.Text({
        x: 100,
        y: 460,
        text: 'Attention!',
        fontSize: 35,
        fontWeight: 100,
        fontFamily: 'Impact',
        fill: 'red'
      });
    layer.add(attentionText);
    layer.add(buttonBorder);
}





function makeGrid(){
	loadImage("img/cat.png",50,220);
	loadImage("img/treat1.png",50,370);
	loadImage("img/cat.png",580,60);
	loadImage("img/treat1.png",240,80);
	loadImage("img/dogfood.png",210,220);
	loadImage("img/treat2.png",460,80);
	loadImage("img/cat.png",420,220);
	loadImage("img/treat2.png",270,370);
	loadImage("img/crocodile.png",430,350);
	connectorGrid();
}


function connectorGrid(){
	connectorGrid = new Array();
	connectorGrid.push(new Kinetic.Line({
        points: [170,100,220,100],
        stroke: 'black',
        strokeWidth: 1,
      }));
	connectorGrid.push(new Kinetic.Line({
        points: [350,100,440,100],
        stroke: 'black',
        strokeWidth: 1,
      }));
	connectorGrid.push(new Kinetic.Line({
        points: [530,100,580,100],
        stroke: 'black',
        strokeWidth: 1,
      }));
	connectorGrid.push(new Kinetic.Line({
        points: [170,250,220,250],
        stroke: 'black',
        strokeWidth: 1,
      }));
	connectorGrid.push(new Kinetic.Line({
        points: [350,250,440,250],
        stroke: 'black',
        strokeWidth: 1,
      }));
	connectorGrid.push(new Kinetic.Line({
        points: [530,250,580,250],
        stroke: 'black',
        strokeWidth: 1,
      }));
	connectorGrid.push(new Kinetic.Line({
        points: [170,400,250,400],
        stroke: 'black',
        strokeWidth: 1,
      }));
	connectorGrid.push(new Kinetic.Line({
        points: [350,400,410,400],
        stroke: 'black',
        strokeWidth: 1,
      }));
      //Vertical
    for(var i = 0 ; i<connectorGrid.length ; i++){
    	layer.add(connectorGrid[i]);
    }
}



function loadImage(filepath,x,y,reference){
	var imag = new Image();
	//imag.onload = (loadImg)(imag,x,y);
	imag.onload = function(){
		imagObj = new Kinetic.Image({
			x : x,
			y : y,
			image : imag,
		});
		layer.add(imagObj);
		layer.drawScene();
		imageArray["p"+imgCount]=imagObj;
		imgCount++;
		if(typeof reference != "undefined"){
			reference.button = imagObj;
			buttonFunctionality(reference);
		}
	}
	imag.src = filepath;
}

function buttonFunctionality(reference){
	reference.button.name = reference.name;
	reference.button.on("touchstart",control);
	reference.button.on("mousedown",control);
}

function control(){
	var n = this.name;
	
}

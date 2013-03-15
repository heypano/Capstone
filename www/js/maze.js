

//Draw maze
function drawMaze() {
	if(levelState==1){
		mazeline = new Kinetic.Line({
			points : [0, 0, 200, 0, 200, 500, 200, 0, 0, 0, 0, 732, 400, 732, 400, 200],
			stroke : "black"
		});
		//Draw stars
		addStar(250,50);
		addStar(50,500);
		addStar(50,250);
		addStar(250,300);
		addStar(500,100);
		layer.add(mazeline);
	}
	else if(levelState==2){
		mazeline = new Kinetic.Line({
			points : [0, 0, 0,200,500,200,500,400,200,400,200,600,500,600],
			stroke : "black"
		});
		//Draw stars
		addStar(50,500);
		addStar(50,250);
		addStar(250,620);
		addStar(250,300);
		addStar(600,500);
		layer.add(mazeline);
	}
	
	
	
}

function removeMaze(){
	if(typeof mazeline != 'undefined'){
		mazeline.remove();
		delete mazeline;
	}
}

function getChunk(r1, t1) {// Gets which chunk we are at in the maze(down to right)
	if(levelState==1){
		//[0, 0, 200, 0, 200, 500, 200, 0, 0, 0, 0, 732, 400, 732, 400, 200],
		if (r1 < 200 && t1 < 500)
			return 1;
		else if (r1 < 200 && t1 > 500)
			return 2;
		else if (r1 < 400 && t1 > 500)
			return 3;
		else if (r1 < 400 && t1 > 200)
			return 4;
		else if (r1 < 400 && t1 < 200)
			return 5;
		else if (t1 < 200)
			return 6;
		else
			return 7;
	}
	else if(levelState==2){		
		//[0, 0, 0,200,500,200,500,400,200,400,200,600,500,600]
		if (r1 < 500 && t1 < 200)
			return 1;
		else if (r1 > 500  && t1 < 200 )
			return 2;
		else if (r1 >500  && t1 <400 )
			return 3;
		else if (r1 >500  && t1 <600 )
			return 4;
		else if (r1<500 && r1>200  && t1 > 400 && t1 <600)
			return 5;
		else if (r1 > 500 && t1 > 600)
			return 6;
		else if (r1 > 200  && t1 > 600)
			return 7;
		else if (r1 < 200 && t1 > 600)
			return 8;
		else if (r1 < 200 && t1 > 400)
			return 9;
		else if (r1 < 200 && t1 > 200)
			return 10;
		else if (r1 < 500 && r1>200 && t1 > 200 && t1<400 )
			return 11;

	}
}

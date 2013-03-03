

//Draw maze
function drawMaze() {
	mazeline = new Kinetic.Line({
		points : [0, 0, 200, 0, 200, 500, 200, 0, 0, 0, 0, 732, 400, 732, 400, 200],
		stroke : "black"
	});
	layer.add(mazeline);
	
	//Draw stars
	addStar(250,50);
	addStar(50,500);
	addStar(50,250);
	addStar(250,300);
	addStar(500,100);
	
}

function removeMaze(){
	mazeline.remove();
	delete mazeline;
}

function getChunk(r1, t1) {// Gets which chunk we are at in the maze(down to right)
	//[0, 0, 200, 0, 200, 500, 200, 0, 0, 0, 0, 732, 400, 732, 400, 200],
	if (r1 < 200 && t1 < 500)
		return 1;
	else if (r1 < 400 && t1 > 500)
		return 2;
	else if (r1 < 400 && t1 > 200)
		return 3;
	else if (t1 < 200)
		return 4;
	else
		return 5;
}

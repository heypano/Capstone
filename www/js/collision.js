
//Is obj Colliding with something (returns what otherwise null)
function collides(obj1) {
	l1 = obj1.getX();
	r1 = l1 + obj1.twidth;
	t1 = obj1.getY();
	b1 = t1 + obj1.theight;

	//Outside of stage
	if (l1 < stageX || (r1 > stageX + stageWidth) || t1 < stageY || (b1 > stageY + stageHeight)) {
		return 1;
		// TODO change this later -- 1 means border
	}

	//Collides with plug
	if (hitTest(l1, r1, t1, b1, plugX, plugX + plugWidth, plugY, plugY + plugWidth)) {
		return 3;
		// TODO change this later -- 3 means plug
	}

	//Collides with ball
	if (levelState==3){
		if(hitTest(l1, r1, t1, b1, bl1, br1, bt1, bb1) || hitTest(l1, r1, t1, b1, bl2, br2, bt2, bb2)){
			
			return 4; //Collides with either ball
		}
	}

	return 0;
	//nothing
}

function hitTest(l1, r1, t1, b1, l2, r2, t2, b2) {
		if (r1 >= l2 && l1 <= r2 && b1 >= t2 && t1 <= b2)
			return true;
		else
			return false;
}

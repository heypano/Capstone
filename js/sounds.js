//USE this.isPlaying

soundManager = new Object();

soundManager.queue = new Queue(); 
soundManager.isPlaying = false; // OR USE currentSound.paused
soundManager.addSounds = addSounds; //Initialization function
soundManager.processSoundQueue = processSoundQueue; //Sound Queue stuff
soundManager.addSounds();

//This is the function that will be called
soundManager.playSound = function(domain,soundadd){
	if(inCastle){
		if(domain!="lcastle")return;
		else{
			if(soundadd!="love" && soundadd!="speaker" && soundadd!="notenough" && soundadd!="yaycastle" && soundadd!="yayrobot")return;
		}
	}
	
	//Enqueue the item
	var sound = soundManager[domain][soundadd];
	if(soundadd=="ithinkishouldgoback"){ //Only play I think I should go back once per level
		if(sound["l"+levelState]!=true){
			sound["l"+levelState] = true; //this sound has already been played once for this level
			this.queue.enqueue(sound);
		}
		else{
			if(this.queue.getLength()==0)$(soundManager).trigger("endqueue");
		}
	}
	else if(soundadd=="ouch"){ //Don't play more than 3 ouches
		if(!sound["l"+levelState])sound["l"+levelState]=0;
		if(sound["l"+levelState]<2){
			sound["l"+levelState]++;
			this.queue.enqueue(sound);
		}
		else{
			if(this.queue.getLength==0)$(soundManager).trigger("endqueue");
		}
	}
	else{ //General case
		this.queue.enqueue(sound);
	}
	//If a sound is playing don't do anything else
	if(this.isPlaying == true){
		return;
	}
	else{//If no sound is playing
		this.processSoundQueue();
	}
}

function processSoundQueue(){
	var sound = soundManager.queue.dequeue();
	if(sound!==undefined){ //If there is something left in the queue
		soundManager.currentSoundPlaying = sound;
		if(!soundManager.currentSoundPlaying.hasBeenSet){ //If the event listener hasn't been set
			soundManager.currentSoundPlaying.addEventListener("pause",processSoundQueue);
			soundManager.currentSoundPlaying.hasBeenSet = true;
			//console.log("setting event listener for "+sound.src);
		}
		else{
			//console.log("not setting event listener for "+sound.src);
		}
		//Something is playing
		soundManager.isPlaying = true;
		soundManager.currentSoundPlaying.play();
	}
	else{//There is nothing left in the Queue
		//Nothing is playing now
		//console.log("Done with the queue!");
		soundManager.isPlaying = false;
		$(soundManager).trigger("endqueue");
	}
	
}
/*
soundManager.playSound("all","star");
soundManager.playSound("all","allstar");
soundManager.playSound("all","allstar");
soundManager.playSound("all","star");
*/

function addSounds(){
	this.all = new Object();
	this.all.star = new Audio ("/Capstone/sounds/star.mp3");
	this.all.accessdenied = new Audio ("/Capstone/sounds/accessdenied.mp3");
	this.all.allthestarsgift = new Audio("/Capstone/sounds/robot/00_allthestarsgift.mp3");
	this.all.ithinkishouldgoback = new Audio("/Capstone/sounds/robot/00_ithinkishouldgoback.mp3");
	this.all.ohnorunningout = new Audio("/Capstone/sounds/robot/00_ohnorunningout.mp3");
	this.all.oops = new Audio("/Capstone/sounds/robot/00_oops.mp3");
	this.all.oopsjusthitwall = new Audio("/Capstone/sounds/robot/00_oopsjusthitwall.mp3");
	this.all.yay = new Audio("/Capstone/sounds/robot/0_yay.mp3");
	this.all.welcome = new Audio("/Capstone/sounds/speaker/00_welcome.mp3");
	this.l0 = new Object();
	this.l0.introintro = new Audio("/Capstone/sounds/speaker/0_introintro.mp3");
	this.l0.speaker = new Audio("/Capstone/sounds/speaker/0_speakerinstrstart.mp3");
	this.l0.introbyrobot = new Audio("/Capstone/sounds/robot/0_introbyrobot.mp3");
	this.l1 = new Object();
	this.l1.mazeconfusing = new Audio("/Capstone/sounds/robot/1_2_mazeconfusing.mp3");
	this.l1.noideawheretogo = new Audio("/Capstone/sounds/robot/1_2_noideawheretogo.mp3");
	this.l1.speaker = new Audio("/Capstone/sounds/speaker/1_speakerinstrmaze.mp3");
	this.l2 = new Object();
	this.l2.mistakehelpmedebug = new Audio("/Capstone/sounds/robot/2_mistakehelpmedebug.mp3");
	this.l2.yourerightdebug = new Audio("/Capstone/sounds/robot/2_yourerightdebug.mp3");
	this.l2.speaker = new Audio("/Capstone/sounds/speaker/2_speakerinstrdebug.mp3");
	this.l3 = new Object();
	this.l3.moreprograms = new Audio("/Capstone/sounds/robot/3_moreprograms.mp3");
	this.l3.ouch = new Audio("/Capstone/sounds/robot/3_ouch.mp3");
	this.l3.speaker = new Audio("/Capstone/sounds/speaker/3_speakerinstrballsloop.mp3");
	this.l4 = new Object();
	this.l4.cat = new Audio("/Capstone/sounds/4_cat.mp3");
	this.l4.crocodile = new Audio("/Capstone/sounds/4_crocodile.mp3");
	this.l4.treat = new Audio("/Capstone/sounds/4_treat.mp3");
	this.l4.woof = new Audio("/Capstone/sounds/4_woof.mp3");
	this.l4.cantgothatway = new Audio("/Capstone/sounds/robot/4_cantgothatway.mp3");
	this.l4.executedown = new Audio("/Capstone/sounds/robot/4_executedown.mp3");
	this.l4.executeleft = new Audio("/Capstone/sounds/robot/4_executeleft.mp3");
	this.l4.executeright = new Audio("/Capstone/sounds/robot/4_executeright.mp3");
	this.l4.executeup = new Audio("/Capstone/sounds/robot/4_executeup.mp3");
	this.l4.mmmmdogfood = new Audio("/Capstone/sounds/robot/4_mmmmdogfood.mp3");
	this.l4.toomanythings = new Audio("/Capstone/sounds/robot/4_toomanythings.mp3");
	this.l4.yummy = new Audio("/Capstone/sounds/robot/4_yummy.mp3");
	this.l4.completed = new Audio("/Capstone/sounds/speaker/5_completed.mp3");
	this.l4.speaker = new Audio("/Capstone/sounds/speaker/4_speakerinstrcommands.mp3");
	this.lcastle = new Object();
	this.lcastle.love = new Audio("/Capstone/sounds/robot/castle_love.mp3");
	this.lcastle.speaker = new Audio("/Capstone/sounds/speaker/castle_speakerinstr.mp3");
	this.lcastle.notenough = new Audio("/Capstone/sounds/speaker/castle_notenoughstars.mp3");
	this.lcastle.yayrobot = new Audio("/Capstone/sounds/robot/castle_yayrobot.mp3");
	this.lcastle.yaycastle = new Audio("/Capstone/sounds/robot/castle_yaycastle.mp3");
	this.lprogram = new Object();
	this.lprogram.speaker = new Audio("/Capstone/sounds/speaker/program_speakerinstr.mp3");
	this.lglossary = new Object();
	this.lglossary.program = new Audio("/Capstone/sounds/speaker/glossary_program.mp3");
	this.lglossary.executing = new Audio("/Capstone/sounds/speaker/glossary_executing.mp3");
	this.lglossary.parallel = new Audio("/Capstone/sounds/speaker/glossary_parallelalel.mp3");
	this.lglossary.debug = new Audio("/Capstone/sounds/speaker/glossary_debug.mp3");
}


function shutUp(){
	soundManager.currentSoundPlaying.pause();
	while(!soundManager.queue.isEmpty())soundManager.queue.dequeue();
}

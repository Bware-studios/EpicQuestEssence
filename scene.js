//
// ojo supone que al crear la escena en curso se ha dejado en la global thescene
//

var deltatms=50;

var player_initial_pos_x = 128;
var player_initial_pos_y = 128;


function Scene(ctx) {
	this.running=false;
	this.ctx=ctx;
	this.nticks=0;
	
	
	this.paused=false;
	this.frames= new GFrames(this.ctx,'Personajes.png',64,64);
	this.otherframes= new GFrames(this.ctx,'Fondos.png',64,64);
	this.soundbox= new SoundBox();
	this.stats= new Scoreboard();
    
        
    this.dialog = new Dialog('dialog1');

}


Scene.prototype.start_level = function(x) {
	this.stats.reset();
	
	get_map(x,this);
    this.background = new Background(this.ctx,this.map);

    this.malos = new Array();
    var i;
    for (i=0;i<this.nmalos;i++) {
    	var malo_x,malo_y;
    	do {
    		malo_x=Math.random()*w;
    		malo_y=Math.random()*h;
    		malo_x=Math.floor(malo_x/64)*64;
    		malo_y=Math.floor(malo_y/64)*64;
    		//log('malo at ('+malo_x+','+malo_y+')+ free '+this.map.free64block(malo_x,malo_y));
        } while( (Math.abs(malo_x-this.player.x)<200 && Math.abs(malo_y-this.player.y)<200)
        || !this.map.free64block(malo_x,malo_y)  ) ;
        //log('ok');
        this.malos.push(new Sprite(this.frames,malo_x,malo_y,sprite_tipo_orco));
    }
    this.won=false;
}


Scene.prototype.start_game = function() {
	if (this.running) {
		return;
	}
	this.running=true;
	
	this.level=1;
	this.start_level(this.level);
	setTimeout("thescene.tick();",deltatms);
	
	this.dialog.message_start();
}

Scene.prototype.restart_game = function() {
	this.start_level(this.level);
	setTimeout("thescene.tick();",deltatms);
	
	this.dialog.message_restart();
}




Scene.prototype.tick = function() {
	this.nticks+=1;
	react_to_control();
    this.player.tick();
	var i;
    for (i=0 ; i < this.malos.length ; i++ ) {
        this.malos[i].tick();
        if (!this.player.dead) this.player.checkCollision(this.malos[i])
    }

	this.draw();
	if ( !this.paused ) {
	    setTimeout("thescene.tick();",deltatms);
    }
}

Scene.prototype.pause = function() {
    this.paused=true;
}

Scene.prototype.unpause = function() {
	if (this.paused) {
	    this.paused=false;
		setTimeout("thescene.tick();",deltatms);
	}
}

Scene.prototype.dialog_enter = function() {
    this.dialog.hide();
	if (thescene.player.dead) {
		this.pause();
		this.level=1;
		this.restart_game();
	} else if (thescene.won) {
	    this.level+=1;
	    this.restart_game();
	} else {
    	this.unpause();
    }
}

Scene.prototype.draw = function() {
    this.background.draw();
	//log('drawing... '+this.nticks);

    // erase all
	//this.ctx.fillStyle='#ff0000';
	//this.ctx.fillRect(0,0,800,600);


    this.princess.draw();
    this.player.draw();
    var i;
    for (i=0 ; i < this.malos.length ; i++ ) {
        this.malos[i].draw();
    }

//	this.frames.drawFrame(this.nticks%2+this.player_direccion*2,0,this.player_x,this.player_y);

//	this.frames.drawFrame(2+(this.nticks+1)%2,1,600,460);
//	this.frames.drawFrame(2+this.nticks%2,1,670,490);
//	this.frames.drawFrame(2+(this.nticks+1)%2,1,620,500);

	if (debug) {
	this.ctx.fillStyle='#ff0000';
	if (left1_is_pressed) this.ctx.fillStyle='#00ff00';
	this.ctx.fillRect(10,620,10,10);
	this.ctx.fillStyle='#ff0000';
	if (right1_is_pressed) this.ctx.fillStyle='#00ff00';
	this.ctx.fillRect(50,620,10,10);
	this.ctx.fillStyle='#ff0000';
	if (up1_is_pressed) this.ctx.fillStyle='#00ff00';
	this.ctx.fillRect(30,620,10,10);
	this.ctx.fillStyle='#ff0000';
	if (down1_is_pressed) this.ctx.fillStyle='#00ff00';
	this.ctx.fillRect(30,600,10,10);

	this.ctx.fillStyle='#ff0000';
	if (left2_is_pressed) this.ctx.fillStyle='#00ff00';
	this.ctx.fillRect(70,620,10,10);
	this.ctx.fillStyle='#ff0000';
	if (right2_is_pressed) this.ctx.fillStyle='#00ff00';
	this.ctx.fillRect(110,620,10,10);
	this.ctx.fillStyle='#ff0000';
	if (up2_is_pressed) this.ctx.fillStyle='#00ff00';
	this.ctx.fillRect(90,620,10,10);
	this.ctx.fillStyle='#ff0000';
	if (down2_is_pressed) this.ctx.fillStyle='#00ff00';
	this.ctx.fillRect(90,600,10,10);

	this.ctx.fillStyle='#00ff00';
	if (mouse_is_down) this.ctx.fillRect(mouse_target_x-10,mouse_target_y-10,20,20);
	this.ctx.fillStyle='#ff0000';
	if (mouse_is_down) this.ctx.fillRect(thescene.player.x-10,thescene.player.y-10,20,20);
	}

}



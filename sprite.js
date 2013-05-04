var sprite_tipo_heroe=0;
var sprite_tipo_orco=1;

var sprite_heroe_max_nticks=3;
var sprite_orco_max_nticks=4;

function Sprite(frames,x,y,tipo) {
    this.frames=frames;
    this.x=x;
    this.y=y;
    this.moving=false;

    this.tipo=tipo;

    if ( this.tipo==sprite_tipo_orco ) {
        this.target_x=Math.random()*w;
        this.target_y=Math.random()*h;
        this.v=5+Math.random()*10;
    }

    this.ipos=0;
    this.nticks=0;
    this.direccion=0;
    this.hurting=false;
    this.dead=false;
}

Sprite.prototype.tick = function() {
    if (this.tipo==sprite_tipo_orco) {
        this.moving=true;
        var new_x,new_y;
        var delta_x=this.target_x-this.x;
        var delta_y=this.target_y-this.y;
        var d=Math.sqrt(delta_x*delta_x+delta_y*delta_y);
        new_x=this.x+this.v*delta_x/d;
        new_y=this.y+this.v*delta_y/d;
        if (d<10 || this.blocked) {
        	if (!thescene.player.dead) {
            	var r=Math.random();
            	if (r<0.5) {
                	this.target_x=thescene.player.x;
                	this.target_y=this.y+Math.random()*200-100;
            	} else {
                	this.target_y=thescene.player.y;
                	this.target_x=this.x+Math.random()*200-100;
            	}
            } else {
            	this.target_x=Math.random()*w;
            	this.target_y=Math.random()*h;
            }
            this.v=5+Math.random()*10;
        }
        if (delta_x>0) this.direccion=0;
        if (delta_x<0) this.direccion=1;
        if (thescene.map.free64block(new_x,new_y)) {
        	this.x=new_x;   this.y=new_y;
        	this.blocked=false;
        } else {
        	this.blocked=true;
        }
    }
    if (this.moving || this.hurting && !this.dead) {
        this.nticks+=1;
        var maxnticks=sprite_orco_max_nticks;
        if (this.tipo==sprite_tipo_heroe) maxnticks=sprite_heroe_max_nticks;
        if (this.nticks>=maxnticks) {
            if (this.tipo==sprite_tipo_heroe) thescene.soundbox.play(sound_walk);
			if (this.hurting) {
				this.hurting=false;
				this.nticks=0;
			} else {
	            this.ipos=(this.ipos+1)%2;
    	        this.nticks=0;
    	    }
        }
    } else {
        this.ipos=0;
    }
}

Sprite.prototype.draw = function() {
    if (this.mark) {
        this.frames.ctx.fillRect(this.x,this.y,64,64);
    }
    var iframe=this.direccion*2+this.ipos;
    if (this.hurting) iframe=4+this.direccion;
    if (this.dead) iframe=6;
    this.frames.drawFrame(iframe,this.tipo,this.x,this.y);
}

Sprite.prototype.move = function (dx,dy) {
    this.moving=false;
    if (this.dead) return;
    
    var new_x=this.x,new_y=this.y;
    if ( dx!=0 ) {
        this.moving=true;
        new_x=this.x+dx*16;
    }
    if ( dy!=0 ) {
        this.moving=true;
        new_y=this.y+dy*16;
    }
    if (dx>0) {
        this.direccion=0;
    }
    if (dx<0) {
        this.direccion=1;    
    }
    if (new_x<0) new_x=0;
    if (new_x>w-64) new_x=w-64;
    if (new_y<0) new_y=0;
    if (new_y>h-64) new_y=h-64;
    if (thescene.map.free64block(new_x,new_y)) {
    	this.x=new_x;
    	this.y=new_y;
    } /* else {
    	if (Math.floor(this.x/64)<Math.floor(new_x/64)) {
    		this.x=Math.ceil(this.x/64)*64;
    	}
    	if (Math.floor(this.y/64)<Math.floor(new_y/64)) {
    		this.y=Math.ceil(this.y/64)*64;
    	}
    } */
    if (!thescene.won) {
        if (thescene.princess.checkCollision(thescene.player)) {
            thescene.won=true;
            thescene.soundbox.play(sound_object);
            thescene.dialog.message_success();
        }
    }
}

Sprite.prototype.checkCollision = function(malo) {
    var dist_x=Math.abs(this.x-malo.x);
    var dist_y=Math.abs(this.y-malo.y);
    if (dist_x<60 && dist_y<60) {
        //malo.mark=true;
        thescene.soundbox.play(sound_hurt);
        this.hurting=true;
        this.nticks=0;
        var life=thescene.stats.lifeDecrease(5);
        if (life==0) {
        	this.dead=true;
        	setTimeout("thescene.dialog.message_dead();",2000);
        }
    }    
}





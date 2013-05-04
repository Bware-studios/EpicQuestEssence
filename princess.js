
function Princess(ix,iy) {
	this.frames=thescene.otherframes;

	//this.x=800;
	//this.y=500;
	//this.x=Math.floor(this.x/64)*64;
	//this.y=Math.floor(this.y/64)*64;
	
	this.x=ix*64;
	this.y=iy*64;
}


Princess.prototype.draw = function() {
	this.frames.drawFrame(4,0,this.x,this.y);
}

Princess.prototype.checkCollision = function(s) {
    var delta_x=Math.abs(s.x-this.x);
    var delta_y=Math.abs(s.y-this.y);
    if (delta_x<64 && delta_y<64) return true;
    return false;
}






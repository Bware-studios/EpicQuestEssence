

function Scoreboard() {
    this.div1=id('marcadorleft');
    this.div2=id('marcadorright');
    this.reset();
}

Scoreboard.prototype.lifeDecrease = function(x) {
	this.life-=x;
	if (this.life<0) this.life=0;
	this.div1.innerHTML=this.life;
	return this.life;
}

Scoreboard.prototype.reset = function() {
    this.life=100;
    this.level=0;
    if (thescene!=null) this.level=thescene.level;
    this.div1.innerHTML=this.life;
    this.div2.innerHTML='Level '+this.level;
}


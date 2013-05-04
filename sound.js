
var sound_hurt=0;
var sound_object=1;
var sound_walk=2;
var sound_fondo=3;


function Sound(name) {
	this.snd=document.createElement('audio');
	this.snd.preload='auto';
	this.snd.src=name;
}

Sound.prototype.play = function() {
	this.snd.play();
}


function SoundBox() {
	this.sounds=new Array();
	this.sounds[sound_hurt]=new Sound('hurt.wav');
	this.sounds[sound_object]=new Sound('object.wav');
	this.sounds[sound_walk]=new Sound('walk.wav');
	this.sounds[sound_fondo]=new Sound('fondo.wav');
}


SoundBox.prototype.play = function(s) {
	this.sounds[s].play();
}




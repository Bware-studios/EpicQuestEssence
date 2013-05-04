var w=960;
var h=640;

var thegame;
var consolediv;
var toglogbutton;
var consolevisible=false;

var thescene=null;

var loadingbar=0;
var loadingbarmax=2;

function init_game() {
    var img1=new Image();
    var img2=new Image();
    img1.src="Fondos.png";
    img1.onload=resource_loaded;
    img2.src="personajes.png";
    img2.onload=resource_loaded;
    setTimeout("init_load();",100);
    
    
    
}

function resource_loaded() {
    init_load();
}

function init_load() {
    loadingbar+=1;
    var ctx=id('mcanvas').getContext('2d');
    ctx.fillStyle='#aaffaa';
    ctx.fillRect(0,0,w*loadingbar/loadingbarmax,h);
    if (loadingbar=loadingbarmax) {
        init_after_load();
    }
}

function init_after_load() {
	thegame = new Game();
}

function id(theid) {
	return document.getElementById(theid);
}

function log(message) {
	consolediv.innerHTML+=("<br>"+message);
}

function show_log() {
	consolediv.style.visibility='visible';
	if (toglogbutton!=null) toglogbutton.onclick=hide_log;
	consolevisible=true;
	return false;
}

function hide_log() {
	consolediv.style.visibility='hidden';
	if (toglogbutton!=null) toglogbutton.onclick=show_log;
	consolevisible=false;
	return false;
}

function toggle_log() {
    if (consolevisible) hide_log();
    else show_log();
}

function Game() {
	consolediv=id('consolediv');
	toglogbutton=id('toglogbutton');
	if (toglogbutton!=null) toglogbutton.onclick=show_log;
	log('Game object created');

    var mcanvas=id('mcanvas');
	this.ctx=mcanvas.getContext('2d');

    document.onkeydown=keydown;
    document.onkeyup=keyup;
	
	thescene = new Scene(this.ctx);
	thescene.start_game();

}


// flechas
var left_key=37;
var right_key=39;
var up_key=38;
var down_key=40;
// wasd
var left_key=65;
var right_key=68;
var up_key=83;
var down_key=87;

// esc
var enter_key=13;
var esc_key=27;

var left_is_pressed=false;
var right_is_pressed=false;
var up_is_pressed=false;
var down_is_pressed=false;

function keydown(e) {
    //log('down: '+e.keyCode);
    if (e.keyCode==left_key)    left_is_pressed=true;
    if (e.keyCode==right_key)   right_is_pressed=true;
    if (e.keyCode==up_key)      up_is_pressed=true;
    if (e.keyCode==down_key)    down_is_pressed=true;
}

function keyup(e) {
    //log('up: '+e.keyCode);
    if (e.keyCode==left_key)    left_is_pressed=false;
    if (e.keyCode==right_key)   right_is_pressed=false;
    if (e.keyCode==up_key)      up_is_pressed=false;
    if (e.keyCode==down_key)    down_is_pressed=false;
    if (e.keyCode==esc_key) toggle_log();
    if (e.keyCode==enter_key) {if (thescene!=null) thescene.dialog_enter()};

}

function react_to_control () {
    var mov_x=0;
    var mov_y=0;

    if (left_is_pressed) {
        mov_x-=1;
    }
    if (right_is_pressed) {
        mov_x+=1;
    }
    if (up_is_pressed) {
        mov_y+=1;
    }
    if (down_is_pressed) {
        mov_y-=1;
    }
    thescene.player.move(mov_x,mov_y);
}



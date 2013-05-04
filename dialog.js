

function Dialog(divname) {
    this.div=id(divname);
}

Dialog.prototype.show = function() {
    this.div.style.visibility='visible';
}

Dialog.prototype.hide = function() {
    this.div.style.visibility='hidden';
}




Dialog.prototype.message_start = function() {
	var text='';
    text+='<div style="position: relative;"><img style="float: left; margin-right: 30px; margin-top: 30px;" src="Inicial.png">';
	text+='Brave warrior<br>';
	text+='avoid the evil<br>';
	text+='and save the princess<br>';
	text+='in this (minimalist) epic quest<br>';
	text+='<br>move keys: w a s d <br>';
	text+='ESC - about <br>';
	text+='<div class="centered">[<a id="d1enter" href="javascript:thescene.dialog_enter()" >play</a>]</div>';
	text+='</div>';
    this.div.innerHTML=text;
    this.show();
	thescene.pause();
}

Dialog.prototype.message_restart = function() {
	var text='';
	text+='<div style="position: relative;"><img style="float: left; margin-right: 30px;" src="Inicial.png">';
	text+='Brave warrior<br>';
	text+='dark forces again...<br>';
	text+='you know...<br>';
	text+='<br>remember keys: w a s d <br>';
	text+='ESC - about <br>';
	text+='<div class="centered">[<a href="javascript:thescene.dialog_enter()" >play</a>]</div>';
	text+='</div>';
    this.div.innerHTML=text;
    this.show();
	thescene.pause();
}


Dialog.prototype.message_dead = function() {
	var text='';
	text+='You are dead... <br>';
	text+='It seems...<br>';
	text+='<br>But you reached level '+thescene.level+'<br>';
	text+='Your feat will be remembered<br>';
	text+='... well... maybe if someone would just had time to programm a hall of fame... <br>';
	text+='<div class="centered">[<a href="javascript:thescene.dialog_enter()" >enter</a>]</div>';
    this.div.innerHTML=text;
    this.show();
}


Dialog.prototype.message_success = function() {
	var text='';
	text+='<div style="position: relative;"><img style="float: left; margin-right: 30px;" src="Final.png">';
	text+='You saved the Princess<br>';
	text+='You are a real hero... <br>';
	text+='<div class="centered">[<a href="javascript:thescene.dialog_enter()" >continue</a>]</div>';
    this.div.innerHTML=text;
    this.show();
	thescene.pause();
}


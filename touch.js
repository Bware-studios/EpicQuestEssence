

var mouse_target_x=0;
var mouse_target_y=0;
var mouse_is_down=false;
var mouse_is_out=true;

function init_touch() {
	var c=id('mdiv');
	var sl=id('marcadorleft');
	var sr=id('marcadorright');
    c.onmousedown=mousedown;
    c.onmouseup=mouseup;
    c.onmousemove=mousemove;
    c.onmouseout=mouseout;
    c.onmouseover=mouseover;

    c.ontouchstart=mousedown;
    c.ontouchend=mouseup;
    c.ontouchmove=mousemove;

    //sl.onmousedown=ignore_event;
    //sl.onmouseup=ignore_event;
    //sl.onmousemove=ignore_event;
    //sl.onmouseout=ignore_event;
    //sl.onmouseover=ignore_event;
    //sl.ontouchstart=ignore_event;
    //sl.ontouchend=ignore_event;
    //sl.ontouchmove=ignore_event;

    //sr.onmousedown=ignore_event;
    //sr.onmouseup=ignore_event;
    //sr.onmousemove=ignore_event;
    //sr.onmouseout=ignore_event;
    //sr.onmouseover=ignore_event;
    //sr.ontouchstart=ignore_event;
    //sr.ontouchend=ignore_event;
    //sr.ontouchmove=ignore_event;


}




function mousedown(e) {
	log('down');
	mouse_is_down=true;
	mouse_target_x=e.layerX;
	mouse_target_y=e.layerY;
    return true;
}

function mouseup(e) {
	log('up');
	mouse_is_down=false;
    return true;
}

function mousemove(e) {
	if (mouse_is_down) {
		log('move down');
		mouse_target_x=e.layerX;
		mouse_target_y=e.layerY;	
	} else {
		log('move up');
	}
    return true;
}

function mouseout(e) {
	log('out');
	mouse_is_out=true;
    return true;
}

function mouseover(e) {
	log('over');
	mouse_is_out=false;
	//mouse_is_down=false;
    return true;
}


//function ignore_event(e) {
//	log('m');
//	return true;
//}

var map_vacio=0;
var map_tree_tl=1;
var map_tree_tr=2;
var map_tree_bl=3;
var map_tree_br=4;
var map_hill_tl=5;
var map_hill_tr=6;
var map_hill_bl=7;
var map_hill_br=8;

var map_tree=1;
var map_hill=2;


var levels=Array();
levels[1]={ "nmalos":4,  "princess":{"x":10,"y":6},
            "map": [ 
                {"o":map_tree, "x":6, "y":4 } , 
                {"o":map_tree, "x":10, "y":4 } , 
                {"o":map_tree, "x":8, "y":2 } , 
                {"o":map_tree, "x":8, "y":6 } , 
                {"o":map_hill, "x":8, "y":4 } 
            ]};
levels[2]={ "nmalos":4,  "princess":{"x":11,"y":8},
            "map": [ 
                {"o":map_hill, "x":5, "y":0 } , 
                {"o":map_hill, "x":4, "y":2 } , 
                {"o":map_tree, "x":5, "y":4 } ,
                {"o":map_hill, "x":9, "y":8 } , 
                {"o":map_hill, "x":10, "y":6 } , 
                {"o":map_tree, "x":10, "y":4 }
            ]};
levels[3]={ "nmalos":4,  "princess":{"x":12,"y":9},
            "map": [ 
                {"o":map_tree, "x":2, "y":6 } , 
                {"o":map_hill, "x":8, "y":3 } ,
                {"o":map_tree, "x":3, "y":1 } , 
                {"o":map_tree, "x":5, "y":5 } , 
                {"o":map_tree, "x":12, "y":3 } , 
                {"o":map_tree, "x":7, "y":8 } , 
                {"o":map_tree, "x":10, "y":7 }
            ]};



function get_map(level, scene) {
    var m1= new Map(w,h);
    if (level==-1) { // -1 = random
        var i,x,y,o;
	    var player_ix=Math.floor(player_initial_pos_x/64),player_iy=Math.floor(player_initial_pos_y/64);
        for (i=0;i<10;i++) {
            x=Math.floor(Math.random()*(w/64-1));
            y=Math.floor(Math.random()*(h/64-1)); 
            o=Math.floor(1+Math.random()*2);
            
		    if (m1.freeat(x,y,2,2) && x!=player_ix && x!=player_ix-1 && y!=player_iy && y!=player_iy-1){
			    m1.putObject(x,y,o);
   		    }
            log('objeto '+o+' en ('+x+','+y+')');
        }
        scene.princess =  new Princess(12,9);
        scene.nmalos=10;
    } else {
        var levelinfo=levels[1+(level-1)%3];
        
        scene.princess =  new Princess(levelinfo.princess.x,levelinfo.princess.y);
        var i;
        for (i=0; i<levelinfo.map.length ; i++) {
            m1.putObject(levelinfo.map[i].x,levelinfo.map[i].y,levelinfo.map[i].o);    
        }
        scene.nmalos=levelinfo.nmalos+Math.floor((level-1)/3)*2;
        log('level '+level+' map created');
    }
    
    scene.map=m1;
    scene.player = new Sprite(scene.frames,player_initial_pos_x,player_initial_pos_y,sprite_tipo_heroe);
}




function Map(w,h) {
    this.w=w;
    this.h=h;
    this.a=new Array();
    var x, y;
    for (y=0;y<h;y++) {
        this.a[y]=new Array();
        for (x=0;x<w;x++) {
            this.a[y][x]=0;
        }
    }
}

Map.prototype.putObject = function(ox,oy,o) {
    this.put(ox,oy,map_tree_tl+(o-1)*4);
    this.put(ox+1,oy,map_tree_tr+(o-1)*4);
    this.put(ox,oy+1,map_tree_bl+(o-1)*4);
    this.put(ox+1,oy+1,map_tree_br+(o-1)*4);
}


Map.prototype.at = function(x,y) {
	if (x<0) return 0;
	if (x>=w) return 0;
	if (y<0) return 0;
	if (y>=h) return 0;
	return this.a[y][x];
}

Map.prototype.freeat = function(x,y,dx,dy) {
	var free=true;
	var i,j;
	for (i=0;i<dx;i++) {
		for (j=0;j<dy;j++) {
			if (this.at(x+i,y+j)!=0) {
				free=false;
			}
		}
	}
	return free;
}

Map.prototype.put = function(x,y,value) {
    this.a[y][x]=value;
}

Map.prototype.free64block = function(x,y) {
	var ix,iy, alfax,alfay, dx=2,dy=2;
	ix=Math.floor(x/64);
	iy=Math.floor(y/64);
	alfax=x/64-ix;
	alfay=y/64-iy;
	if (alfax==0) dx=1 
	if (alfay==0) dy=1
	return this.freeat(ix,iy,dx,dy);
}



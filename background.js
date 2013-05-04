
function Background(ctx,map) {
    this.ctx=ctx;

    this.buf=document.createElement('canvas');
    this.buf.width=w;
    this.buf.height=h;
    
    this.renderbuf(map);
}


Background.prototype.renderbuf = function(map) {
    this.tileimg=document.createElement('img');
    this.tileimg.src='fondo_papel.png';
    var bufctx=this.buf.getContext('2d');
    bufctx.fillStyle='#ffffff';
    bufctx.fillRect(0,0,w,h);
	this.fondoframes= new GFrames(bufctx,'Fondos.png',64,64);
    var i,j,o;
    for (j=0 ; j<map.h ; j++) {
        for (i=0; i<map.w ; i++) {
            o=map.at(i,j);
        	//bufctx.fillStyle='#aaffaa';
            //if (o!=map_vacio) bufctx.fillRect(i*64,j*64,64,64);
            switch (o) {
            	case map_vacio:
            	    //bufctx.drawImage(this.tileimg,i*64,j*64);
            		break;
            	case map_tree_tl:
	                this.fondoframes.drawFrame(2,0,i*64,j*64);            
	                break;
            	case map_tree_tr:
	                this.fondoframes.drawFrame(3,0,i*64,j*64);            
	                break;
            	case map_tree_bl:
	                this.fondoframes.drawFrame(2,1,i*64,j*64);            
	                break;
            	case map_tree_br:
	                this.fondoframes.drawFrame(3,1,i*64,j*64);            
	                break;
            	case map_hill_tl:
	                this.fondoframes.drawFrame(0,0,i*64,j*64);
	                break;
            	case map_hill_tr:
	                this.fondoframes.drawFrame(1,0,i*64,j*64);            
	                break;
            	case map_hill_bl:
	                this.fondoframes.drawFrame(0,1,i*64,j*64);            
	                break;
            	case map_hill_br:
	                this.fondoframes.drawFrame(1,1,i*64,j*64);            
	                break;
            }
        }
    }
}


Background.prototype.draw = function() {
    this.ctx.drawImage(this.buf,0,0);
}





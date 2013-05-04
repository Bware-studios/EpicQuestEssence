
function GFrames(ctx,imgname,fw,fh) {
    this.ctx=ctx;
    this.im=document.createElement('img');
    this.im.src=imgname;
    this.fw=fw;
    this.fh=fh;
    //log('image');
    //log('w:'+this.im.width);
    //log('h:'+this.im.height);
}

GFrames.prototype.drawFrame = function(ix,iy,x,y) {
    this.ctx.drawImage(this.im,ix*this.fw,iy*this.fh,this.fw,this.fh,x,y,this.fw,this.fh);
}

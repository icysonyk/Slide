// Js滑动翻页覆盖效果
// By Ivan
// 2014-11-14
// 使用了jquery-1.10.2和百度云的touch.js插件

$(document).ready(function(){					 				   
			
	//初始化div大小
	var h = $(window).height();
	var w = $(window).width();
	$('.swiper-slide').css('height',h+'px');
	$('.swiper-slide').css('width',w+'px');	
	//当前图片索引
	var nowdiv =0;
	//下一张需切换的图片索引
	var nextdiv;
	//新建滑动div数组
	var slidediv = new Array();
	//滑动div数量
	var divcount = 0;
	//初始化每个滑动div大小，并计算数量
	$(".swiper-slide").each(function(){
		slidediv.push($(this));	
		divcount++;
		$(this).css('display','none');
		$(this).find('img').css('width',w+'px');	
		$(this).find('img').css('height',h+'px');	
	});
	divcount = divcount - 1;
	//显示第一张div
	slidediv[0].css('z-index','1');
	slidediv[0].css('display','block');
	var dragging = false;
	var iX, iY;
	var oX, oY; 
	var oldX=0,oldY=0;
	var show_end = true;
	var hide_end = true;
	
	//触摸开始
	touch.on('body', 'touchstart', function(e){
		e.preventDefault();
		oY=0;
		dragging = true;
		//获取触摸时的坐标
		iX = e.pageX- this.offsetLeft;
		iY = e.pageY - this.offsetTop;		
		return false;
	});
	
	//触摸移动
	touch.on('body', 'touchmove', function(e){
		if (dragging)
		{
			//如果动画未结束不能移动
			if(!show_end || !hide_end)
			{
				return false;
			}
			
			//获取移动的距离
			oX = e.pageX - iX;
			oY = e.pageY - iY;	
			
			//向上拉动
			
			if(oY < 0 )
			{
				slidediv[nowdiv].css('z-index','0');
				nextdiv = nowdiv+1;
				if(nowdiv == divcount)
				{
					return false;
				}
				slidediv[nowdiv].find('img').css('top','0px');
				slidediv[nowdiv].find('img').css('bottom','');
				//显示下一张div
				slidediv[nextdiv].find('img').css('width',w+'px');	
				slidediv[nextdiv].find('img').css('height',h+'px');	
				slidediv[nextdiv].find('img').css('left','0px');
				
				slidediv[nextdiv].css({"top":h+"px"});
				slidediv[nextdiv].css('z-index','1');	
				slidediv[nextdiv].css('display','block');
				
				//根据拉动的距离移动下一张图的div
				if( h >= -oY){
					slidediv[nextdiv].css({"top":h + oY + "px"});
				}
				else
				{
					slidediv[nextdiv].css({"top":"0px"});	
				}
				var divw = parseInt(slidediv[nowdiv].find('img').css('width').replace('px',''));
				var divh = parseInt(slidediv[nowdiv].find('img').css('height').replace('px',''));
				
				//根据移动的距离缩放图片
				if(oY < oldY)
				{
					if(divw > w*0.8)
					{
						slidediv[nowdiv].find('img').css('width',divw-2);	
						slidediv[nowdiv].find('img').css('left',(w-divw)/2+'px');
					}
					if(divh > h*0.8)
						slidediv[nowdiv].find('img').css('height',divh-2);	
				}
				else
				{
					if(divw < w)
					{
						slidediv[nowdiv].find('img').css('width',divw+2);	
						slidediv[nowdiv].find('img').css('left',(w-divw)/2+'px');
					}
					if(divh < h)
					{
						slidediv[nowdiv].find('img').css('height',divh+2);
					}
				}
				oldY = oY;
				return true;
			}
			//向下移动
			if(oY > 0 )
			{
				slidediv[nowdiv].css('z-index','0');
				nextdiv = nowdiv-1;
				if(nowdiv == 0)
				{
					return false;
				}
				slidediv[nowdiv].find('img').css('bottom','0px');
				slidediv[nowdiv].find('img').css('top','');
				slidediv[nextdiv].find('img').css('width',w+'px');	
				slidediv[nextdiv].find('img').css('height',h+'px');
				slidediv[nextdiv].find('img').css('left','0px');
				
				slidediv[nextdiv].css({"top":-h+"px"});
				slidediv[nextdiv].css('z-index','1');	
				slidediv[nextdiv].css('display','block');
				
				if( h >= oY){
					slidediv[nextdiv].css({"top":-h + oY + "px"});
				}
				else
				{
					slidediv[nextdiv].css({"top":"0px"});	
				}
				var divw = parseInt(slidediv[nowdiv].find('img').css('width').replace('px',''));
				var divh = parseInt(slidediv[nowdiv].find('img').css('height').replace('px',''));

				if(oY > oldY)
				{
					if(divw > w*0.8)
					{
						slidediv[nowdiv].find('img').css('width',divw-2);	
						slidediv[nowdiv].find('img').css('left',(w-divw)/2+'px');
					}
					if(divh > h*0.8)
						slidediv[nowdiv].find('img').css('height',divh-2);	
				}
				else
				{
					if(divw < w)
					{
						slidediv[nowdiv].find('img').css('width',divw+2);	
						slidediv[nowdiv].find('img').css('left',(w-divw)/2+'px');
					}
					if(divh < h)
					{
						slidediv[nowdiv].find('img').css('height',divh+2);
					}
					
				}
				oldY = oY;
				return true;
			}
		}
	});
	
	//触摸结束时触发
	touch.on('body', 'touchend', function(e){
		dragging = false;
		//动画未结束跳出
		if(!show_end || !hide_end)
		{
			return;
		}
		//向上移动
		if(oY < 0 )
		{
			if(nowdiv == divcount)
			{
				return;
			}
			show_end = false;
			hide_end = false;
			
			//移动超过20%判定滑动成功，否则归位
			if(Math.abs(oY) > h * 0.2)
			{
				slidediv[nextdiv].css('display','block');
				slidediv[nextdiv].animate({
					top:0
				},function(){
					show_end = true;
				});			
				slidediv[nowdiv].find('img').animate({
					height:h*0.8,
					width:w*0.8,
					left:(w*0.2)/2+'px'
				},function(){
					//动画结束后复位并隐藏当前图片层
					slidediv[nowdiv].find('img').css('width',w+'px');	
					slidediv[nowdiv].find('img').css('height',h+'px');
					slidediv[nowdiv].find('img').css('left','0px');
					slidediv[nowdiv].css('display','none');
					if(nowdiv < divcount)
					{
						nowdiv++;	
					}
					hide_end = true;
					});
			}
			else
			{
				slidediv[nextdiv].animate({
					top:h
				},function(){hide_end = true;});	
				slidediv[nowdiv].find('img').animate({
					height:h,
					width:w,
					left:'0px'
				},function(){show_end = true;});
			}
			return;
		}
		//向下移动
		if(oY > 0 )
		{
			if(nowdiv == 0)
			{
				return;
			}	
			show_end = false;
			hide_end = false;
			if(Math.abs(oY) > h * 0.2)
			{	
				slidediv[nextdiv].css('display','block');
				slidediv[nextdiv].animate({
					top:0
				},function(){
					show_end = true;
				});			
				slidediv[nowdiv].find('img').animate({
					height:h*0.8,
					width:w*0.8,
					left:(w*0.2)/2+'px'
				},function(){
					slidediv[nowdiv].find('img').css('width',w+'px');	
					slidediv[nowdiv].find('img').css('height',h+'px');
					slidediv[nowdiv].find('img').css('left','0px');
					slidediv[nowdiv].css('display','none');
					if(nowdiv > 0)
					{
						nowdiv--;	
					}
					hide_end = true;
					});
			}
			else
			{
				slidediv[nextdiv].animate({
					top:-h
				},function(){hide_end = true;});
				slidediv[nowdiv].find('img').animate({
					height:h,
					width:w,
					left:'0px'
				},function(){show_end = true;});
			}
			return;
		}
	})
});
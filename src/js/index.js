//首页的业务逻辑
require(["./requirejs.config"], () => {
	//引入index需要依赖的模块
	require(["jquery", "item1" ,"url", "header", "footer"], ($,item,url) => {	
		item.init(url.baseUrlRap+"/index-series-list",1);
		item.init(url.baseUrlRap+"/index-service-list",2);	
		$(function(){	
			let $imgs=$(".banner ul li"),
				$btns=$(".banner ol li"),
				len=$imgs.length,
				index=0,
				timer=null;
			
			//点击按钮
			$btns.on("mouseover",function(){		
				$(this).addClass("bc");
				$(this).siblings().removeClass("bc");		
				$imgs.eq(index).removeClass("bc").animate({opacity:0},1000);				
				index=$(this).index();				
				$imgs.eq(index).addClass("bc").animate({opacity:1},1000);
			})	
			
			$("#goPrev").on("click",function(){
				$btns.eq(index).removeClass("bc");						
				$imgs.eq(index).removeClass("bc").animate({opacity:0},1000);
				
				index = --index<0 ?index=len-1:index;

				$btns.eq(index).addClass("bc");
				$imgs.eq(index).addClass("bc").animate({opacity:1},1000);
			})
			
			//下一张
			$("#goNext").on("click",function(){
				$btns.eq(index).removeClass("bc");						
				$imgs.eq(index).removeClass("bc").animate({opacity:0},1000);
				
				index = ++index>=len ?index=0:index;

				$btns.eq(index).addClass("bc");
				$imgs.eq(index).addClass("bc").animate({opacity:1},1000);
			})
			
			$(".banner").hover(function(){
				clearInterval(timer);
			}, (function autoPlay(){
				timer = setInterval(() => {
					$("#goNext").trigger("click");
				},3000);
				return autoPlay;
			})())
		})
	})	
})

		
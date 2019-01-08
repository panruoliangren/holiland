define(["jquery"], () => {
	class Footer{
		constructor(){
			this.init();
		}
		init(){
			//加载header.html
			new Promise((resolve, reject) => {
				$("footer").load("/html/component/footer.html", () => {
					resolve();
				})
			}).then(() => {				
				this.help();
				this.wx();
			})
		}
		help(){
			var flag=0;
			$("#help").on("click", function(){
				if(!flag){
					$("#help i").css("background-position","27px -84px");
					$(".foot-menu").animate({height:"129px"});
					flag=1;
				}else{
					$("#help i").css("background-position","-0px -84px");
					$(".foot-menu").animate({height:0});
					flag=0;
				}				
			})
		}
		wx(){
			$("#wx").on("mouseover",function(){
				$(".wx dl").animate({height:"220px"}).css({"border": "1px solid #ccc"});
			})
			$("#wx").on("mouseout",function(){
				$(".wx dl").animate({height:"0px"},function(){
					$(".wx dl").css({"border": 0})
				});
			})
		}
	}
	return new Footer();
})
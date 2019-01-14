define(["jquery","cookie"], () => {
	class Header{
		constructor(){
			this.init();
		}
		init(){
			//加载header.html
			new Promise((resolve, reject) => {
				$("header").load("/html/component/header.html", () => {
					resolve();
				})
			}).then(() => {
				this.login();
				this.exit();
				this.check();
			})
		}	
		login(){
			let tel=$.cookie("tel")?JSON.parse($.cookie("tel")).name:"";
			
			if(tel){
				$("#header-login").html("hi,"+tel);
				$("#header-register").remove();
				$(".nav-top").prepend("<a href='javascript:;' id='exitBtn'>[退出]</a>");
			}
		}
		exit(){			
			$("#exitBtn").on("click",function(){
				$.cookie("tel", "", {expires: -1, path:"/"});	
				location.reload();
				console.log($.cookie)
			})
		}
		check(){
			if($.cookie("cart")) 
				var n=JSON.parse($.cookie("cart")).length;
				$("#h-num").html(n);
		}
	}
	return new Header();
})
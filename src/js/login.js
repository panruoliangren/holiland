require(["./requirejs.config"], () => {
	require(["jquery", "url", "cookie", "header", "footer"], ($,url) => {
		$(function(){

			$("#logBtn").on("click",function(e){
				
				e.preventDefault();
				$.ajax({
					type:"post",
					url:url.baseUrlPhp+"/api/v1/login.php",
					data:{
						tel:$("#tel").val(),
						pwd:$("#pwd").val()
					},
					success:function(res){
						if(res.res_code===1){	
							$.cookie("tel",JSON.stringify({name:$("#tel").val()}),{path:"/"});
							if(window.history.length>1){
					            window.history.back();
					        }else{
					            window.location.href="/"
					        }
						}
						alert(res.res_message);
					},
					dataType:"json"
				});
				return false;
			})
		})
	})
})
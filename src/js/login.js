require(["./requirejs.config"], () => {
	require(["jquery", "cookie", "header", "footer"], () => {
		$(function(){
			$("#logBtn").on("click",function(e){
				e.preventDefault();
				$.ajax({
					type:"post",
					url:"http://localhost/api/v1/login.php",
					data:{
						tel:$("#tel").val(),
						pwd:$("#pwd").val()
					},
					success:function(res){
						if(res.res_code===1){	
							$.cookie("tel",$("#tel").val(),{path:"/"});
							location.href="/";
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
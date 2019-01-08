require(["./requirejs.config"], () => {
	require(["jquery", "header", "footer"], () => {
		$(function(){	
			let span=$("dd span"),
				inp=$("dd input");		
			
			let	telReg=/^[1][3-8][0-9]{9}$/,
				emailReg=/\w+@[a-z0-9]+\.[a-z]+/i,
				pwdReg=/(?=.*[a-z])(?=.*\d)(?=.*[#@!~%^&*\.])[a-z\d#@!~%^&*\.]{6,20}/i;
			
			checkForm();
			
			function checkForm(){
				let flag=true;							
				
				for(let i=0;i<inp.length;i++){
					if(!inp.eq(i).val()){
						flag=false;
					}
					inp.eq(i).on("focus",function(){
						if(!inp.eq(i).val()){
							span.eq(i).css("display","block");							
						}
					})
				}		
		
				inp.eq(0).on("blur",function(){				
					if(!telReg.test(inp.eq(0).val())){						
						span.eq(0).css("display","block").html("手机号格式错误");
						flag=false;
					}else{
						span.eq(0).css("display","none");
					}
				})
								
				inp.eq(1).on("blur",function(){
					if(!emailReg.test(inp.eq(1).val())){						
						span.eq(1).css("display","block").html("邮箱格式错误");	
						flag=false;
					}else{
						span.eq(1).css("display","none");
					}
				})
				inp.eq(2).on("blur",function(){
					if(!pwdReg.test(inp.eq(2).val())){						
						span.eq(2).css("display","block").html("密码必须包含字母、数字、特殊字符");
						flag=false;
					}else{
						span.eq(2).css("display","none");
					}
				})
				
				inp.eq(3).on("blur",function(){
					if(inp.eq(2).val()!==inp.eq(3).val()){						
						span.eq(3).css("display","block").html("两次密码不一致");	
					}else{
						span.eq(3).css("display","none");
					}
				})
				return flag;
			}

			//直接提交
			$("#regBtn").on("click",function(e){
				let flag=checkForm();
				if(inp.eq(2).val()!==inp.eq(3).val()){						
					//span.eq(3).css("display","block").html("两次密码不一致");	
					flag=false;
				}else{
					if(!pwdReg.test(inp.eq(3).val())){						
						//span.eq(3).css("display","block").html("密码必须包含字母、数字、特殊字符");
						flag=false;
					}
				}					
				
				if(!$("#g").is(":checked")){					
					alert("请同意条款");
				}else{
					if(flag){
						$.ajax({
							type:"post",
							url:"http://localhost/api/v1/register.php",
							data:{
								tel:$("#tel").val(),
								email:$("#email").val(),
								pwd:$("#pwd").val()
							},
							success:function(res){
								if(res.res_code===1){
									location.href="/html/login.html";
								}
								alert(res.res_message);
							},
							dataType:"json"
						});
					}					
				}
				
				e.preventDefault();
				return false;
			})
		})
	})
})
require(["./requirejs.config"], () => {
	require(["jquery", "item", "url", "template","header", "footer"], ($,item,url,template) => {
		$(function(){	
			let arrSearch=location.search.slice(1).split("="); //获取id值
			let searchObj={},
				objIns,
				num=1,
				price,
				sum,
				objOut={},
				arr=[];
			searchObj[arrSearch[0]]=arrSearch[1];

			$.ajax({
				type:"get",
				url:url.baseUrlRap+"/detail",
				data:searchObj[arrSearch[0]],
				datatype:"json",
				success:function(res){					
					if(res.res_code===1){	
						let detail=res.res_body;		
						objIns={
							id:arrSearch[1],
							title:detail.title,
							etitle:detail.etitle,
							price:detail.price,
							simg:detail.simg,
							img:detail.img
						};							
					}
					Insert(objIns);
					doBox(objIns);						
				}				
			});	
			
			//插入数据
			function Insert(obj){
				$("#detail-img").attr("src",obj.img);
				$("#big-img").attr("src", obj.img);
				$(".detail-banner dt").append("<img src="+obj.simg+">");				
				$("#detail-title").html(obj.etitle);
				$(".detail-banner dd span").html(obj.title);
				$("#detail-price").html("￥"+obj.price);
			}
			
			//某一商品总价
			function detailPrice(num,price){	
				return num*price;					
			}
			
			function setCooki(obj){
				sum=detailPrice(num,price);
				//显示
				objOut={
					id:arrSearch[1],
					img:obj.img,
					title:obj.title,						
					price:price,
					num:$("#num").html()*1,
					sprice:sum
				};

				if($.cookie("cart")){
					arr=JSON.parse($.cookie("cart"));
				}else{
					arr=[];
				}
				
				let index;
				let isExit=arr.some(function(item,i){
					index=i;
					return item.id===objOut.id;
				});
				if(isExit){
					arr[index].num+=num;
					arr[index].price=price;
					arr[index].sprice=detailPrice(arr[index].num,price);
				}else{
					arr.push(objOut);
				}	
				
				$.cookie("cart",JSON.stringify(arr));
				console.log(arr)
			}
			
			function doBox(obj){		
				price=$("#detail-price").html().slice(1)*1 												
				
				//增加
				$("#addBtn").on("click",function(){
					num++;
					$("#num").html(num);	
						
					sum=detailPrice(num,price);	
					
					$("#detail-price").html("￥"+sum);	
				})	
				//删除
				$("#subBtn").on("click",function(){
					num--;
					num = num<=1 ? 1 : num;
					$("#num").html(num);
					
					sum=detailPrice(num,price);	
					
					$("#detail-price").html("￥"+sum);	
				})								
					
				//加入购物车
				$("#cartBtn").on("click",function(){												
					setCooki(obj);
				})
				
				$("#buynowBtn").on("click",function(){
					setCooki(obj);
				})
			}
		
		})
	})
})
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
							img1:detail.img1,
							img2:detail.img2,
							img3:detail.img3
						};							
					}
					Insert(objIns);
					doBox(objIns);	
					doBanner();
				}				
			});	
			
			//插入数据
			function Insert(obj){
				$("#detail-img1").attr("src",obj.img1);
				$("#detail-img2").attr("src",obj.img2);
				$("#detail-img3").attr("src",obj.img3);
//				$("#big-img").attr("src", obj.img);
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
					img:obj.img1,
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
					alert("加入成功");
					location.reload();
				})
				
				$("#buynowBtn").on("click",function(){
					setCooki(obj);
				})
			}
			function doBanner(){
				console.log(1)
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
			}
		
		})
	})
})
require(["./requirejs.config"], () => {
	require(["jquery", "item", "url", "template","header", "footer"], ($,item,url,template) => {
		item.init(url.baseUrlRap+"/more-list");
		$(function(){	
			let str='',
				arr,
				num,
				price,
				n=0;
				
			if($.cookie("cart")){
				arr=JSON.parse($.cookie("cart"));
				$(".cart").css("display","block");
				$(".nobuy").css("display","none");
				
			}else{
				arr=[];
				$(".cart").css("display","none");
				$(".nobuy").css("display","block");
			}
			
			for(var value of arr){
				str+='<tr>'+	
		        	'<td><input type="checkbox" class="checkA"/></td>'+
		            '<td>'+
		            	'<img src="'+value.img+'"/>'+
		            	'<a href="/html/detail.html?id='+value.id+'" class="link blue">'+
		            	'<span>'+value.title+'</span></a>'+
		            '</td>'+
		            '<td><span class="grade">'+value.sprice+'积分</span></td>'+
		          	'<td><span class="price">￥'+value.price+'</span></td>'+
		          	'<td>'+
		          		'<a href="javascript:;" class="subBtn">-</a>'+
						'<a href="javascript:;" class="num">'+value.num+'</a>'+
						'<a href="javascript:;" class="addBtn">+</a>'+
		          	'</td>'+
		          	'<td><span class="sprice">￥'+value.sprice+'</span></td>'+
		            '<td><a href="javascript:;" class="delBtn blue">删除</a></td>'+
		        '</tr>';	
			}	
			$("tbody").html(str);
			
			//单个商品总价
			function detailPrice(num,price){	
				return num*price;					
			}
					
			
			$(".cart-box").on("click",function(e){
				var e=e||window.event,
					target=e.target||e.srcElement,
					sum,
					numDom,priceDom,gradeDom,spriceDom,cA,
					cAnum;
					
					//获取元素
					numDom=$(target).parents('tr').find('.num');
					priceDom=$(target).parents('tr').find('.price');
					gradeDom=$(target).parents('tr').find('.grade');
					spriceDom=$(target).parents('tr').find('.sprice');
					cA=$(target).parents('tr').find('.checkA');									
					cAnum=$("tbody .checkA");
					
					num=numDom.html();			
					if(priceDom.html()) price=priceDom.html().slice(1);
										
				//增加
				if(target.className=="addBtn"){	
					num++;					
					numDom.html(num);						
					sum=detailPrice(num,price);	
					gradeDom.html(sum+"积分");
					spriceDom.html("￥"+sum);
				}	
				//减少
				if(target.className=="subBtn"){	
					num--;
					num = num<=1 ? 1 : num;					
					numDom.html(num);						
					sum=detailPrice(num,price);		
					gradeDom.html(sum+"积分");
					spriceDom.html("￥"+sum);
				}	
				//删除
				if($(target).hasClass('delBtn')){
					if(confirm("确定删除吗?")){
						if(cA.prop('checked')) n--;					
						$(target).parents('tr').remove();
						cAnum=$("tbody .checkA");
					}					
				}								
				//单选
				if(target.className=="checkA"){
					var trNum=$("tbody tr").length;					
					target.checked?n++:n--;															
				}	
				
				//全选
				if(target.id=="checkAll"){					
					for(var i=0;i<cAnum.length;i++){
						cAnum[i].checked=true;
					}
					n=cAnum.length;
				}
				//删除选中
				if(target.id=="checkChoose"){	
					var a1=[];
					if(confirm("确定删除吗?")){
						for(var i=0;i<cAnum.length;i++){
							if(cAnum[i].checked){	
								a1.push($("tbody tr").eq(i).get(0));								
							}
						}
						for(var i=0;i<a1.length;i++){														
							$(a1[i]).remove();
							n--;
						}
					}
					cAnum=$("tbody .checkA");
				}
				regain();
				
			})
			//委托分割线
			function regain(){
				let allSum=0;
				let newArr=[];
				let trNum=$("tbody tr");
				let id;
				

				for(var i=0;i<trNum.length;i++){
					if($(trNum[i]).find(".checkA").prop('checked')){
						allSum+=$(trNum[i]).find('.sprice').html().slice(1)*1;
					}
					
					
					id=$(trNum[i]).find(".link").get(0).href.slice(1).split("=");

					
					let obj={
						id:id[1],
						img:$(trNum[i]).find("img").get(0).src,
						title:$(trNum[i]).find("span").html(),						
						price:$(trNum[i]).find(".price").html().slice(1)*1,
						num:$(trNum[i]).find(".num").html()*1,
						sprice:$(trNum[i]).find(".sprice").html().slice(1)*1
					};
					newArr.push(obj);					
				}
				$("#money").html(allSum);
				$.cookie("cart",JSON.stringify(newArr));
				//console.log(newArr)
			}
			$(".next").on("click",function(){
				if(!$.cookie("tel")){
					location.href="/html/login.html";
				}
			})
		})
	})
})
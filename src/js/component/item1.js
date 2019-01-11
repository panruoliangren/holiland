define(["jquery","template"], ($,template) => {
	function Item(){
		
	}
	Item.prototype.init=function(url,index){
		new Promise((resolve,reject)=>{		
			if(index===1){
				$("#index-series-list").load("/html/component/item1.html",()=>{
					resolve();
				});
			}else if(index===2){
				$("#index-service-list").load("/html/component/item1.html",()=>{
					resolve();
				});
			}
			
		}).then(()=>{
			$.ajax({
				url:url,
				type:"get",
				success:function(res){		
					if(res.res_code===1){	
						let list=res.res_body.data;
						let html=template("index-template",{list:res.res_body.data});	
						if(index===1){
							$("#index-series-list").html(html);
						}else if(index===2){
							$("#index-service-list").html(html);
						}
						
					}
				}
			})
		})
		
	}
	return new Item();
})
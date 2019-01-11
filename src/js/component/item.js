define(["jquery","template"], ($,template) => {
	function Item(){
		
	}
	Item.prototype.init=function(url){			
		new Promise((resolve,reject)=>{			
			$("#all-item").load("/html/component/item.html",()=>{
				resolve();
			});
		}).then(()=>{
			$.ajax({
				url:url,
				type:"get",
				success:function(res){		
					if(res.res_code===1){	
						let list=res.res_body.data;
						let html=template("all-template",{list:res.res_body.data});	
						$("#all-item").html(html);
					}
				}
			})
		})
		
	}
	return new Item();
})
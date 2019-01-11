require(["./requirejs.config"], () => {
	require(["jquery","item", "url", "header", "footer"], ($, item, url) => {					
		let arrSearch=location.search.slice(1).split("="); //获取id值		
		
		if(arrSearch[1]==1){
			item.init(url.baseUrlRap+"/all-list");
		}else{
			item.init(url.baseUrlRap+"/random-list");
		}			
	})
})
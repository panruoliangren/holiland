require(["./requirejs.config"], () => {
	require(["jquery", "url","header", "footer"], ($,url) => {
		$(function(){	
			let arrSearch=location.search.slice(1).split("="); //获取id值
			let searchObj={}			
			searchObj[arrSearch[0]]=arrSearch[1];
			
			$.ajax({
				type:"GET",
				url:url.baseUrlRap+"/detail",
				data:searchObj,
				datatype:"json"
			});
		})
	})
})
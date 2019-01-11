require(["./requirejs.config"], () => {
	require(["jquery", "item", "url", "template","header", "footer"], ($,item,url,template) => {
		item.init(url.baseUrlRap+"/more-list");
	})
})
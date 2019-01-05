define(["jquery"], () => {
	class Footer{
		constructor(){
			this.init();
		}
		init(){
			//加载header.html
			new Promise((resolve, reject) => {
				$("footer").load("/html/component/footer.html", () => {
					resolve();
				})
			}).then(() => {
				this.nav();
			})
		}
		nav(){
			$("nav").on("click", "li", function(){
				alert($(this).html());
			})
		}
	}
	return new Footer();
})
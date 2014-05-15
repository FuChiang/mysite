
//define originl jquery globle variable from $ to $jq
var $jq = $.noConflict();

//dynamic observer window size
$jq(window ).resize(function() {
	$jq(".win-size").html('width:'+window.innerWidth+' height:'+window.innerHeight);
});



/************************************/
/*main page set*/
/************************************/
var mainPage = function(){

	var $jq_add = $jq(".add-button"),
		$jq_login = $jq(".login-button"),
		$jq_add_block = $jq(".main-add-in-block"),
		$jq_search = $jq(".search-button"),
		$jq_menu = $jq(".main-header-nav-block");

	//login set
	$jq_login.SliderBlock({
		_block: "main-sign-in-block",
		_direct: "right"
	});

	//register set
	$jq_add.SliderBlock({
		_block: "main-add-in-block",
		_direct: "left"

	});

	//search set
	$jq_search.SliderBlock({
		_block: "search-block",
		_direct: "top"

	});

	//block close and open controller
	$jq(".main-member").click(function(){
		($jq_add_block.is(":visible"))
			?$jq_add.click():$jq_login.click();
	});

	$jq(".search-close").click(function(){
		$jq_search.click();
	});

	//add-check-bar
	$jq('.ui.checkbox').checkbox();

	//aside menu
	$jq(".main-menu").on("click", function(){
		($jq_menu.css("left").replace("px", "") < 0)
			?
				$jq_menu.animate({left: '0em'}, 200)
			:
				$jq_menu.animate({left: '-11em'}, 200);
	});

}  

//aside silde bar
var sildeBar = {
	slideEffect: function(){
		var $jq_slidebar = $jq('.ui.sidebar');

		//aside manu set
		$jq_slidebar.sidebar('toggle');

		$jq(".site-Menu").on("click", function(){
			$jq_slidebar.sidebar('toggle');
		});
	}
}

/************************************/
/*home page set*/
/************************************/
var homePage = function(){
	//set slide
	sildeBar.slideEffect();
	
}

/************************************/
/*new page set*/
/************************************/
var newPage = function(){

	//set slide
	sildeBar.slideEffect();
}

/************************************/
/*categories page set*/
/************************************/
var categoriesPage = function(){

	//set slide
	sildeBar.slideEffect();
}

/************************************/
/*popular page set*/
/************************************/
var popularPage = function(){

	//set slide
	sildeBar.slideEffect();
}

/************************************/
/*dashboard page set*/
/************************************/
var dashboardPage = function(){
	//set slide
	sildeBar.slideEffect();
	
}






                       




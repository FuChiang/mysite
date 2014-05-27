
//define originl jquery globle variable from $ to $jq
var $jq = $.noConflict();

//dynamic observer window size
$jq(window).resize(function() {
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


/************************************/
/*home page set*/
/************************************/
var homePage = function(){
	//set slide
	reuseEvent.slideEffect();
	
}

/************************************/
/*new page set*/
/************************************/
var newPage = function(){

	//set slide
	reuseEvent.slideEffect();
}

/************************************/
/*categories page set*/
/************************************/
var categoriesPage = function(){

	//set slide
	reuseEvent.slideEffect();
}

/************************************/
/*popular page set*/
/************************************/
var popularPage = function(){

	//set slide
	reuseEvent.slideEffect();
}

/************************************/
/*dashboard page set*/
/************************************/
var dashboardPage = function(){

	//set mobile menu 
	reuseEvent.mobileMenuEffect();


}

/************************************/
/*dashboard message page set*/
/************************************/
var messagePage = function(){

	//set mobile menu 
	reuseEvent.mobileMenuEffect();

	
}

/************************************/
/*dashboard setProfilePage page set*/
/************************************/
var sharePage = function(){

	var $jq_shareSet = $jq(".shareDirectSet"),
		$jq_SetRight = $jq_shareSet.find(".right"),
		$jq_SetLeft = $jq_shareSet.find(".left"),
		$jq_step = $jq(".share-steps-block"),
		$jq_input = $jq("input[name='shareName']"),
		$jq_textarea = $jq("input[name='shareDirectSet']"),
		$jq_warp = $jq(".share-photo-warp"),
		$jq_w_size = [974, 548, 240],
		$jq_move_height = [41.8, 33.3, 21.3],
		$jq_moveSpace = 0,
		$jq_nowIndex = 0,
		$move_speed = 200,
		$jq_nowTag;


	//$jq_warp.css("top", "-125.4em");
	//$jq_warp.css("top", "-99.9em");
	//$jq_warp.css("top", "-63.9em");

	//set mobile menu 
	reuseEvent.mobileMenuEffect();

	$jq('.ui.dropdown').dropdown();

	//let mouse cursor stay on first input field
	$jq("input:first").focus();

	//when user resize his browser size then adject item top position to 0 that avoid occur move error 
	$jq(window).resize(function() {

		$jq_warp.animate({top: 0}, $move_speed);

		//remove all class just save fist li class
		$jq_step.find("li:first").addClass("nowStep").siblings().removeClass();
	});

	//push next step
	$jq_SetRight.on("click", function(){

		getMoveData();

		if($jq_input.val() !== ""){
			$jq_nowTag.next().addClass("nowStep");
			$jq_warp.animate({
				top: "-"+($jq_nowIndex+1)*$jq_moveSpace+"em"
			}, $move_speed);
		}	
	});

	//push prev step
	$jq_SetLeft.on("click", function(){

		getMoveData();

		$jq_nowTag.removeClass("nowStep");
		$jq_warp.animate({
			top: "-"+($jq_nowIndex-1)*$jq_moveSpace+"em"
		}, $move_speed);
	});

	//get now item and index number
	var getMoveData = function(){
		$jq_nowTag = $jq_step.find(".nowStep").last();
		$jq_nowIndex = $jq_nowTag.index();
		getDistance();
	}

	//get move distance
	var getDistance = function(){
		if(window.innerWidth >= $jq_w_size[0]){
			$jq_moveSpace = $jq_move_height[0];
		}
		else if(window.innerWidth >= $jq_w_size[1]){
			$jq_moveSpace = $jq_move_height[1];
		}
		else if(window.innerWidth >= $jq_w_size[2]){
			$jq_moveSpace = $jq_move_height[2];
		}
	}
	
}

/************************************/
/*dashboard myPhotoPage page set*/
/************************************/
var myPhotoPage = function(){

	//set mobile menu 
	reuseEvent.mobileMenuEffect();

	
}


/************************************/
/*reuse effect event*/
/************************************/
var reuseEvent = {
	//aside silde bar
	slideEffect: function(){
		var $jq_slidebar = $jq('.ui.sidebar');

		//aside manu set
		$jq_slidebar.sidebar('toggle');

		$jq(".site-Menu").on("click", function(){
			$jq_slidebar.sidebar('toggle');
		});
	},

	//dashboard mobile menu
	mobileMenuEffect: function(){
		var $jq_menu = $jq(".mobile-Menu");


		$jq(".menu-Set").on('click', function(){
			(!$jq_menu.is(":visible"))
				?
					$jq_menu.slideDown(200)
				:
					$jq_menu.slideUp(200);
		});
		
		$jq(window ).resize(function() {
			(window.innerWidth == 960)
				?
					$jq_menu.show()
				:
					$jq_menu.hide();
		});
	}
}





                       





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

	//set front end background
	reuseEvent.frontendColorEvent();
	
}

/************************************/
/*view photo page set*/
/************************************/
var viewPage = function(){

	//set slide
	reuseEvent.slideEffect();

	//set background image event
	reuseEvent.backCoverEvent();

	//set front end background
	reuseEvent.frontendColorEvent();

}	


/************************************/
/*categories page set*/
/************************************/
var categoriesPage = function(){

	//set slide
	reuseEvent.slideEffect();

	//set front end background
	reuseEvent.frontendColorEvent();
}


/************************************/
/*dashboard page set*/
/************************************/
var dashboardPage = function(){

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
		$jq_shareList = $jq(".share-list"),
		$jq_nowIndex = 0,
		$jq_nowTag;

	//set mobile menu 
	reuseEvent.mobileMenuEffect();

	$jq('.ui.dropdown').dropdown();

	//let mouse cursor stay on first input field
	$jq("input:first").focus();

	//initail
	$jq_shareList.hide().eq(0).show();

	//push next step
	$jq_SetRight.on("click", function(){

		var $jq_name = $jq("input[name='shareName']");

		if($jq_name.val() != ""){

			getMoveData();

			$jq_nowTag.next().addClass("nowStep");
			$jq_shareList.hide().eq($jq_nowIndex+1).show();
		}
		else{
			alert('請輸入寵物暱稱!!');
			$jq_name.focus();
		}
	});

	//push prev step
	$jq_SetLeft.on("click", function(){

		getMoveData();

		$jq_nowTag.removeClass("nowStep");
		$jq_shareList.hide().eq($jq_nowIndex-1).show();
	});

	//get now item and index number
	var getMoveData = function(){
		$jq_nowTag = $jq_step.find(".nowStep").last();
		$jq_nowIndex = $jq_nowTag.index();
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
		//$jq_slidebar.sidebar('toggle');

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
	},
	backCoverEvent: function(){
		var $jq_item = $jq(".item");

		if(!$jq(".home-view-inner-block").is("#shadowing")){
			$jq_item.each(function(){
				var $jq_item = $jq(this),
					imgPath = $jq_item.find(".photo-img").attr('src');
				$jq_item.css({
					backgroundImage: "url('/static/img/background/mask/bgmask.png'), url("+imgPath+")"
				});
			});
		}
		else{
			$jq_item.css("background", false);
		}
	},
	frontendColorEvent: function(){
		$jq("body").css("background", "url('/static/img/background/body/sprinkles.png') repeat");
	},
	setWaterfall: function(showNum){
		var $jq_out_block = $jq(".home-view-inner-block"),
			$jq_item = $jq_out_block.find(".item"),
			$jq_border = 0.5,
			$jq_index = 0,
			$jq_height_max = 22,
			$jq_height_min = 20,
			$jq_random = 0,
			$jq_top = [0, 0, 0, 0, 0, 0],
			$jq_itemWidth = [18, 14.7, 14.65, 14.6, 15.5, 16],
			$jq_outWidth = [18, 30, 45, 60, 80, 90];

		$jq_out_block.css({
			width: $jq_outWidth[showNum]+"em"
		});

		$jq_item.each(function(){
			
			$jq_random = Math.floor(Math.random()*($jq_height_max-$jq_height_min+1)+$jq_height_min);

			$jq(this).css({
				background: "#ffffff",
				position: "absolute",
				width: $jq_itemWidth[showNum]+"em",
				height: $jq_random+"em",
				marginTop: $jq_top[$jq_index]+"em",
				marginLeft: $jq_itemWidth[showNum]*$jq_index+$jq_border*$jq_index+"em" 
			}).addClass("water-shadow");

			$jq_top[$jq_index] = $jq_top[$jq_index]+$jq_random+$jq_border;

			($jq_index == showNum)? $jq_index = 0 : $jq_index++;
			

		}).promise().done(function(){
			$jq_out_block.css("height", $jq_top[0]+"em");
		});

		$jq(window).resize(function() {

		    if(this.resizeTO) clearTimeout(this.resizeTO);

		    this.resizeTO = setTimeout(function() {
		        $jq(this).trigger('resizeEnd');
		    }, 1000);

		}).on("resizeEnd", function() {
			reuseEvent.checkWinSize();
		});
	},
	checkWinSize: function(){
		var width = $jq(window).width();


		if(width > 1920){
			reuseEvent.setWaterfall(5);
		}
		else if(width <= 1920 && width >1680){
			reuseEvent.setWaterfall(4);
		}
		else if(width <= 1680 && width > 960){
			reuseEvent.setWaterfall(3);
		}
		else if(width <= 960 && width > 768){
			reuseEvent.setWaterfall(2);
		}
		else if(width <= 768  && width > 533){
			reuseEvent.setWaterfall(1);
		}
		else if(width <= 533){
			reuseEvent.setWaterfall(0);
		}
	}
}





                       




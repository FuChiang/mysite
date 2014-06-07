
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
/*view photo page set*/
/************************************/
var viewPage = function(){

	//set slide
	reuseEvent.slideEffect();

	//set scroll 
	reuseEvent.listenScrollEffect();

	//set add love event
	reuseEvent.addLoveEvent();


	//set background image event
	reuseEvent.backCoverEvent();


	//bind photo display event
	$jq(".single").on("click", function(){
		$jq(".item").css({
			width: "100%", 
			height: false
		}).find(".photo-img").css({
			width: false,
			height: false,
			marginTop: "4%"
		}).end().find(".photoPlugMenu").css("display", "block").end().find(".content").addClass("singleLove").end().find(".owner").addClass("singleOwner");

		$jq(".buttons").removeAttr("id").attr("id", "single_show");
	});

	$jq(".multiple").on("click", function(){
		$jq(".item").css({
			width: false, 
			height: false
		}).find(".photo-img").css({
			width: false,
			height: false,
			marginTop: "10%"
		}).end().find(".photoPlugMenu").css("display", "block").removeClass("singleLove").end().find(".owner").removeClass("singleOwner");

		$jq(".buttons").removeAttr("id").attr("id", "multiple_show");

	});

	$jq(".little").on("click", function(){
		$jq(".item").css({
			width: false
		}).find(".photo-img").css({
			width: "50%",
			height: "50%",
			marginTop: "2%"
		}).end().find(".photoPlugMenu").css("display", "none");

		$jq(".buttons").removeAttr("id").attr("id", "little_show");
	});
;
}	


/************************************/
/*categories page set*/
/************************************/
var categoriesPage = function(){

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

		getMoveData();

		$jq_nowTag.next().addClass("nowStep");
		$jq_shareList.hide().eq($jq_nowIndex+1).show();
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

	5464654654
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
	},

	//listen scroll position
	listenScrollEffect: function(){
		var $jq_addNum = 200,
			reGetSize = function(){
				$jq_winHeight = $jq(window).height(); 		//window  height
				$jq_pageHeight = $jq(document).height(); 	//page height
			}; 

		$jq(window).on("scroll", function(){

			//get body page content
			reGetSize();

	  		if($jq_pageHeight <= ($jq_winHeight+$jq(this).scrollTop()+$jq_addNum)){   
	    			var priority = ($jq(location).attr('href').split("/"))[4],
	    				csrftoken = $jq('input[name=csrfmiddlewaretoken]').val(),
	    				$jq_button = $jq(".buttons");

	    			$jq.ajax({
					url: "/scrollNext",
					type: "POST",
					cache: false,
					contentType: "application/json",
					data: JSON.stringify({ "field": priority}),
					dataType: "json",
					beforeSend: function(xhr) {
		        			xhr.setRequestHeader("X-CSRFToken", csrftoken);
		        			xhr.setRequestHeader("X-Requested-With", 'XMLHttpRequest');
		    			},
		    			success: function(response){
		    				var i = 0, len = response.length, str = '';

		    				//check have any data require to show
		    				if(len == 0){
		    					//if no data then cancel inifinite effect
		    					$jq(window).off("scroll");
		    				}
		    				else{
		    					for(; i < len ; i++){
			    					str += '<div class="item" data-item-display="itemList"><div class="owner photoPlugMenu"><a href=""><img class="image" src="/static/img/member/photo/'+response[i].pic+'" title="'+response[i].account+'"></a><span>'+response[i].photo_pet_name+'</span></div>';
			    					str += '<div class="image"><a href=""><img class="photo-img" src="/static/img/photo/big/'+response[i].photo_filename+'"></a></div><div class="content photoPlugMenu" data-item-menu="itemMenuShow">';
			    					str += '<div class="menu"><button class="love" id="'+response[i].pid+'" title="喜歡這張照片" ng-click="addLove('+response[i].pid+');love'+response[i].pid+'=true" ng-disabled="love'+response[i].pid+'">';
			    					str += '<i class="heart red icon"></i><p class="love'+response[i].pid+'">'+response[i].photo_love+'</p></button><button class="comments" title="瀏覽相關評論" ><a href=""><i class="chat blue icon"></i></a><p>'+response[i].photo_comment+'</p></button>';
			    					str += '</div></div></div>';
			    				}
			    				$jq(".home-view-inner-block").append(str);
							
							if($jq_button.is("#single_show")){
								$jq(".single").click();	
							}
							else if($jq_button.is("#multiple_show")){
								$jq(".multiple").click();
							}
							else if($jq_button.is("#little_show")){
								$jq(".little").click();
							}

							reuseEvent.backCoverEvent();
							reuseEvent.addLoveEvent();
		    				}

					},
					error: function(xhr){
						alert('ajax錯誤');
					}
				});
			}  
		});

		//repeat get page and window height when browser resize 
		$jq(window).resize(function() {
			reGetSize();
		});
	},
	//add love bind event
	addLoveEvent: function(){
		$jq(".love").on("click", function(){
			var loveId = $jq(this).attr("id"),
				$jq_love =  $jq(".love"+loveId),
				csrftoken = $jq('input[name=csrfmiddlewaretoken]').val();

			$jq_love.html(parseInt($jq_love.html(), 10)+1);

			$jq.ajax({
		          type: 'POST',
			     data: JSON.stringify({"id": loveId}),
			     contentType: "application/json",
			     cache: false,
			     url: '/updatePhotoLove',
			     beforeSend: function(xhr) {
	        			xhr.setRequestHeader("X-CSRFToken", csrftoken);
	        			xhr.setRequestHeader("X-Requested-With", 'XMLHttpRequest');
			    	},
		     		error: function(xhr){
					alert('ajax錯誤');
				}
		     });
		});
	},

	backCoverEvent: function(){
		$jq(".item").each(function(){
			var $jq_item = $jq(this),
				imgPath = $jq_item.find(".photo-img").attr('src');
			$jq_item.css({
				backgroundImage: "url('/static/img/background/mask/bgmask.png'), url("+imgPath+")"
			});
		});
	}
}





                       



